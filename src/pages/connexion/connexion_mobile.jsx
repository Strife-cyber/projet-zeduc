import React, { useState } from 'react';
import CircleLogoComponent from '../../components/circle_logo/circle_logo';
import TextFieldComponent from '../../components/text_field/text_field';
import ButtonComponent from '../../components/button/button';
import useLogin from './login_function'; // Import the login hook
import MessageComponent from '../../components/message/message'; // Import the message component for feedback
import '../accueil/accueil_mobile.css';
import './connexion_mobile.css';
import './connexion_desktop.css';

const ConnexionMobilePage = () => {
    const { login, message } = useLogin(); // Extract the login function and message
    const [email, setEmail] = useState(''); // State for the email
    const [password, setPassword] = useState(''); // State for the password

    const handleLogin = async () => {
        try {
            await login(email, password); // Call the login function with email and password
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <>
            <div className="display-mobile">
                <CircleLogoComponent size="150px" direction="top" />
            </div>
            <div className='connect-body'>
                <p className='text-center' id='connect'>Connectez vous pour savourez chaque moment</p>
                <div className='form'>
                    <TextFieldComponent
                        width='70%'
                        placeholder='Entrez votre email'
                        value={email} // Bind the email state
                        onChange={(e) => setEmail(e.target.value)} // Update the email state
                    />
                    <TextFieldComponent
                        width='70%'
                        placeholder='Entrez votre mot de passe'
                        type='password'
                        value={password} // Bind the password state
                        onChange={(e) => setPassword(e.target.value)} // Update the password state
                    />
                </div>
                <p className="text-end">Mot de passe oublié ?</p>
                <div className="button-contain">
                    <ButtonComponent height='40px' placeholder="Connexion" onClick={handleLogin} />
                </div>
            </div>
            {message && <MessageComponent message={message} type={message.includes('successful') ? 'success' : 'error'} />} {/* Display feedback message */}
        </>
    );
}

export default ConnexionMobilePage;
