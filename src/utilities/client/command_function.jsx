import axios from "axios";
import { useUser } from "../../contexts/user_context";
import { v4 } from "uuid";

const useCommand = () => {
    const { user } = useUser();

    const fetchCommand = async () => {
        try {
            const today = new Date().toLocaleDateString('en-CA'); // Format ISO pour la date
            const userId = user?.id || 'user001'; // Utilise l'ID utilisateur ou une valeur par défaut
            const request = `http://localhost/projet-zeduc/index.php/${userId}/${today}/commande`;

            const response = await axios.get(request);

            return response.data; // Retourne les données de la commande
        } catch (error) {
            return []; // Retourner un tableau vide en cas d'erreur
        }
    };

    const insertCommande = async (id_plat) => {
        try {
            const id_commande = v4();
            const today = user?.id != null ? new Date().toLocaleDateString('en-CA') : '2024-09-01'; // Format ISO pour la date
            const userId = user?.id || 'user001';

            const formData = new FormData();
            formData.append('id_commande', id_commande)
            formData.append('id_client', userId)
            formData.append('id_plat', id_plat)
            formData.append('date_commande', today)

            const response = await axios.post(`http://localhost/projet-zeduc/index.php/commander`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Assurez-vous d'indiquer le type de contenu
                }
            });

            return response.data
        } catch (error) {
            throw error;
        }
    }

    return { fetchCommand, insertCommande };
};

export default useCommand;
