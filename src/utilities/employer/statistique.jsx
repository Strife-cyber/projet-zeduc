import axios from "axios";

const useStats = () => {
    const fetchStats = async () => {
        try {
            const request = 'http://localhost/projet-zeduc/index.php/employee/statistique';

            const response = await axios.get(request);
            console.log(response.data);

            const statisticPlat = response.data.statisticPlat;
            const tempMoyen = response.data.tempMoyen;
            const detailsTemp = response.data.detailsTemp;
            const commandeLivrer = response.data.commandeLivrer;

            return { statisticPlat, tempMoyen, detailsTemp, commandeLivrer };
        } catch (error) {
            console.error(error.message); // Affiche le message d'erreur
            return []; // Retourner un tableau vide en cas d'erreur
        }
    };

    return { fetchStats };
};

export default useStats;
