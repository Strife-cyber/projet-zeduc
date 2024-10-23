import axios from "axios";
import { v4 } from "uuid";

const useGestion = () => {
    // Insert a new event
    const InsertEvenement = async (title, description, jeux) => {
        try {
            const id = v4();
            const formData = new FormData();

            formData.append('id', id);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('jeux', jeux);
            
            const request = 'http://localhost/projet-zeduc/index.php/admin/add_event';

            const response = await axios.post(request, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data);
            return response.data;

        } catch (error) {
            throw error;
        }
    };

    // Insert a new promotion
    const InsertPromotion = async (id_admin, debut, fin, description) => {
        try {
            const id_promotion = v4();
            const formData = new FormData();

            formData.append('id_promotion', id_promotion);
            formData.append('id_admin', id_admin);
            formData.append('debut', debut);
            formData.append('fin', fin);
            formData.append('description', description);

            const request = 'http://localhost/projet-zeduc/index.php/admin/add_promotion';
            const response = await axios.post(request, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    // Fetch all events
    const getAllEvenements = async () => {
        try {
            const request = 'http://localhost/projet-zeduc/index.php/admin/get_all_events';
            const response = await axios.get(request);

            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    // Delete an event by ID
    const deleteEvenementById = async (id) => {
        try {
            const request = `http://localhost/projet-zeduc/index.php/admin/delete_event?id=${id}`;
            const response = await axios.delete(request);

            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    // Fetch all promotions
    const getAllPromotions = async () => {
        try {
            const request = 'http://localhost/projet-zeduc/index.php/admin/get_all_promotions';
            const response = await axios.get(request);

            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    // Delete a promotion by ID
    const deletePromotionById = async (id_promotion) => {
        try {
            const request = `http://localhost/projet-zeduc/index.php/admin/delete_promotion?id_promotion=${id_promotion}`;
            const response = await axios.delete(request);

            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    return {
        InsertEvenement,
        InsertPromotion,
        getAllEvenements,
        deleteEvenementById,
        getAllPromotions,
        deletePromotionById
    };
};

export default useGestion;
