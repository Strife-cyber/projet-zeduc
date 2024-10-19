import axios from "axios";
import { useUser } from "../../contexts/user_context"

const useMesReclamation = () => {

    const { user } = useUser();

    const fetchMesReclamation = async () => {
        try{
            const userId = user?.id || 'user002';
            const request = `http://localhost/projet-zeduc/index.php/${userId}/mes_reclamation`;
            const response = await axios.get(request);

            return response.data;
        } catch(e){
            return null;
        }
    }

    return { fetchMesReclamation };
};

export default useMesReclamation;