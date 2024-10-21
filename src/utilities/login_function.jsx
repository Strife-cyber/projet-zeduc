import axios from "axios";
import { useUser } from "../contexts/user_context";
import { useState } from "react"; // Import useState for managing messages
import hashString from "./hash";

const useLogin = () => {
    const { setUser } = useUser();
    const [message, setMessage] = useState(''); // State for feedback messages

    // Fonction pour attendre un certain temps
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const login = async (email, password) => {
        try {
            await setUser(null)
            // hash the password first
            const hashedPassword = await hashString(password);

            // Créez un objet FormData
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', hashedPassword);

            // Attendez 1 seconde
            //await delay(1000);
            
            // Envoyez la requête avec FormData
            const response = await axios.post(`http://localhost/projet-zeduc/index.php/login`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Assurez-vous d'indiquer le type de contenu
                }
            });


            if (response.data && response.data !== null) {
                await setUser(response.data);
                setMessage('Login successful!'); // Set success message
                return response.data;
            } else {
                setMessage('User not found'); // Set error message
            }

        } catch (error) {
            setMessage(`Login failed! ${error.response}`); // Set error message
            throw error;
        }
    };

    return { login, message }; // Return the message along with login function
};

export default useLogin;
