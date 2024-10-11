import React, { useEffect, useState } from "react";
import { useUser } from "../../contexts/user_context";
import './nav_bar.css';
import useCommand from "../../utilities/command_function";

const NavBarComponent = () => {
    const { user } = useUser();
    const { fetchCommand } = useCommand();
    const [command, setCommand] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchCommand();
            if (Array.isArray(data)) {
                const parsedCommand = data.map(c => {
                    const rawString = c.commande_utilisateur_jour;
                    const cleanedString = rawString.slice(1, -1); // Enlève les parenthèses extérieures
                    const elements = cleanedString.split(',').map(item => item.trim().replace(/['"]/g, '')); // Sépare les éléments et nettoie
                    return elements; // Retourne un tableau avec les éléments extraits
                });
                setCommand(parsedCommand); // Mettez à jour avec les données parsées
            }
        };

        fetchData();
    }, []);

    return (
        <div className="nav-bar">
            <div className="info-container">
                <p>Nom: {user?.nom || "Invité"}</p>
                <p>Code: {user?.code || "N/A"}</p>
                <p>Points: {user?.points || "0"}</p>
            </div>

            <div className="bar-label home">
                <i className="fas fa-chevron-left text-center"></i>
                <p className="text-center">Home</p>
            </div>
            <div className="bar-label promotion">
                <i className="fas fa-chevron-left text-center"></i>
                <p className="text-center">Promotion</p>
            </div>
            <div className="bar-label evenements">
                <i className="fas fa-chevron-left text-center"></i>
                <p className="text-center">Evenements</p>
            </div>

            <div className="cart-items">
                <div className="heading">
                    <i className="fas fa-shopping-cart text-center"></i>
                    <p className="text-center">Mes Commandes</p>
                </div>
                <ul>
                    {command.length > 0 ? (
                        command.map((c, index) => (
                            <li key={index}>
                                <p>{c[0]}</p> {/* Affiche le nom de la commande */}
                                <p>{c[1]} FCFA</p> {/* Affiche le prix */}
                                {c[2] ? <p>Arrive</p> : <p>En route</p> }
                            </li>
                        ))
                    ) : (
                        <li>Aucune commande aujourd'hui</li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default NavBarComponent;
