import axios from "axios";

const useMenu = () => {

    const menu = async () => {
        try {
            const today = new Date().toLocaleDateString();  // Current date as a string
            const request = `http://localhost/projet-zeduc/index.php/${today}/menu`;
            const response = await axios.get(request);

            return response.data;  // Return the response data
        } catch (e) {
            console.error('Error fetching menu:', e);  // Proper error handling
            return null;  // Return a fallback value or null in case of error
        }
    }

    return { menu };  // Return the menu function from the hook
};

export default useMenu;
