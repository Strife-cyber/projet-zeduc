import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../../contexts/user_context";

const Manager = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (user != null){
            if (user.id_client != null) {
                navigate('/home');
            } else if (user.id_employer != null){
                navigate('/home_employer')
            } else if (user.id_gerant != null) {
                navigate('/home_gerant')
            } else {
                navigate('/home_admin')
            }
        } else {
            navigate('/login')
        }
    }, []); // Exécute la navigation si user ou navigate change
};

export default Manager;
