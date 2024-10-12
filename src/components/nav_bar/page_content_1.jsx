import React from 'react';

const Page1 = ({ user, command, switchPage }) => {
    return (
        <>
            <div className="info-container">
                <p>Nom: {user?.nom || "Invité"}</p>
                <p>Code: {user?.code || "N/A"}</p>
                <p>Points: {user?.points || "0"}</p>
            </div>

            <div className="bar-label home" onClick={() => switchPage("home")}>
                <i className="fas fa-chevron-left text-center"></i>
                <p className="text-center">Home</p>
            </div>
            <div className="bar-label promotion" onClick={() => switchPage("promotion")}>
                <i className="fas fa-chevron-left text-center"></i>
                <p className="text-center">Promotion</p>
            </div>
            <div className="bar-label evenements" onClick={() => switchPage("Events")}>
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
                                <p>{c[0]}</p>
                                <p>{c[1]} FCFA</p>
                                {c[2] ? <p>Arrivé</p> : <p>En route</p>}
                            </li>
                        ))
                    ) : (
                        <li>Aucune commande aujourd'hui</li>
                    )}
                </ul>
            </div>
        </>
    );
};

export default Page1;
