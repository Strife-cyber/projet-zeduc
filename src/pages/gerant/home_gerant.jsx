import { useState } from "react";
import EmployerTableComponent from "../../components/table/employer_table";
import FoodAdderComponent from "../../components/food_adder/food_adder";
import StatsDashboard from "../../components/stats_page/stats_page";
import ReclamationDashBoard from "../../components/reclamation/reclamation";
import NavGerantComponent from "../../components/nav_bar/nav_gerant";
import FooterEmployerComponent from "../../components/footer/footer_employer";
import GerantTableComponent from "../../components/table/gerant_table";

const HomeGerantPage = () => {
    const [page, setPage] = useState("commandes");

    const switcher = (pageName) => {
        setPage(pageName);
    };

    return (
        <>
            <NavGerantComponent switched={switcher}/>
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
                    ) : page === "employer" ? (
                        <GerantTableComponent/>
                    ) : (
                        <></>
                    )
                }
            </div>
            <FooterEmployerComponent/>
        </>
    )
}

export default HomeGerantPage;