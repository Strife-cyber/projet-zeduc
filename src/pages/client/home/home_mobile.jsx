import AllCardsComponent from "../../../components/meal_card/all_cards";
import './home_mobile.css';

const HomeMobilePage = ({ onOpen }) => {  // Destructuring the prop here
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
        </div>
    );
}

export default HomeMobilePage;
