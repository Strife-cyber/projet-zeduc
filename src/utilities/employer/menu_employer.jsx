import axios from "axios";

const useMenuEmployer = () => {
    const today = new Date().toLocaleDateString('en-CA');  

    const insererMenu = async (id) => {
        try{
            const formData = new FormData();
            formData.append('id', id)
            formData.append('date', today)

            const response = await axios.post('http://localhost/projet-zeduc/index.php/employee/inserer_menu', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            return response.data
        } catch(error) {
            setMessage('Login failed! Please check your credentials.'); // Set error message
            throw error;
        }
    }

    const delMenu = async (id) => {
        try{
            const formData = new FormData();
            formData.append('id', id)
            formData.append('date', today)

            const response = await axios.post('http://localhost/projet-zeduc/index.php/employee/del_menu', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            return response.data;
        } catch(error) {
            setMessage('Login failed! Please check your credentials.'); // Set error message
            throw error;
        }
    }

    const getMenu = async () => {
        try{
            const request = `http://localhost/projet-zeduc/index.php/employee/${today}/get_menu`;
            const response = await axios.get(request);

            return response.data;  // Return the response data
        } catch (e) {
            return null;  // Return a fallback value or null in case of error
        }
    }

    return { insererMenu, delMenu, getMenu };
}

export default useMenuEmployer;