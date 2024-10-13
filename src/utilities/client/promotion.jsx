import axios from "axios";

const usePromotion = () => {
    const fetchPromotion = async () => {
        try{
            const request = 'http://localhost/projet-zeduc/index.php/promotion';

            const response = await axios.get(request);
            console.log(response.data);

            return response.data;
        } catch (error){
            console.error('Erreur lors de la récupération des fioles:', error.message); // Affiche le message d'erreur
            return []; // Retourner un tableau vide en cas d'erreur
        }
    };

    return { fetchPromotion };
};

export default usePromotion;
