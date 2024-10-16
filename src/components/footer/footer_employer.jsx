import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const FooterEmployerComponent = () => {
    return (
        <footer className="footer-container">
            <div className="text-center p-3 footer-bottom">
                {/* Vous pouvez ajouter du contenu ici si nécessaire */}
                &copy; 2024 Mon bon miam miam. Tous droits réservés.
            </div>
        </footer>
    );
};

// Styles minimalistes pour le footer
const styles = `
.footer-container {
    margin-top: 30%;
    background-color: #cfbd97;
    color: #333;
    padding-top: 40px;
}

.footer-bottom {
    background-color: #cfbd97;
    color: #fff;
}
`;

// Ajout des styles au document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default FooterEmployerComponent;
