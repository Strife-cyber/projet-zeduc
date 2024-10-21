import React, { useState, useEffect } from "react";
import AccueilMobilePage from "./accueil_mobile";
import AccueilDesktopPage from "./accueil_desktop";
import FooterComponent from "../../../components/footer/footer";
import ButtonComponent from "../../../components/button/button";

// A simple CookieConsent component
const CookieConsent = ({ onAccept }) => {
    return (
        <div style={{
            position: 'fixed',
            bottom: '0',
            width: '100%',
            backgroundColor: 'white',  // Using your theme color
            color: 'black',
            padding: '10px',
            textAlign: 'center',
            zIndex: '1000'
        }}>
            <p>
                Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre utilisation des cookies.
            </p>
            <ButtonComponent onClickFunction={onAccept} placeholder="Accepter" />
        </div>
    );
};

const AccueilPage = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [cookieAccepted, setCookieAccepted] = useState(false);

    // Fonction pour vérifier la taille de l'écran
    const checkScreenSize = () => {
        if (window.innerWidth <= 1000) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    };

    // Fonction pour gérer l'acceptation des cookies
    const handleAcceptCookies = () => {
        setCookieAccepted(true);
        document.cookie = "cookiesAccepted=true; path=/; max-age=" + 60 * 60 * 24 * 365; // Set cookie for 1 year
    };

    // Fonction pour supprimer les cookies
    const removeCookie = () => {
        document.cookie = "cookiesAccepted=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setCookieAccepted(false); // Update state after removing cookie
    };

    // Vérifier si l'utilisateur a déjà accepté les cookies
    const checkCookieConsent = () => {
        const cookies = document.cookie.split('; ').find(row => row.startsWith('cookiesAccepted='));
        if (cookies && cookies.split('=')[1] === 'true') {
            setCookieAccepted(true);
        }
    };

    // Vérification de la taille de l'écran lors du chargement et redimensionnement de la fenêtre
    useEffect(() => {
        checkScreenSize(); // Vérifier à l'initialisation
        checkCookieConsent(); // Vérifier l'état du consentement des cookies

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
            {!cookieAccepted && <CookieConsent onAccept={handleAcceptCookies} />}
            <FooterComponent />
            {cookieAccepted && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <ButtonComponent onClickFunction={removeCookie} placeholder="Supprimer les cookies" />
                </div>
            )}
        </>
    );
};

export default AccueilPage;
