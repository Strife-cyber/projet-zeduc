import { useState } from "react";
import { useUser } from "../contexts/user_context"
import axios from "axios";

const useParrain = () => {
    const { user } = useUser();
    const {message, setMessage} = useState('');

    const parrainage = async(code) => {
        try{
            const formData = new FormData();
            formData.append('id', user.id);
            formData.apppend('code', code);

            const response = await axios.post('http://localhost/projet-zeduc/index.php/parrain', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if(response.data = 'Parraine is added'){
                setMessage('Parraine is added')
            } else {
                setMessage('Code Taken into consideration')
            }
        } catch(error) {
            console.error('An error occured in parrain: That is all we know')
        }
    };

    return {parrainage, message};
};

export default useParrain;