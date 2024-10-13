import axios from "axios";
import { useUser } from "../../contexts/user_context"

const useMesReclamation = () => {

    const { user } = useUser();

    const fetchMesReclamation = async () => {
        try{
            const userId = user?.id || 'user002';
            const request = `http://localhost/projet-zeduc/index.php/${userId}/mes_reclamation`;
            const response = await axios.get(request);
            console.log(response.data);

            return response.data;
        } catch(e){
            console.error('Error fetching menu:', e);  // Proper error handling
            return null;
        }
    }

    return { fetchMesReclamation };
};

export default useMesReclamation;