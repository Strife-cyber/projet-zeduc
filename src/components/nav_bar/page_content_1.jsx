import React, { useState } from 'react';
import ButtonComponent from '../button/button';

const Page1 = ({ user, command, switchPage }) => {
    const [showCode, setShowCode] = useState(false);

    return (
        <>
            <div className="info-container">
                <p>Nom: {user?.nom || "Invité"}</p>
                <p>Points: {user?.points || "0"}</p>
                {showCode ? (<p>Code: {user?.code || "N/A"}</p>) : (
                    <ButtonComponent width='120px' onClickFunction={() => setShowCode(true)} placeholder='Generer Code'/>
                )}
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
                                {c[2] == 't' ? <p>Arrivé</p> : <p>En route</p>}
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
