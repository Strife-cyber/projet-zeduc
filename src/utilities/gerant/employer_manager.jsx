import axios from "axios";
import { v4 } from "uuid";
import hashString from "../hash";

const useEmployer = () => {
    const fetchEmployer = async () => {
        try{
            const request = 'http://localhost/projet-zeduc/index.php/gerant/get_employer';
            const response = await axios.get(request);
            console.log(response.data);

            return response.data;
        } catch (e) {
            console.error('Error fetching employer: ', e);
            return null;
        }
    }

    const insertEmployer = async (nom, email, password) => {
        try {
            const today = new Date().toLocaleDateString('en-CA');
            const id = v4();
            const hashedPassword = hashString(password);

            const formData = new FormData();
            formData.append('id', id)
            formData.append('nom', nom)
            formData.append('email', email)
            formData.append('password', hashedPassword)
            formData.append('date', today)

            const response = await axios.post('http://localhost/projet-zeduc/index.php/gerant/insert_employer', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log(response.data)
            return response.data

        } catch (error) {
            console.error('error #%d', error)
            throw error
        }
    }

    const deleteEmployer = async (id) => {
        try {
            const response = await axios.delete(`http://localhost/projet-zeduc/index.php/gerant/${id}/delete_employer`)

            console.log(response.data)
            return response.data
        } catch (error) {
            throw error
        }
    }

    return { fetchEmployer, insertEmployer, deleteEmployer }
}

export default useEmployer;