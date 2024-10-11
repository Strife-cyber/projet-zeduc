import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './payment_sheet.css';
import TextFieldComponent from '../text_field/text_field';
import ButtonComponent from '../button/button';

const PaymentSheetComponent = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState('momo');

    return (
        <div className="payment-container">
            <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === 'momo' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('momo')}
                    >
                        MoMo
                    </button>
                </li>
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === 'orange' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('orange')}
                    >
                        Orange
                    </button>
                </li>
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === 'paypal' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('paypal')}
                    >
                        PayPal
                    </button>
                </li>

                <li className='close-icon'>
                    <i className="fas fa-times" id='close' onClick={onClose}></i> {/* Utilisation correcte de onClose */}
                </li>
            </ul>

            <div className="tab-content mt-4">
                {activeTab === 'momo' && (
                    <div className="tab-pane fade show active d-flex" id='orange'>
                        <h4 className='text-center'>Pay with MoMo</h4>
                        <TextFieldComponent placeholder='Entrez votre numero'/>
                        <ButtonComponent placeholder='Payer' height='40px'/>
                    </div>
                )}
                {activeTab === 'orange' && (
                    <div className="tab-pane fade show active d-flex" id='orange'>
                        <h4 className='text-center'>Pay with Orange Money</h4>
                        <TextFieldComponent placeholder='Entrez votre numero'/>
                        <ButtonComponent placeholder='Payer' height='40px'/>
                    </div>
                )}
                {activeTab === 'paypal' && (
                    <div className="tab-pane fade show active d-flex align-items-center justify-content-center">
                        <h4 className='text-center'>Get ready to be wowed! Our upcoming features are going to be so cool, you’ll need a sweater! 😂</h4>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentSheetComponent;
