import { useState } from "react";
import { useUser } from "../contexts/user_context"
import { v4 } from "uuid";
import { axios } from "axios";

const useReclamation = () => {
    const { user } = useUser();
    const [message, setMessage] = useState('');

    const reclamation = async (description) => {
        const id = v4();
        const today = new Date().toLocaleDateString('en-CA');

        try{
            const formData = new FormData();
            formData.append('id_reclamation', id);
            formData.append('id_client', id);
            formData.append('description', description);
            formData.append('date', today);

            const response = await axios.post('http://localhost/projet-zeduc/index.php/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if(response.data){
                setMessage(response.data);
            }
        }  catch(error) {
            console.error('An error occured:', error.response ? error.response.data : error.message);
            setMessage("An error occured that's all we know"); // Set error message
            throw error;
        }
    }

    return { reclamation, message }
}

export default useReclamation;