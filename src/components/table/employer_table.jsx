import { useEffect, useState } from "react";
import useEmployerCommandes from "../../utilities/employer/commandes";
import TableComponent from "./table";
import axios from "axios";
import { useUser } from "../../contexts/user_context";

const EmployerTableComponent = () => {
    const { fetchEmployerCommandes } = useEmployerCommandes();
    const [commandes, setCommandes] = useState([]); // Initialiser avec un tableau vide
    const { user } = useUser();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchEmployerCommandes();
            console.log(data); // Vérifiez la structure de data

            if (Array.isArray(data)) {
                setCommandes(data.map(commande => ({
                    ...commande,
                    // Ajouter un champ pour gérer le clic
                    status: commande.status,
                })));
            } else {
                console.error("Expected data to be an array, but got:", data);
            }
        };

        fetchData();
    }, []);

    // Fonction pour changer le statut d'une commande
    const handleStatusChange = async (index, id) => {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('livreur', user.id_employer);

        const response = await axios.post('http://localhost/projet-zeduc/index.php/employee/update_commande', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        console.log(response.data);

        setCommandes(prevCommandes => {
            const updatedCommandes = [...prevCommandes];
            const commande = updatedCommandes[index];

            // Si l'icône est croix, changez le statut à true (tick)
            if (!commande.status) {
                commande.status = true;
            }

            return updatedCommandes;
        });
    };

    return (
        commandes.length ? (
            <TableComponent 
                headers={["Nom", "Plat", "Status", "Prix"]}
                data={commandes.map((commande, index) => [
                    commande.client_nom,
                    commande.plat_nom,
                    <div 
                        key={commande.id_commande}
                        style={{ display: 'flex', cursor: 'pointer', justifyContent: 'center', alignItems: 'center' }}
                        onClick={() => handleStatusChange(index, commande.id_commande)} // Ajoutez le gestionnaire de clic
                    >
                        {commande.status ? (
                            <i className="fas fa-check" style={{ color: 'green' }}></i> // Icône de tick
                        ) : (
                            <i className="fas fa-times" style={{ color: 'red' }}></i> // Icône de croix
                        )}
                    </div>,
                    commande.prix
                ])} // Utiliser directement commandes converties
            />
        ) : (
            <div className="d-flex align-items-center justify-content-center" style={{minHeight: '80vh'}}>
                <h1 style={{color: 'white'}}>Pas de commandes</h1>
            </div>
        )
    );
};

export default EmployerTableComponent;
