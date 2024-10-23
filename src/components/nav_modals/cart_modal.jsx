import { useState, useEffect } from "react";
import { usePanier } from "../../contexts/panier_context";
import TableComponent from "../table/table";
import { useUser } from "../../contexts/user_context";
import './cart_modal.css';
import ButtonComponent from "../button/button";
import PaymentSheetComponent from "../payment_sheet/payment_sheet";
import usePolitique from "../../utilities/politique_function";

const CartModal = () => {
    const [open, setOpen] = useState(true);
    const { panier } = usePanier();
    const { user, updateUserPoints } = useUser();
    const { fetchPolitique } = usePolitique();
    const [imageModal, setImageModal] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [pointsDiscount, setPointsDiscount] = useState(0);
    const [pointsUsed, setPointsUsed] = useState(0); // État pour le spinner des points
    const [showPaymentSheet, setShowPaymentSheet] = useState(false);
    const [politique, setPolitique] = useState(null);

    useEffect(() => {
        const fetchPolicy = async () => {
            const fetchedPolitique = await fetchPolitique();
            setPolitique(fetchedPolitique);
        };
        fetchPolicy();
    }, []);

    useEffect(() => {
        const total = panier.reduce((total, item) => total + item.prix * item.quantity, 0);
        setTotalPrice(total);
    }, [panier]);

    const closeModal = () => {
        setOpen(false);
    };

    const toggleModal = () => {
        setOpen(!open);
    };

    const handleImageClick = (imageSrc) => {
        setImageModal(imageSrc);
    };

    const closeImageModal = () => {
        setImageModal(null);
    };

    const handlePointsChange = (e) => {
        const points = parseInt(e.target.value, 10); // Récupérer la valeur du spinner
        setPointsUsed(points); // Mettre à jour les points utilisés

        if (politique) {
            const discount = points * politique.convert;
            setPointsDiscount(discount > totalPrice ? totalPrice : discount); // Limiter la réduction au total
        }
    };

    const handlePayment = async () => {
        if (pointsDiscount > 0) {
            const remainingPoints = 100 - pointsUsed; // Calculer les points restants
            await updateUserPoints(remainingPoints);
        }
        setShowPaymentSheet(true);
    };

    return (
        <>
            <button className="cart-button" style={{ marginTop: '0', justifyContent: 'start' }} onClick={toggleModal}>
                <i className="fas fa-shopping-cart"></i> Voir Panier
            </button>

            {open && (
                <div className="modal-overlay-sp">
                    <div className="modal-content-sp">
                        <div className="modal-header-sp">
                            <i className="fas fa-shopping-cart"></i>
                            <h2 style={{ marginTop: '0' }}>Mes Commandes</h2>
                            <button className="close-button" onClick={closeModal}>
                                &times;
                            </button>
                        </div>

                        <div className="modal-body-sp">
                            {panier.length === 0 ? (
                                <p>Votre panier est vide.</p>
                            ) : (
                                <>
                                    <TableComponent
                                        headers={['Image', 'Nom', 'Prix', 'Quantité']}
                                        data={panier.map((item) => [
                                            <img
                                                src={item.image}
                                                style={{ width: '25px', cursor: 'pointer' }}
                                                onClick={() => handleImageClick(item.image)}
                                                alt={item.nom}
                                            />,
                                            item.nom,
                                            item.prix.toFixed(2),
                                            item.quantity.toString().padStart(3, '0')
                                        ])}
                                    />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                        <label htmlFor="pointsSpinner">Utiliser des points : </label>
                                        <input
                                            type="number"
                                            id="pointsSpinner"
                                            value={pointsUsed}
                                            min="0"
                                            max={100} // Limite le nombre de points que l'utilisateur peut utiliser
                                            onChange={handlePointsChange}
                                        />
                                    </div>
                                    <div className="total-price" style={{ position: 'absolute', bottom: '20px', display: 'flex', justifyContent: 'space-between', width: '90%' }}>
                                        <h3 style={{ float: 'left', fontSize: '18px' }}>Total: {(totalPrice - pointsDiscount).toFixed(2)} XAF</h3>
                                        <h3 style={{ float: 'left', fontSize: '18px' }}>Réduction: {pointsDiscount.toFixed(2)} XAF</h3>
                                    </div>
                                    <ButtonComponent placeholder="Payer" onClickFunction={handlePayment} />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {imageModal && (
                <div className="image-modal-overlay" onClick={closeImageModal}>
                    <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
                        <img src={imageModal} alt="Agrandissement" className="modal-image" />
                    </div>
                </div>
            )}

            {showPaymentSheet && (
                <PaymentSheetComponent onClose={() => setShowPaymentSheet(false)} product={{ price: totalPrice - pointsDiscount }} />
            )}
        </>
    );
};

export default CartModal;
