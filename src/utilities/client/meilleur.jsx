import { useState } from 'react';
import axios from 'axios';

const useMeilleur = () => {
  const [meilleurData, setMeilleurData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMeilleur = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost/projet-zeduc/index.php/meilleur');
      setMeilleurData(response.data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return { meilleurData, loading, error, fetchMeilleur };
};

export default useMeilleur;
