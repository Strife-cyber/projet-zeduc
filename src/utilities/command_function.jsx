import axios from "axios";
import { useUser } from "../contexts/user_context";

const useCommand = () => {
    const { user } = useUser();

    const fetchCommand = async () => {
        try {
            const today = user?.id != null ? new Date().toLocaleDateString('en-CA') : '2024-09-01'; // Format ISO pour la date
            const userId = user?.id || 'user001'; // Utilise l'ID utilisateur ou une valeur par défaut
            const request = `http://localhost/projet-zeduc/index.php/${userId}/${today}/commande`;

            const response = await axios.get(request);
            console.log(response.data);

            return response.data; // Retourne les données de la commande
        } catch (error) {
            console.error('Error fetching commands:', error.message); // Affiche le message d'erreur
            return []; // Retourner un tableau vide en cas d'erreur
        }
    };

    return { fetchCommand };
};

export default useCommand;
