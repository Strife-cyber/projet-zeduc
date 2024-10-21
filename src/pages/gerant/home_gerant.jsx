import { useState, useEffect } from "react";
import EmployerTableComponent from "../../components/table/employer_table";
import FoodAdderComponent from "../../components/food_adder/food_adder";
import StatsDashboard from "../../components/stats_page/stats_page";
import ReclamationDashBoard from "../../components/reclamation/reclamation";
import NavGerantComponent from "../../components/nav_bar/nav_gerant";
import FooterEmployerComponent from "../../components/footer/footer_employer";
import GerantTableComponent from "../../components/table/gerant_table";

const HomeGerantPage = () => {
    // Retrieve the page from localStorage or default to "commandes"
    const [page, setPage] = useState(() => localStorage.getItem("currentGerantPage") || "commandes");

    const switcher = (pageName) => {
        setPage(pageName);
        localStorage.setItem("currentGerantPage", pageName); // Save the selected page to localStorage
    };

    // Optional: Clear the page from localStorage when the component unmounts or based on other logic
    useEffect(() => {
        // Cleanup function to remove localStorage item (if necessary)
        return () => {
            localStorage.removeItem("currentGerantPage");
        };
    }, []);

    return (
        <>
            <NavGerantComponent switched={switcher} />
            <div className="home-employer" style={{ minHeight: '100vh' }}>
                {
                    page === "commandes" ? (
                        <EmployerTableComponent />
                    ) : page === "menu" ? (
                        <FoodAdderComponent />
                    ) : page === "stats" ? (
                        <StatsDashboard />
                    ) : page === "reclam" ? (
                        <ReclamationDashBoard />
                    ) : page === "employer" ? (
                        <GerantTableComponent />
                    ) : (
                        <></>
                    )
                }
            </div>
            <FooterEmployerComponent />
        </>
    );
};

export default HomeGerantPage;
