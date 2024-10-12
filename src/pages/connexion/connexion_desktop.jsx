import React, { useState } from 'react';
import ButtonComponent from "../../components/button/button";
import CircleLogoComponent from "../../components/circle_logo/circle_logo";
import TextFieldComponent from "../../components/text_field/text_field";
import MessageComponent from "../../components/message/message"; // Import your message component
import useLogin from '../../utilities/login_function'; // Adjust the path to your useLogin hook
import '../accueil/accueil_desktop.css';
import './connexion_desktop.css';
import { useNavigate } from 'react-router';

const ConnexionDesktopPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, message } = useLogin(); // Using the useLogin hook
    const navigate = useNavigate();

    const toInscription = () => {
        navigate('/signup');
    }

    const handleLogin = async () => {
        try {
            await login(email, password); // Call the login function from the hook
            setEmail(''); // Clear email input
            setPassword(''); // Clear password input
            navigate('/home');
        } catch (error) {
            console.error("Login error:", error); // Optional: Log the error for debugging
        }
    };

    return (
        <div className="container-fluid" id="white-part">
            <div className="white-content">
                <div className="contents">
                    <h2 className="miam">Connectez-vous pour <br /> savourer chaque moment</h2>
                    <div className="fields">
                        <TextFieldComponent
                            inputType="email"
                            width="80%"
                            placeholder="Entrez votre email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Handle email input change
                        />
                        <TextFieldComponent
                            inputType="password"
                            width="80%"
                            placeholder="Entrez votre mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Handle password input change
                        />
                    </div>
                    <p className="text-end">Mot de passe oublié ?</p>
                    <div className="button-contain">
                        <ButtonComponent placeholder="Connexion" onClickFunction={handleLogin} />
                    </div>
                    {message && (
                        <MessageComponent
                            message={message}
                            type={message.includes('successful') ? 'success' : 'error'} // Determine message type
                        />
                    )}
                    <p className="text-center" onClick={toInscription}>Vous n'avez pas de compte ? Inscrivez-vous dès maintenant</p>
                </div>
            </div>
            <CircleLogoComponent />
        </div>
    );
}

export default ConnexionDesktopPage;