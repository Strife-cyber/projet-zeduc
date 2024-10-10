import axios from "axios";
import { useUser } from "../../contexts/user_context";
import { useState } from "react"; // Import useState for managing messages

const useLogin = () => {
    const { setUser } = useUser();
    const [message, setMessage] = useState(''); // State for feedback messages

    // Fonction pour attendre un certain temps
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const login = async (email, password) => {
        try {
            // Créez un objet FormData
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            // Attendez 1,5 seconde
            await delay(1500);

            // Envoyez la requête avec FormData
            const response = await axios.post('http://localhost/projet-zeduc/index.php/login', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Assurez-vous d'indiquer le type de contenu
                }
            });

            console.log(response);

            if (response.data && response.data !== null) {
                setUser(response.data);
                setMessage('Login successful!'); // Set success message
                return response.data;
            } else {
                setMessage('User not found'); // Set error message
            }

        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            setMessage('Login failed! Please check your credentials.'); // Set error message
            throw error;
        }
    };

    return { login, message }; // Return the message along with login function
};

export default useLogin;
