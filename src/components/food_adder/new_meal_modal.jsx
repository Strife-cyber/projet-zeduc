// src/components/AddNewMealModal.js
import React, { useState } from 'react';
import TextFieldComponent from '../text_field/text_field';
import ButtonComponent from '../button/button';

const AddNewMealModal = ({ isAddingMeal, newMeal, setNewMeal, handleSaveNewMeal, onClose }) => {
    if (!isAddingMeal) return null;

    return (
        <div className="modal" id='modal-meal' style={{paddingBottom: '15px', backgroundColor: 'white', width: '80%', height: '80%', marginLeft: '10%', marginTop: '10%'}}>
            <h2 style={{margin: '10px', fontFamily: 'pacifico', fontSize: '40px',color: '#cfbd97'}}>Ajouter un nouveau plat</h2>
            <TextFieldComponent placeholder='Nom du plat' value={newMeal.nom} onChange={(e) => setNewMeal({ ...newMeal, nom: e.target.value})}  width='80%' />
            <TextFieldComponent placeholder='Prix' value={newMeal.prix} onChange={(e) => setNewMeal({ ...newMeal, prix: e.target.value})}  width='80%'/>
            <TextFieldComponent inputType='file' onChange={(e) => setNewMeal({ ...newMeal, image: e.target.files[0]})} width='80%' height='200px' placeholder=''/>
            <div className='row'>
                <div className='col'>
                    <ButtonComponent placeholder='Ajouter' onClickFunction={handleSaveNewMeal}/>
                </div>
                <div className='col'>
                    <ButtonComponent placeholder='Fermer' onClickFunction={onClose}/>
                </div>
            </div>
        </div>
    );
};

export default AddNewMealModal;
