import axios from "axios";
import { v4 } from "uuid";

const usePlat = () => {
    
    const fetchPlat = async () => {
        try {
            const request = 'http://localhost/projet-zeduc/index.php/employee/get_plat';

            const response = await axios.get(request);

            return response.data;
        } catch (error) {
            return []; // Retourner un tableau vide en cas d'erreur
        }
    };

    const insererPlat = async (image, nom, prix) => {
        const id = v4();

        try{
            const formData = new FormData();
            formData.append('id', id);
            formData.append('image', image);
            formData.append('nom', nom);
            formData.append('prix', prix);

            const response = await axios.post('http://localhost/projet-zeduc/index.php/employee/inserer_plat', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            return response.data
        } catch(error) {
            setMessage('Login failed! Please check your credentials.'); // Set error message
            throw error;
        }
    } 

    return { fetchPlat, insererPlat };
};

export default usePlat;