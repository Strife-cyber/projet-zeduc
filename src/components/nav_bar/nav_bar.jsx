// NavBarComponent.jsx
import React, { useEffect, useState } from "react";
import { useUser } from "../../contexts/user_context";
import './nav_bar.css';
import useCommand from "../../utilities/command_function";
import useFiole from "../../utilities/fiole_function";
import useParrain from "../../utilities/parrain_function";
import Page1 from "./page_content_1";
import Page2 from "./page_content_2";
import useHistory from "../../utilities/history_function";

const NavBarComponent = ({switchPage}) => {
    const { user } = useUser();
    const { fetchCommand } = useCommand();
    const { parrainage, message } = useParrain();
    const [command, setCommand] = useState([]);
    const { fetchFiole } = useFiole();
    const [fiole, setFiole] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [code, setCode] = useState('');
    const { fetchHistory } = useHistory();
    const [history, setHistory] = useState([]);

    const parrainer = async () => {
        if (code) {
            await parrainage(code);
            alert(message);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchCommand();
            const fioleData = await fetchFiole();
            const historyData = await fetchHistory();

            if (Array.isArray(data)) {
                const parsedCommand = data.map(c => {
                    const rawString = c.commande_utilisateur_jour;
                    const cleanedString = rawString.slice(1, -1);
                    const elements = cleanedString.split(',').map(item => item.trim().replace(/['"]/g, ''));
                    return elements;
                });
                setCommand(parsedCommand);
            }

            if (Array.isArray(fioleData)) {
                setFiole(fioleData);
            }

            if (Array.isArray(historyData)){
                setHistory(historyData);
            }
        };

        fetchData();
    }, []);

    // Sélection du contenu selon la page actuelle
    const renderPageContent = () => {
        switch (currentPage) {
            case 1:
                return <Page1 user={user} command={command} switchPage={switchPage}/>;
            case 2:
                return <Page2 fiole={fiole} code={code} setCode={setCode} parrainer={parrainer} history={history}/>;
            default:
                return <Page1 user={user} command={command} />;
        }
    };

    return (
        <div className="nav-bar">
            {renderPageContent()}
            {/* Pagination circulaire */}
            <div className="pagination">
                <button
                    className={`circle ${currentPage === 1 ? 'active' : ''}`}
                    onClick={() => setCurrentPage(1)}
                >
                    1
                </button>
                <button
                    className={`circle ${currentPage === 2 ? 'active' : ''}`}
                    onClick={() => setCurrentPage(2)}
                >
                    2
                </button>
            </div>
        </div>
    );
};

export default NavBarComponent;