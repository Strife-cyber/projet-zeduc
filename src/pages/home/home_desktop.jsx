import AllCardsComponent from "../../components/meal_card/all_cards"
import NavBarComponent from "../../components/nav_bar/nav_bar"
import './home_desktop.css';

const HomeDesktopPage = () => {
    return (
        <div className="home">
            <div className="cards">
                <div className="text-box">
                    <h3>Menu du Jour</h3>
                </div>
                <AllCardsComponent/>
            </div>
            <div className="navs">
                <NavBarComponent/>
            </div>
        </div>
    )
}

export default HomeDesktopPage;