import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../../contexts/user_context";

const Manager = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (user.code !== null) {
            navigate('/home');
        }
    }, []); // Exécute la navigation si user ou navigate change
};

export default Manager;
