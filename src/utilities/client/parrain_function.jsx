import { useState } from "react";
import { useUser } from "../../contexts/user_context";
import axios from "axios";

const useParrain = () => {
    const { user } = useUser();
    const [message, setMessage] = useState(''); // Correction : utiliser des crochets pour useState

    const parrainage = async (code) => {
        try {
            const userId = user?.id || 'user002';

            const formData = new FormData();
            formData.append('id', userId);
            formData.append('code', code); // Correction : `append` au lieu de `apppend`

            const response = await axios.post('http://localhost/projet-zeduc/index.php/parrain', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data === 'Parraine is added') { // Correction : utiliser `===` pour la comparaison
                setMessage('Parraine is added');
            } else {
                setMessage('Code Taken into consideration');
            }
        } catch (error) {
            setMessage('An error occurred while processing your request.'); // Ajout d'un message d'erreur à l'utilisateur
        }
    };

    return { parrainage, message };
};

export default useParrain;
