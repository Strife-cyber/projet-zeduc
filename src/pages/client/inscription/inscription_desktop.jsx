import React, { useState } from 'react';
import ButtonComponent from "../../../components/button/button";
import CircleLogoComponent from "../../../components/circle_logo/circle_logo";
import TextFieldComponent from "../../../components/text_field/text_field";
import MessageComponent from "../../../components/message/message"; // Import your message component
import useSignUp from '../../../utilities/client/signup_function'; // Import the signup hook
import '../connexion/connexion_desktop.css';
import { useNavigate } from 'react-router';

const InscriptionDesktopPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reenterPassword, setReenterPassword] = useState('');
    const { signUp, message } = useSignUp(); // Using the useSignUp hook
    const navigate = useNavigate();

    const toconnection = () => {
        navigate('/login');
    }

    const handleSignUp = async () => {
        if (password !== reenterPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            await signUp(name, email, password); // Call the signUp function from the hook
            setName(''); // Clear name input
            setEmail(''); // Clear email input
            setPassword(''); // Clear password input
            setReenterPassword(''); // Clear re-enter password input
            navigate('/home');
            alert(message)
        } catch (error) {
            console.error("Signup error:", error); // Optional: Log the error for debugging
        }
    };

    return (
        <div className="container-fluid" id="white-part">
            <div className="white-content">
                <div className="contents">
                    <h2 className="miam">Inscrivez-vous pour <br /> découvrir chaque saveur</h2>
                    <div className="fields" style={{minHeight: '30vh'}}>
                        <TextFieldComponent
                            inputType="text"
                            width="80%"
                            placeholder="Entrez votre nom"
                            value={name}
                            onChange={(e) => setName(e.target.value)} // Handle name input change
                        />
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
                        <TextFieldComponent
                            inputType="password"
                            width="80%"
                            placeholder="Confirmez votre mot de passe"
                            value={reenterPassword}
                            onChange={(e) => setReenterPassword(e.target.value)} // Handle re-enter password input change
                        />
                    </div>
                    <div className="button-contain">
                        <ButtonComponent placeholder="Inscription" onClickFunction={handleSignUp} />
                    </div>
                    {message && (
                        <MessageComponent
                            message={message}
                            type={message.includes('successful') ? 'success' : 'error'} // Determine message type
                        />
                    )}
                    <p className="text-center" onClick={toconnection}>Vous avez déjà un compte ? Connectez-vous ici</p>
                </div>
            </div>
            <CircleLogoComponent />
        </div>
    );
}

export default InscriptionDesktopPage;
