import { useState } from 'react';
import image1 from '../../assets/img-1.jpg';
import ButtonComponent from '../button/button';
import './meal_card.css';
import PaymentSheetComponent from '../payment_sheet/payment_sheet';

const MealCardComponent = ({ id_plat="plat001", image=image1, nom="Eru", prix="1000", onDoubleClickFunction }) => {
    const [closed, setClosed] = useState(false);

    const onClose = () => {setClosed(true)}
    const onOpen = () => {setClosed(false)}; // Fonction pour ré-ouvrir si nécessaire
    const product= {price: prix, description: nom, img: image}

    return (
        <>
        <div className="card custom-card border shadow-lg" onDoubleClick={onDoubleClickFunction} style={{ width: '18rem', position: 'relative' }}>
            <img src={image} className="card-img-top" alt={nom} />
            <div className="card-body">
                <div className='row'>
                    <div className='col'>
                        <h5 className="card-label card-title">{nom}</h5>
                    </div>
                    <div className='col'>
                        <p className="card-label card-text">Prix: {prix} FCFA</p>
                    </div>
                </div>
                <div className='button-holder'>
                    <ButtonComponent onClickFunction={onClose} placeholder='Commander' width='150px' height='40px'/>
                </div>
            </div>
            {closed ? (
                <div className="payment-sheet-overlay">
                    <div className="payment-sheet">
                        <PaymentSheetComponent onClose={onOpen} product={product} id_plat={id_plat}/>
                    </div>
                </div>
            ) : null}
        </div>
        </>
    );
};

export default MealCardComponent;
