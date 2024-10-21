import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './payment_sheet.css';
import TextFieldComponent from '../text_field/text_field';
import ButtonComponent from '../button/button';
import PayWithPayPal from '../payments/pay_pal';
import { useUser } from '../../contexts/user_context';
import useCommand from '../../utilities/client/command_function';
import usePolitique from '../../utilities/politique_function';

const PaymentSheetComponent = ({ onClose, product, id_plat }) => {
    const [activeTab, setActiveTab] = useState('points');
    const { user, setUser } = useUser();
    const { fetchPolitique, updatePoints } = usePolitique();
    const { insertCommande } = useCommand();
    const [politique, setPolitique] = useState({});
    const [pointsData, setPointsData] = useState({ userPoints: 0, productPrice: 0 });

    const handlePointCommande = async (id_plat) => {
        const result = await insertCommande(id_plat);
        const newPoints = Math.floor(
            pointsData.userPoints - pointsData.productPrice +
            Math.floor((parseInt(pointsData.productPrice, 10) * parseInt(politique.convert, 10)) / parseInt(politique.commande, 10))
        );
    
        updatePoints(user.id, newPoints);
        setUser({ ...user, points: newPoints });
        onClose(); // Fermer la modal après succès
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchPolitique();
            const userPoints = parseInt(user.points, 10);
            const productPrice = Math.floor(product.price / parseInt(data.convert, 10)); // Calcul du prix du produit en points entiers

            setPointsData({ userPoints, productPrice });
            setPolitique(data);
        };

        fetchData();
    }, [user, product]);

    return (
        <div className="payment-container">
            <ul className="nav" style={{ display: 'flex', listStyle: 'none', justifyContent: 'space-between', overflowX: 'scroll' }}>
                <li className="close-icon">
                    <i className="fas fa-times" id="close" onClick={onClose}></i>
                </li>
                {/*<li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === 'momo' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('momo')}
                    >
                        MoMo
                    </button>
                </li>
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === 'orange' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('orange')}
                    >
                        Orange
                    </button>
                </li>*/}
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === 'paypal' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('paypal')}
                    >
                        PayPal
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'points' ? 'active' : ''}`}
                        onClick={() => setActiveTab('points')}
                    >
                        Points
                    </button>
                </li>
            </ul>

            <div className="tab-content mt-4">
                {activeTab === 'momo' && (
                    <div className="tab-pane fade show active d-flex">
                        <h4 className="text-center">Pay with MoMo</h4>
                        <TextFieldComponent placeholder="Entrez votre numéro" />
                        <ButtonComponent placeholder="Payer" height="40px" />
                    </div>
                )}
                {activeTab === 'orange' && (
                    <div className="tab-pane fade show active d-flex">
                        <h4 className="text-center">Pay with Orange Money</h4>
                        <TextFieldComponent placeholder="Entrez votre numéro" />
                        <ButtonComponent placeholder="Payer" height="40px" />
                    </div>
                )}
                {activeTab === 'paypal' && (
                    <div className="tab-pane fade show active d-flex align-items-center justify-content-center">
                        <PayWithPayPal product={product} id_plat={id_plat} />
                    </div>
                )}
                {activeTab === 'points' && (
                    <div className="d-flex" style={{ minHeight: '30vh', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div className="d-flex justify-content-center align-items-center" style={{ flexDirection: 'column' }}>
                            <h4 style={{ fontSize: '12px', fontFamily: 'Imprint MT shadow' }}>Vous avez {pointsData.userPoints} points</h4>
                            <h4 style={{ fontSize: '15px', fontFamily: 'Imprint MT shadow' }}>Cette transaction vous coûtera {pointsData.productPrice} points</h4>
                        </div>
                        {pointsData.userPoints >= pointsData.productPrice ? (
                            <ButtonComponent placeholder="Valider" onClickFunction={() => handlePointCommande(id_plat)} />
                        ) : (
                            <h4>Points Insuffisants</h4>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentSheetComponent;
