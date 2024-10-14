import { useEffect, useState } from "react";
import useGetReclamation from "../../utilities/employer/get_recommendation";
import TextFieldComponent from "../text_field/text_field";
import TableComponent from "../table/table";

const ReclamationDashBoard = () => {
    const { getReclamation } = useGetReclamation();
    const [reclamations, setReclamations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Charger les réclamations lorsque le composant se monte
    useEffect(() => {
        const fetchReclamations = async () => {
            const data = await getReclamation();
            setReclamations(data); // Met à jour les réclamations sans modification
        };
        fetchReclamations();
    }, []);

    // Filtrer les réclamations en fonction du terme de recherche
    const filteredReclamations = reclamations.filter((item) =>
        (item.nom && item.nom.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.email && item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const headers = ['Client', 'Email', 'Description', 'Date']; // Add Status in the future

    // Formater les données pour l'affichage dans le tableau
    const formattedReclamations = filteredReclamations.map((d) => [
        d.nom,
        d.email,
        d.description,
        d.date_reclamation
    ]);
    // Add the comment below to the top when ready
    /*<div 
            style={{ display: 'flex', cursor: 'pointer', justifyContent: 'center', alignItems: 'center' }}
        >
            {d.status ? (
                <i className="fas fa-check" style={{ color: 'green' }}></i> // Icône de tick
            ) : (
                <i className="fas fa-times" style={{ color: 'red' }}></i> // Icône de croix
            )}*
    </div>*/

    return (
        <div className="reclamation-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', padding: '20px' }}>
            {/* Champ de recherche */}
            <TextFieldComponent 
                height="45px" 
                width="300px" 
                placeholder="Recherche"
                inputType="search"
                onChange={(e) => setSearchTerm(e.target.value)} // Met à jour le terme de recherche
            />
            <div style={{height: '150px'}}></div>
            {/* Tableau des réclamations */}
            <TableComponent 
                data={formattedReclamations} // Affiche les réclamations formatées
                headers={headers}
            />
        </div>
    );
}

export default ReclamationDashBoard;
