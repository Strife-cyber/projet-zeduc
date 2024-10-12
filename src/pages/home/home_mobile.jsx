import { useState } from "react";
import AllCardsComponent from "../../components/meal_card/all_cards";
import NavBarComponent from "../../components/nav_bar/nav_bar";
import './home_mobile.css';

const HomeMobilePage = () => {
    const [closed, setClosed] = useState(true); // Default state to closed

    const onClose = () => { setClosed(true) };   // Close navigation
    const onOpen = () => { setClosed(false) };   // Open navigation

    // Function to handle overlay click and close the sheet when clicking outside
    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal-navs-overlay')) {
            onClose();
        }
    };

    return (
        <div className="home-mobile">
            <div className="cards-mobile">
                <div className="text-box-mobile">
                    <h3 className="label-mobile">Menu du Jour</h3>
                    {/* Open menu icon */}
                    <i className="fas fa-hamburger" id="ham" onClick={onOpen}></i>
                </div>
                <AllCardsComponent/>
            </div>
            {!closed ? (  // Open the navigation sheet
                <div className="modal-navs-overlay" onClick={handleOverlayClick}>
                    <div className="modal-nav-sheet">
                        <NavBarComponent/>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default HomeMobilePage;
