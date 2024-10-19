import axios from "axios";
import { useUser } from "../../contexts/user_context"

const useHistory = () => {
    const { user } = useUser();

    const fetchHistory = async () => {
        try {
            const userId = user?.id; // Utilise l'ID utilisateur ou une valeur par défaut
            const request = `http://localhost/projet-zeduc/index.php/${userId}/historique`;

            const response = await axios.get(request);

            return response.data; 
        } catch (error) {
            return []; // Retourner un tableau vide en cas d'erreur
        }
    };

    return { fetchHistory };
};

export default useHistory;