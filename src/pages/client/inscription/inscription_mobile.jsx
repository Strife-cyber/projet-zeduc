import React, { useState } from 'react';
import CircleLogoComponent from '../../../components/circle_logo/circle_logo';
import TextFieldComponent from '../../../components/text_field/text_field';
import ButtonComponent from '../../../components/button/button';
import useSignUp from '../../../utilities/client/signup_function'; // Import the signup hook
import MessageComponent from '../../../components/message/message'; // Import the message component for feedback
import { useNavigate } from 'react-router';

const InscriptionMobilePage = () => {
    const { signUp, message, error } = useSignUp(); // Extract the signup function, message, and error
    const [name, setName] = useState(''); // State for the name
    const [email, setEmail] = useState(''); // State for the email
    const [password, setPassword] = useState(''); // State for the password
    const [reenterPassword, setReenterPassword] = useState(''); // State for re-entering password
    const [loading, setLoading] = useState(false); // Loading state to prevent multiple submissions
    const navigate = useNavigate();

    const toConnection = () => {
        navigate('/login');
    }

    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        return hasUpperCase && hasNumber;
    };

    const handleSignUp = async () => {
        if (password !== reenterPassword) {
            alert('Les mots de passe ne correspondent pas!');
            return;
        }

        if (!validatePassword(password)) {
            alert('Le mot de passe doit contenir au moins une majuscule et un chiffre!');
            return;
        }

        setLoading(true); // Set loading state to true during signup process
        try {
            await signUp(name, email, password); // Call the signup function with name, email, and password
            // Reset form fields
            setName('');
            setEmail('');
            setPassword('');
            setReenterPassword('');
            navigate('/questions');
        } catch (error) {
            console.error('Signup failed:', error);
        } finally {
            setLoading(false); // Set loading state to false after completion
        }
    };

    return (
        <>
            <div className="display-mobile">
                <CircleLogoComponent size="150px" direction="top" />
            </div>
            <div className='connect-body'>
                <p className='text-center' id='connect'>Inscrivez-vous pour découvrir chaque saveur</p>
                <div className='form' style={{minHeight: '30vh'}}>
                    <TextFieldComponent
                        width='70%'
                        placeholder='Entrez votre nom'
                        value={name} // Bind the name state
                        onChange={(e) => setName(e.target.value)} // Update the name state
                    />
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
                    <TextFieldComponent
                        width='70%'
                        inputType='password'
                        placeholder='Confirmez votre mot de passe'
                        type='password'
                        value={reenterPassword} // Bind the reenterPassword state
                        onChange={(e) => setReenterPassword(e.target.value)} // Update the reenterPassword state
                    />
                </div>
                <div className="button-contain">
                    <ButtonComponent
                        height='40px'
                        placeholder={loading ? 'Inscription en cours...' : 'Inscription'}
                        onClickFunction={handleSignUp}
                        disabled={loading} // Disable button while loading
                    />
                </div>
                {message && (
                    <MessageComponent
                        message={message}
                        type={message.includes('success') ? 'success' : 'error'} // Display message accordingly
                    />
                )}
                {error && (
                    <MessageComponent
                        message={error}
                        type='error'
                    />
                )}
                <p className="text-center" onClick={toConnection} style={{ margin: '10', backgroundColor: 'white' }}>
                    Vous avez déjà un compte ? Connectez-vous ici
                </p>
            </div>
        </>
    );
}

export default InscriptionMobilePage;
