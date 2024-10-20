import axios from "axios";
import hashString from "../hash";

const useSecurity = () => {
    const insertQuestion = async (user_id, question, answer) => {
        try {
            const formData = new FormData();
            formData.append('user_id', user_id);
            formData.append('question', question);
            formData.append('answer', answer);

            const response = await axios.post('http://localhost/projet-zeduc/index.php/insert_question', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log(response.data)

            return response.data
        } catch (error) {
            throw error
        }
    }

    const fetchQuestion = async (email) => {
        try {
            const response = await axios.get(`http://localhost/projet-zeduc/index.php/${email}/get_question`)

            console.log(response.data)
            return response.data
        } catch (error) {
            throw error
        }
    }

    const resetPassword = async (email, password) => {
        try{
            const newPassword = hashString(password);

            const responseToken = await axios.get(`http://localhost/projet-zeduc/index.php/alice.dupont@example.com/token`)
            console.log(responseToken.data);

            const formData = new FormData();
            formData.append('token', responseToken.data.request_password_reset)
            formData.append('password', newPassword)

            const response = await axios.post('http://localhost/projet-zeduc/index.php/reset', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(response.data)

            return response.data
        } catch (error) {
            throw error
        }
    }

    return { insertQuestion, fetchQuestion, resetPassword}
}

export default useSecurity;