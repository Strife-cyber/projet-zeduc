import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonComponent from '../button/button';
import useReclamation from '../../utilities/client/reclamation';
import useMesReclamation from '../../utilities/client/mes_reclamation';
import ToastComponent from '../toast/toast'; // Import the Toast component

const FooterComponent = () => {
    const { reclamation, message } = useReclamation();
    const [description, setDescription] = useState('');
    const { fetchMesReclamation } = useMesReclamation();
    const [mesReclamation, setMesReclamation] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const reclamer = async () => {
        if (description) {
            await reclamation(description);
            setToastMessage(message || 'Réclamation soumise avec succès.');
            setShowToast(true);
            setDescription('');  // Clear description after submission
        } else {
            setToastMessage('Veuillez entrer une réclamation.');
            setShowToast(true);
        }
    };

    useEffect(() => {
        const fetchReclamation = async () => {
            const data = await fetchMesReclamation();
            if (Array.isArray(data)) {
                setMesReclamation(data); // Use the fetched reclamations
            }
        };

        fetchReclamation();
    }, []);

    return (
        <footer className="footer-container">
            <div className="container p-4">
                <div className="row">
                    {/* Section: À propos */}
                    <div className="col-lg-4 col-md-6 mb-4 mb-md-0 section">
                        <h4 className="footer-title">À propos</h4>
                        <p className="footer-text">
                            Chez nous, chaque bouchée est une véritable explosion de saveurs, où l'ambiance chaleureuse rencontre le goût incomparable. Plongez dans un climat de délices culinaires qui saura éveiller vos papilles et combler votre appétit de bonheur. Bienvenue dans Le climat du bon miam miam, où chaque repas est un câlin pour votre estomac.
                        </p>
                    </div>

                    {/* Section: Faire Une Reclamation */}
                    <div className="col-lg-4 col-md-12 mb-4 mb-md-0 section">
                        <h4 className="footer-title">Faire Une Reclamation</h4>
                        {/* Text box for input */}
                        <textarea
                            className="form-control mb-3"
                            rows="3"
                            placeholder="Décrivez votre réclamation"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}  // Set description
                        />
                        {/* Submit button */}
                        <ButtonComponent onClickFunction={reclamer} placeholder='Déposer'/>
                    </div>

                    {/* Section: Historique de Reclamation */}
                    <div className="col-lg-4 col-md-12 mb-4 mb-md-0 section">
                        <h4 className="footer-title">Historique de Réclamations</h4>
                        {/* Field with overflow to view */}
                        <div className="overflow-auto reclamation-history" style={{ maxHeight: '150px' }}>
                            {mesReclamation.length > 0 ? (
                                mesReclamation.map((rec, index) => (
                                    <div key={index} className="reclamation-text">
                                        <div className='row'>
                                            <div className='col'>
                                                {index}
                                            </div>
                                            <div className='col'>
                                                {rec.description}
                                            </div>
                                            <div className='col'>
                                                {rec.date_reclamation}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="reclamation-text">Aucune réclamation pour l'instant.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast message */}
            {showToast && <ToastComponent message={toastMessage} activate={showToast} />}

            <div className="text-center p-3 footer-bottom">
                &copy; 2024 Mon bon miam miam. Tous droits réservés.
            </div>
        </footer>
    );
};

// Styles remain the same
const styles = `
.footer-container {
    margin-top: 30%;
    background-color: #cfbd97;
    color: #333;
    padding-top: 40px;
}

.section {
    padding: 20px;
}

.footer-title {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: black;
}

.footer-text {
    font-size: 1rem;
    color: white;
}

.link-list {
    padding: 0;
}

.footer-link {
    color: white;
    text-decoration: none;
    transition: color 0.3s ease;
}

.footer-link:hover {
    color: black;
}

.social-icons .footer-icon {
    font-size: 1rem;
    color: white;
    text-decoration: none;
    transition: color 0.3s ease;
}

.footer-icon:hover {
    color: black;
}

.footer-bottom {
    background-color: #cfbd97;
    color: #fff;
}

.reclamation-history {
    background-color: white;
    color: black;
    padding: 10px;
    border-radius: 5px;
}

.reclamation-text {
    margin: 0;
}
`;

// Add custom styles
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default FooterComponent;
