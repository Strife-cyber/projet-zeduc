import { useState, useEffect } from "react";
import InscriptionMobilePage from "./inscription_mobile";
import InscriptionDesktopPage from "./inscription_desktop";
import FooterComponent from "../../../components/footer/footer";

const InscriptionPage = () => {
    const [isMobile, setIsMobile] = useState(false);

    const checkScreenSize = () => {
        if (window.innerWidth <= 1000) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    };

    // Vérification de la taille de l'écran lors du chargement et redimensionnement de la fenêtre
    useEffect(() => {
        checkScreenSize(); // Vérifier à l'initialisation

        // Écouteur pour redimensionner la fenêtre
        window.addEventListener("resize", checkScreenSize);

        // Nettoyage de l'écouteur lorsque le composant est démonté
        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    }, []);

    return (
        <>
            {isMobile ? <InscriptionMobilePage /> : <InscriptionDesktopPage />}
        </>
    );
};

export default InscriptionPage;
