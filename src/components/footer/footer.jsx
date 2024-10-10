import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const FooterComponent = () => {
    return (
        <footer className="footer-container">
            <div className="container p-4">
                <div className="row">
                    <div className="col-lg-4 col-md-6 mb-4 mb-md-0 section">
                        <h4 className="footer-title">À propos</h4>
                        <p className="footer-text">Nous créons des recettes incroyables pour inspirer vos aventures culinaires.</p>
                    </div>

                    <div className="col-lg-4 col-md-6 mb-4 mb-md-0 section">
                        <h4 className="footer-title">Liens rapides</h4>
                        <ul className="list-unstyled link-list">
                            <li><a href="/home" className="footer-link">Accueil</a></li>
                            <li><a href="/recipes" className="footer-link">Recettes</a></li>
                            <li><a href="/contact" className="footer-link">Contactez-nous</a></li>
                        </ul>
                    </div>

                    <div className="col-lg-4 col-md-12 mb-4 mb-md-0 section">
                        <h4 className="footer-title">Suivez-nous</h4>
                        <div className="d-flex justify-content-start social-icons">
                            <a href="https://facebook.com" className="footer-icon mx-2">Facebook</a>
                            <a href="https://twitter.com" className="footer-icon mx-2">Twitter</a>
                            <a href="https://instagram.com" className="footer-icon mx-2">Instagram</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center p-3 footer-bottom">
                &copy; 2024 Gestion des Recettes. Tous droits réservés.
            </div>
        </footer>
    );
};

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
`;

// Add custom styles
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default FooterComponent;
