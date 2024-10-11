import axios from "axios";

const useMenu = () => {

    const fetchMenu = async () => {
        try {
            const today = '2024-10-01'; //new Date().toLocaleDateString('en-CA');  // Current date with - instead of /// Current date as a string
            const request = `http://localhost/projet-zeduc/index.php/${today}/menu`;
            const response = await axios.get(request);
            console.log(response.data);

            return response.data;  // Return the response data
        } catch (e) {
            console.error('Error fetching menu:', e);  // Proper error handling
            return null;  // Return a fallback value or null in case of error
        }
    }

    return { fetchMenu };  // Return the menu function from the hook
};

export default useMenu;
