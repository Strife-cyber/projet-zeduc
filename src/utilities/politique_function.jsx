import axios from "axios";

const usePolitique = () => {
    const fetchPolitique = async () => {
        try {
            const request = 'http://localhost/projet-zeduc/index.php/pol/get_politique';
            const response = await axios.get(request)

            return response.data
        } catch (error) {
            throw error
        }
    }

    const updatePoints = async (id, points) => {
        try {
            const formData = new FormData();

            formData.append('id', id)
            formData.append('points', points)

            const response = await axios.post('http://localhost/projet-zeduc/index.php/pol/post_points', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Assurez-vous d'indiquer le type de contenu
                }
            })


            return response.data
        } catch (error) {
            throw error
        }
    }

    return { fetchPolitique, updatePoints }
}

export default usePolitique;