import axios from "axios";

const useEmployerCommandes = () => {
    const fetchEmployerCommandes = async () => {
        try {
            const today = new Date().toLocaleDateString('en-CA');
            const request = `http://localhost/projet-zeduc/index.php/employee/${today}/get_commande`;

            const response = await axios.get(request)

            return response.data
        } catch (error) {
            return []; // Retourner un tableau vide en cas d'erreur
        }
    }

    return { fetchEmployerCommandes }
}

export default useEmployerCommandes;