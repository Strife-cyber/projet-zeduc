import React, { useState, useEffect } from "react";
import AccueilMobilePage from "./accueil_mobile";
import AccueilDesktopPage from "./accueil_desktop";
import FooterComponent from "../../../components/footer/footer";

const AccueilPage = () => {
    const [isMobile, setIsMobile] = useState(false);

    // Fonction pour vérifier la taille de l'écran
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
            {isMobile ? <AccueilMobilePage /> : <AccueilDesktopPage />}
            <FooterComponent/>
        </>
    );
};

export default AccueilPage;
