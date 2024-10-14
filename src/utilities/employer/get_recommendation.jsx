import axios from "axios"

const useGetReclamation = () => {
    const getReclamation = async () => {
        try{
            const response = await axios.get('http://localhost/projet-zeduc/index.php/employee/get_reclamation');
            console.log(response.data);

            return response.data;
        } catch(error){
            throw error
        }
    }

    return { getReclamation };
};

export default useGetReclamation;