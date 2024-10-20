import axios from "axios";

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

    const fetchQuestion = async (id) => {
        try {
            const response = await axios.get(`http://localhost/projet-zeduc/index.php/${id}/get_question`)

            console.log(response.data)
            return response.data
        } catch (error) {
            throw error
        }
    }

    return { insertQuestion, fetchQuestion }
}

export default useSecurity;