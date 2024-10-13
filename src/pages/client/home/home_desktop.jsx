import AllCardsComponent from "../../../components/meal_card/all_cards"
import NavBarComponent from "../../../components/nav_bar/nav_bar"
import './home_desktop.css';

const HomeDesktopPage = ({ switchPage }) => {
    return (
        <div className="cards">
            <div className="text-box">
                <h3>Menu du Jour</h3>
            </div>
            <AllCardsComponent/>
        </div>
    )
}

export default HomeDesktopPage;