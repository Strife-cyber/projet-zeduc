import { useState } from "react";
import { useUser } from "../../contexts/user_context";
import { v4 as uuidv4 } from "uuid";
import hashString from "../hash";
import axios from "axios";

const useSignUp = () => {
    const { setUser } = useUser();
    const [message, setMessage] = useState('');

    // Fonction pour attendre un certain temps
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const signUp = async (username, email, password) => {
        const id = uuidv4();

        try{
            const hashedPassword = await hashString(password);

            const formData = new FormData();
            formData.append('id', id);
            formData.append('name', username);
            formData.append('email', email);
            formData.append('password', hashedPassword);

            await delay(1000);

            const response = await axios.post('http://localhost/projet-zeduc/index.php/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data)

            setUser(response.data);
            setMessage('Connection Successful');
        } catch(error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            setMessage('Login failed! Please check your credentials.'); // Set error message
            throw error;
        }
    };

    return { signUp, message };
};

export default useSignUp;