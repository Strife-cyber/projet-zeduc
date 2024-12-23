import React, { useState } from 'react';
import ButtonComponent from "../../../components/button/button";
import CircleLogoComponent from "../../../components/circle_logo/circle_logo";
import TextFieldComponent from "../../../components/text_field/text_field";
import MessageComponent from "../../../components/message/message"; // Import your message component
import useLogin from '../../../utilities/login_function'; // Adjust the path to your useLogin hook
import { ToastContainer, toast } from 'react-toastify'; // Import Toast components from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import '../accueil/accueil_desktop.css';
import './connexion_desktop.css';
import { useNavigate } from 'react-router';
import { useUser } from '../../../contexts/user_context';

const ConnexionDesktopPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useLogin(); // Using the useLogin hook
    const [formError, setFormError] = useState(''); // State for form validation error
    const navigate = useNavigate();
    const { user } = useUser();

    const toInscription = () => {
        navigate('/signup');
    }

    const handleLogin = async () => {
        if (!email || !password) {
            setFormError('Tous les champs sont requis.'); // Set error message if fields are missing
            return;
        }

        setFormError(''); // Clear the form error if validation passes

        try {
            await login(email, password); // Call the login function from the hook
            setEmail(''); // Clear email input
            setPassword(''); // Clear password input
            
            // If login is successful, show success toast and navigate
            if (user != null) {
                toast.success('Connexion réussie ! Bienvenue 😊', {
                    autoClose: 3000, // Auto close after 3 seconds
                });
                navigate('/manager');
            } else {
                toast.error('Corrigez l\'email ou mot de passe')
            }
        } catch (error) {
            console.error("Login error:", error); // Log the error for debugging
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
                    <p className="text-end" onClick={() => navigate('/forgot')}>Mot de passe oublié ?</p>
                    <div className="button-contain">
                        <ButtonComponent placeholder="Connexion" onClickFunction={handleLogin} />
                    </div>
                    {/* Display error message for form validation */}
                    {formError && (
                        <MessageComponent
                            message={formError}
                            type="error"
                        />
                    )}
                    <p className="text-center" onClick={toInscription}>Vous n'avez pas de compte ? Inscrivez-vous dès maintenant</p>
                </div>
            </div>
            <CircleLogoComponent />
            
            {/* Toast container for displaying toasts */}
            <ToastContainer />
        </div>
    );
}

export default ConnexionDesktopPage;
