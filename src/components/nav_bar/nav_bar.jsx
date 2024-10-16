import React, { useEffect, useState } from "react";
import { useUser } from "../../contexts/user_context";
import './nav_bar.css';
import useCommand from "../../utilities/client/command_function";
import useFiole from "../../utilities/client/fiole_function";
import useParrain from "../../utilities/client/parrain_function";
import Page1 from "./page_content_1";
import Page2 from "./page_content_2";
import useHistory from "../../utilities/client/history_function";
import ToastComponent from '../toast/toast'; // Importing the ToastComponent

const NavBarComponent = ({ switchPage }) => {
    const { user } = useUser();
    const { fetchCommand } = useCommand();
    const { parrainage, message } = useParrain();
    const { fetchFiole } = useFiole();
    const { fetchHistory } = useHistory();
    
    const [command, setCommand] = useState([]);
    const [fiole, setFiole] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [code, setCode] = useState('');
    const [history, setHistory] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const parrainer = async () => {
        if (code) {
            await parrainage(code);
            setToastMessage(message || 'Parrainage soumis avec succès.');
            setShowToast(true);
        } else {
            setToastMessage('Veuillez entrer un code de parrainage.');
            setShowToast(true);
        }
    };

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

            if (Array.isArray(historyData)) {
                setHistory(historyData);
            }
        };

        fetchData();
    }, []);

    // Sélection du contenu selon la page actuelle
    const renderPageContent = () => {
        switch (currentPage) {
            case 1:
                return <Page1 user={user} command={command} switchPage={switchPage} />;
            case 2:
                return <Page2 fiole={fiole} code={code} setCode={setCode} parrainer={parrainer} history={history} />;
            default:
                return <Page1 user={user} command={command} />;
        }
    };

    return (
        <div className="nav-bar">
            {renderPageContent()}
            {/* Toast message */}
            {showToast && <ToastComponent message={toastMessage} activate={showToast} />}

            {/* Pagination circulaire */}
            <div className="pagination">
                <button
                    className={`circle ${currentPage === 1 ? 'active' : ''}`}
                    onClick={() => setCurrentPage(1)}
                    aria-label="Page 1"
                >
                    1
                </button>
                <button
                    className={`circle ${currentPage === 2 ? 'active' : ''}`}
                    onClick={() => setCurrentPage(2)}
                    aria-label="Page 2"
                >
                    2
                </button>
            </div>
        </div>
    );
};

export default NavBarComponent;
