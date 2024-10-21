import { useState, useEffect } from "react";
import NavEmployerComponent from "../../components/nav_bar/nav_employer";
import EmployerTableComponent from "../../components/table/employer_table";
import FoodAdderComponent from "../../components/food_adder/food_adder";
import StatsDashboard from "../../components/stats_page/stats_page";
import ReclamationDashBoard from "../../components/reclamation/reclamation";
import FooterEmployerComponent from "../../components/footer/footer_employer";

const HomeEmployerPage = () => {
    // Retrieve the page from localStorage or default to "commandes"
    const [page, setPage] = useState(() => localStorage.getItem("currentPageEmployer") || "commandes");

    const switcher = (pageName) => {
        setPage(pageName);
        localStorage.setItem("currentPageEmployer", pageName); // Save the selected page to localStorage
    };

    // Optional: Clear the page from localStorage when the component unmounts or based on other logic
    useEffect(() => {
        // Cleanup function to remove localStorage item (if necessary)
        return () => {
            localStorage.removeItem("currentPageEmployer");
        };
    }, []);

    return (
        <>
            <NavEmployerComponent switched={switcher} />
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
                    ) : (
                        <></>
                    )
                }
            </div>
            <FooterEmployerComponent />
        </>
    );
};

export default HomeEmployerPage;
