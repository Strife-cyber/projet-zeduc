import { useState } from "react"
import NavEmployerComponent from "../../components/nav_bar/nav_employer";
import EmployerTableComponent from "../../components/table/employer_table";

const HomeEmployerPage = () => {
    const [page, setPage] = useState("commandes");

    const switcher = (pageName) => {
        setPage(pageName);
    };

    return (
        <>
            <NavEmployerComponent switcher={switcher}/>
            <div className="home-employer" style={{minHeight: '100vh'}}>
                {
                    page === "commandes" ? (
                        <EmployerTableComponent/>
                    ) : (
                        null
                    )
                }
            </div>
        </>
    )
}

export default HomeEmployerPage;