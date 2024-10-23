import { useEffect, useState } from "react";
import HomeMobilePage from "./home_mobile";
import HomeDesktopPage from "./home_desktop";
import FooterComponent from "../../../components/footer/footer";
import PromotionPage from "./promotion";
import NavBarComponent from "../../../components/nav_bar/nav_bar";
import './home_desktop.css';
import { usePanier } from "../../../contexts/panier_context";
import CartModal from "../../../components/nav_modals/cart_modal";
import EventsPage from "./evenement";

const HomePage = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [page, setPage] = useState("home");
    const [closed, setClosed] = useState(true); // Default state to closed
    const { closePanierModal, getPanierState } = usePanier();

    // Check the screen size to switch between mobile and desktop views
    const checkScreenSize = () => {
        setIsMobile(window.innerWidth <= 1000);
    };

    const switchPage = (pageName) => {
        setPage(pageName);
    };

    useEffect(() => {
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    }, []);

    const onClose = () => {
        setClosed(true);   // Close navigation
    };

    const onOpen = () => {
        setClosed(false);   // Open navigation
    };

    // Handle overlay click and close the sheet when clicking outside
    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal-navs-overlay')) {
            onClose();
        }
    };

    return (
        <>
            <div className={!isMobile ? "home" : ""}>
                {/* Rendering pages based on the current `page` state */}
                {page === "home" ? (
                    isMobile ? <HomeMobilePage onOpen={onOpen} /> : <HomeDesktopPage />
                ) : page === "promotion" ? (
                    <PromotionPage onOpen={onOpen} />
                ) : page === "events" ? (
                    <EventsPage/>
                ) : (
                    <div style={{ minWidth: '100vh', minHeight: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <div style={{color: '#cfbd97', fontFamily: 'pacifico', fontSize: '30px'}}>Evenement page content here</div> // Add your "Evenement" content here
                    </div>
                )}

                {/* Display modal navigation sheet when not closed */}
                {!closed && (
                    <div className="modal-navs-overlay" onClick={handleOverlayClick}>
                        <div className="modal-nav-sheet">
                            <NavBarComponent switchPage={switchPage} />
                        </div>
                    </div>
                )}

                {/* Show navigation bar if not on mobile */}
                {!isMobile && (
                    <div className="navs">
                        <NavBarComponent switchPage={switchPage} />
                    </div>
                )}
            </div>

            <FooterComponent />

            {
                getPanierState() ? (
                    <CartModal closeModal={closePanierModal}/>
                ) : null
            }
        </>
    );
};

export default HomePage;
