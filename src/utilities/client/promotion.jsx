import axios from "axios";

const usePromotion = () => {
    const fetchPromotion = async () => {
        try{
            const request = 'http://localhost/projet-zeduc/index.php/promotion';

            const response = await axios.get(request);

            return response.data;
        } catch (error){
            return []; // Retourner un tableau vide en cas d'erreur
        }
    };

    return { fetchPromotion };
};

export default usePromotion;
