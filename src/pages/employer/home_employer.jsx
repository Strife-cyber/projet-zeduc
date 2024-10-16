import { useState } from "react"
import NavEmployerComponent from "../../components/nav_bar/nav_employer";
import EmployerTableComponent from "../../components/table/employer_table";
import FoodAdderComponent from "../../components/food_adder/food_adder";
import StatsDashboard from "../../components/stats_page/stats_page";
import ReclamationDashBoard from "../../components/reclamation/reclamation";
import FooterEmployerComponent from "../../components/footer/footer_employer";

const HomeEmployerPage = () => {
    const [page, setPage] = useState("commandes");

    const switcher = (pageName) => {
        setPage(pageName);
    };

    return (
        <>
            <NavEmployerComponent switched={switcher}/>
            <div className="home-employer" style={{minHeight: '100vh'}}>
                {
                    page === "commandes" ? (
                        <EmployerTableComponent/>
                    ) : page === "menu" ? (
                        <FoodAdderComponent/>
                    ) : page === "stats" ? (
                        <StatsDashboard/>
                    ) : page === "reclam" ? (
                        <ReclamationDashBoard/>
                    ) : (<></>)
                }
            </div>
            <FooterEmployerComponent/>
        </>
    )
}

export default HomeEmployerPage;