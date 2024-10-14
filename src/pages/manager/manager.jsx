import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../../contexts/user_context";

const Manager = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (user.code != null) {
            navigate('/home');
        } else if (user.id_employer != null){
            navigate('/home_employer')
        }
    }, []); // Exécute la navigation si user ou navigate change
};

export default Manager;
