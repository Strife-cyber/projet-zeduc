import { useState, useEffect } from "react"
import ConnexionMobilePage from "./connexion_mobile";
import ConnexionDesktopPage from "./connexion_desktop";
import FooterComponent from "../../../components/footer/footer";

const ConnexionPage = () => {
    const [isMobile, setIsMobile] = useState(false);

    const checkScreenSize = () => {
        if(window.innerWidth <= 1000){
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }

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
            {isMobile? <ConnexionMobilePage/> : <ConnexionDesktopPage/>}
            <FooterComponent/>
        </>
    );
}

export default ConnexionPage;