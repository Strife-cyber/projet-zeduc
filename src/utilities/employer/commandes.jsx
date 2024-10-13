import axios from "axios";

const useEmployerCommandes = () => {
    const fetchEmployerCommandes = async () => {
        try {
            const today = '2024-09-02' //new Date().toLocaleDateString('en-CA');
            const request = `http://localhost/projet-zeduc/index.php/employee/${today}/get_commande`;

            const response = await axios.get(request)
            console.log(response.data)

            return response.data
        } catch (error) {
            console.error('Erreur lors de la récupération des fioles:', error.message); // Affiche le message d'erreur
            return []; // Retourner un tableau vide en cas d'erreur
        }
    }

    return { fetchEmployerCommandes }
}

export default useEmployerCommandes;