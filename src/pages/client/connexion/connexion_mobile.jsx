import React, { useState } from 'react';
import CircleLogoComponent from '../../../components/circle_logo/circle_logo';
import TextFieldComponent from '../../../components/text_field/text_field';
import ButtonComponent from '../../../components/button/button';
import useLogin from '../../../utilities/login_function'; // Import the login hook
import MessageComponent from '../../../components/message/message'; // Import the message component for feedback
import { useNavigate } from 'react-router';
import { useUser } from '../../../contexts/user_context';
import { ToastContainer, toast } from 'react-toastify'; // Import Toast components from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify styles
import '../accueil/accueil_mobile.css';
import './connexion_mobile.css';
import './connexion_desktop.css';

const ConnexionMobilePage = () => {
    const { login, message, error } = useLogin(); // Extract the login function and messages
    const [email, setEmail] = useState(''); // State for the email
    const [password, setPassword] = useState(''); // State for the password
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
            await login(email, password); // Call the login function with email and password
            if (user != null) {
                // Display success toast on successful login
                toast.success('Connexion réussie ! Bienvenue 😊', {
                    autoClose: 3000 // Auto close after 3 seconds
                });

                navigate('/manager'); // Redirect if user is logged in
            } else {
                toast.error('Err, Corrigez l\'email ou mot de passe')
            }
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
                <p className='text-center' id='connect'>Connectez-vous pour savourer chaque moment</p>
                <div className='form'>
                    <TextFieldComponent
                        width='70%'
                        placeholder='Entrez votre email'
                        value={email} // Bind the email state
                        onChange={(e) => setEmail(e.target.value)} // Update the email state
                    />
                    <TextFieldComponent
                        width='70%'
                        inputType='password'
                        placeholder='Entrez votre mot de passe'
                        type='password'
                        value={password} // Bind the password state
                        onChange={(e) => setPassword(e.target.value)} // Update the password state
                    />
                </div>

                {/* Display error message for form validation */}
                {formError && (
                    <MessageComponent
                        message={formError}
                        type="error"
                    />
                )}

                {/* Display login error message if provided */}
                {error && (
                    <MessageComponent
                        message={error}
                        type="error"
                    />
                )}

                <p className="text-end">Mot de passe oublié ?</p>
                <div className="button-contain">
                    <ButtonComponent height='40px' placeholder="Connexion" onClickFunction={handleLogin} />
                </div>
                <p className="text-center" onClick={toInscription} style={{ margin: '10', backgroundColor: 'white' }}>Vous n'avez pas de compte ? Inscrivez-vous dès maintenant</p>
            </div>

            {/* ToastContainer to display the toast */}
            <ToastContainer />
        </>
    );
}

export default ConnexionMobilePage;
