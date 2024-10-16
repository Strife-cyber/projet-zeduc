import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../../contexts/user_context";

const Manager = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (user.id_client != null) {
            navigate('/home');
        } else if (user.id_employer != null){
            navigate('/home_employer')
        } else {
            navigate('/home_gerant')
        }
    }, []); // Exécute la navigation si user ou navigate change
};

export default Manager;
