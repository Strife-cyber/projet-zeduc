import axios from "axios";
import { useUser } from "../../contexts/user_context";

const useFiole = () => {
    const { user } = useUser();

    const fetchFiole = async () => {
        try {
            const userId = user?.id || 'user001'; // Utilise l'ID utilisateur ou une valeur par défaut
            const request = `http://localhost/projet-zeduc/index.php/${userId}/fiole`;

            const response = await axios.get(request);
            console.log(response.data);

            return response.data; // Retourne les données de la fiole
        } catch (error) {
            console.error('Erreur lors de la récupération des fioles:', error.message); // Affiche le message d'erreur
            return []; // Retourner un tableau vide en cas d'erreur
        }
    };

    return { fetchFiole };
};

export default useFiole;
