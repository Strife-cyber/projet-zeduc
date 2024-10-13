// src/components/MealCard.js
import React from 'react';
import './food_adder.css';
import ButtonComponent from '../button/button';

const MealCard = ({ image, nom, prix, onSelect, onDelete, activate = false }) => (
    <div className="meal-card" style={{ height: '70vh', width: '40vh' }} onClick={onSelect}>
        <img src={image} alt={nom} style={{ height: '80%' }} />
        <div 
            style={
                activate 
                ? { height: '20%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } 
                : {  } // Hide the container if not active
            }
        >
            <div>
                <h3 style={{ fontSize: '25px' }}>{nom}</h3>
                <p style={{ fontSize: '15px', marginTop: '10px' }}>{prix} FCFA</p>
            </div>
            {activate && (
                <ButtonComponent 
                    onClickFunction={onDelete} 
                    placeholder='Supprimer' 
                    width='100px'
                />
            )}
        </div>
    </div>
);

export default MealCard;
