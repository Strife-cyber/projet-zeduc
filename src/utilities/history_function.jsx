import axios from "axios";
import { useUser } from "../contexts/user_context"

const useHistory = () => {
    const { user } = useUser();

    const fetchHistory = async () => {
        try {
            const userId = user?.id || 'user001'; // Utilise l'ID utilisateur ou une valeur par défaut
            const request = `http://localhost/projet-zeduc/index.php/${userId}/historique`;

            const response = await axios.get(request);
            console.log(response.data);

            return response.data; 
        } catch (error) {
            console.error('Erreur lors de la récupération des fioles:', error.message); // Affiche le message d'erreur
            return []; // Retourner un tableau vide en cas d'erreur
        }
    };

    return { fetchHistory };
};

export default useHistory;