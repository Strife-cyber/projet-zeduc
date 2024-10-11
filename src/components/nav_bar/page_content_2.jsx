// Page2.jsx
import React from 'react';
import TextFieldComponent from "../text_field/text_field";
import ButtonComponent from "../button/button";

const Page2 = ({ fiole, code, setCode, parrainer, history }) => {
    return (
        <>
            <div className="fiole-container">
                <h2 className="text-center" style={{ fontSize: '20px', color: '#cfbd97' }}>Mes Fioles</h2>
                <ul>
                    {fiole.length > 0 ? (
                        fiole.map((f, index) => (
                            <li key={index}>
                                <p>{f.nom}</p>
                            </li>
                        ))
                    ) : (
                        <li>Aucune fiole disponible</li>
                    )}
                </ul>
            </div>
            <div className="parrain-container">
                <h2 className="text-center" style={{ fontSize: '20px', color: '#cfbd97' }}>Ajouter un Parrain</h2>
                <TextFieldComponent
                    placeholder="Entrez le code"
                    width="180px"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
                <ButtonComponent
                    placeholder="Submit"
                    height="30px"
                    width="100px"
                    onClickFunction={parrainer}
                />
            </div>
            <div className='history-container'>
                <h2 className="text-center" style={{ fontSize: '20px', color: '#cfbd97' }}>Historique</h2>
                <ul>
                    {history.length > 0 ? (
                        history.map((h, index) => (
                            <li key={index}>
                                <p>{h.nom}</p>
                                <p>{h.prix}</p>
                                <p>{h.date}</p>
                            </li>
                        ))
                    ) : (
                        <li>Historique vide</li>
                    )}
                </ul>
            </div>
        </>
    );
};

export default Page2;
