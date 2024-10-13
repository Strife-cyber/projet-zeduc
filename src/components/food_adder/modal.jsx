// src/components/Modal.js
import React from 'react';
import ButtonComponent from '../button/button';

const Modal = ({ isOpen, title, children, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal" id='modal-meal'>
            <h2 style={{marginTop: '10px', fontFamily: 'pacifico', fontSize: '50px'}}>{title}</h2>
            <div className='children'>{children}</div>
            <ButtonComponent placeholder='fermer' onClickFunction={onClose}/>
        </div>
    );
};

export default Modal;
