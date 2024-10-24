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
import useMeilleur from "../../../utilities/client/meilleur"; // Custom hook for fetching best clients
import { FaCrown } from 'react-icons/fa'; // Importing an icon from react-icons for the button
import './home.css';

const HomePage = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [page, setPage] = useState("home");
    const [closed, setClosed] = useState(true); // Default state to closed
    const { closePanierModal, getPanierState } = usePanier();
    const [isBestClientsOpen, setIsBestClientsOpen] = useState(false); // State for best clients modal
    const { meilleurData, fetchMeilleur } = useMeilleur(); // Using custom hook

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

    // Fetch best clients and open modal
    const handleBestClientsClick = async () => {
        await fetchMeilleur(); // Fetch best clients data
        setIsBestClientsOpen(true); // Open best clients modal
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

                {/* Floating button to show the best clients */}
                <button className="best-clients-btn" onClick={handleBestClientsClick}>
                    <FaCrown size={24} />
                </button>

                {/* Best Clients Modal */}
                {isBestClientsOpen && (
                    <div className="best-clients-overlay" onClick={() => setIsBestClientsOpen(false)}>
                        <div className="best-clients-modal" onClick={(e) => e.stopPropagation()}>
                            <h2>Top 10 Clients</h2>
                            <ul>
                                {meilleurData && meilleurData.length > 0 ? (
                                    meilleurData.map((client, index) => (
                                        <li key={index}>
                                            {index + 1}. {client.nom_client} - {client.total_commandes} commandes
                                        </li>
                                    ))
                                ) : (
                                    <p>No data available</p>
                                )}
                            </ul>
                        </div>
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
