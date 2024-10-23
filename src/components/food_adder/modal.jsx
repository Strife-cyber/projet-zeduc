import React from 'react';
import ButtonComponent from '../button/button';

const Modal = ({ isOpen, title, children, onClose }) => {
    if (!isOpen) return null;

    return (
        <>
            {/* Overlay pour l'arrière-plan sombre */}
            <div className="modal-overlay" style={overlayStyle}></div>

            {/* Contenu du modal */}
            <div className="modal" id='modal-meal' style={modalStyle}>
                <h2 style={titleStyle}>{title}</h2>
                <div className='children'>{children}</div>
                <ButtonComponent placeholder='fermer' onClickFunction={onClose}/>
            </div>
        </>
    );
};

export default Modal;

// Styles CSS en JS pour l'overlay et le modal
const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond semi-transparent
    zIndex: 1000 // Assurez-vous que l'overlay est au-dessus des autres éléments
};

const modalStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // Centrer le modal
    backgroundColor: 'black',
    padding: '20px',
    zIndex: 1001, // Assurez-vous que le modal est au-dessus de l'overlay
    borderRadius: '8px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
    width: '80%'
};

const titleStyle = {
    marginTop: '10px',
    fontFamily: 'pacifico',
    fontSize: '50px',
    color: 'white'
};
