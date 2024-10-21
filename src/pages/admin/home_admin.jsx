import { useState, useEffect } from "react";
import NavAdminComponent from "../../components/nav_bar/nav_admin";
import EmployerTableComponent from "../../components/table/employer_table";
import FoodAdderComponent from "../../components/food_adder/food_adder";
import StatsDashboard from "../../components/stats_page/stats_page";
import ReclamationDashBoard from "../../components/reclamation/reclamation";
import GerantTableComponent from "../../components/table/gerant_table";

const HomeAdminPage = () => {
    // Retrieve the page from localStorage or default to "commandes"
    const [page, setPage] = useState(() => localStorage.getItem("currentPageAdmin") || "commandes");

    const switcher = (pageName) => {
        setPage(pageName);
        localStorage.setItem("currentPageAdmin", pageName); // Save the selected page to localStorage
    };

    // Optional: Cleanup localStorage when the component unmounts or based on other logic
    useEffect(() => {
        return () => {
            localStorage.removeItem("currentPageAdmin"); // Remove on unmount if needed
        };
    }, []);

    return (
        <>
            <NavAdminComponent switched={switcher} />
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
        </>
    );
}

export default HomeAdminPage;
