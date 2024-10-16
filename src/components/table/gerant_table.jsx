import { useEffect, useState } from "react";
import useEmployer from "../../utilities/gerant/employer_manager";
import TableComponent from "./table";
import TextFieldComponent from "../text_field/text_field";
import ButtonComponent from "../button/button";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const GerantTableComponent = () => {
    const { fetchEmployer, insertEmployer, deleteEmployer } = useEmployer();
    const [employers, setEmployers] = useState([]);
    const [filteredEmployers, setFilteredEmployers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [newEmployer, setNewEmployer] = useState({ nom: '', email: '', secret: '' });
    const [ajouter, setAjouter] = useState(false); // Modal state

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchEmployer();

            if (Array.isArray(data)) {
                const mappedEmployers = data.map(d => {
                    const dateEmbauche = new Date(d.date_embauche);
                    const tempsTravaille = calculateYearsSince(dateEmbauche);

                    return {
                        id: d.id,
                        nom: d.nom,
                        email: d.email,
                        dateEmbauche: dateEmbauche.toLocaleDateString(),
                        tempsTravaille: !isNaN(tempsTravaille) ? tempsTravaille.toString() : 'N/A'
                    };
                });
                setEmployers(mappedEmployers);
                setFilteredEmployers(mappedEmployers); // Set initial filtered data
            }
        };

        fetchData();
    }, []);

    const calculateYearsSince = (date) => {
        const today = new Date();
        let yearsDifference = today.getFullYear() - date.getFullYear();
        const monthDifference = today.getMonth() - date.getMonth();
        const dayDifference = today.getDate() - date.getDate();

        if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
            yearsDifference--;
        }

        const totalMonths = (today.getFullYear() - date.getFullYear()) * 12 + monthDifference;
        const fractionalYear = totalMonths / 12 + dayDifference / (new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()) / 12;

        return (yearsDifference + fractionalYear % 1).toFixed(2);
    };

    const handleInputChange = (e, field) => {
        setNewEmployer({
            ...newEmployer,
            [field]: e.target.value
        });
    };

    const handleAddEmployer = async () => {
        if (newEmployer.nom && newEmployer.email && newEmployer.secret) {
            await insertEmployer(newEmployer.nom, newEmployer.email, newEmployer.secret);
            setNewEmployer({ nom: '', email: '', secret: '' });
            setAjouter(false); // Close modal
            toast.success("Employé ajouté avec succès !"); // Success message
            window.location.reload(); // Optionally reload to reflect changes
        } else {
            toast.error("Veuillez remplir tous les champs."); // Error message
        }
    };

    const handleDeleteEmployer = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet employé?")) {
            await deleteEmployer(id);
            setEmployers(employers.filter(e => e.id !== id)); // Remove deleted employee from state
            toast.info("Employé supprimé.");
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const filtered = employers.filter(employer =>
            employer.nom.toLowerCase().includes(e.target.value.toLowerCase()) ||
            employer.email.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredEmployers(filtered);
    };

    const headers = ['id', 'Nom', 'Email', 'Date d\'Embauche', 'Temps travaillé (ans)', 'Actions'];

    return (
        <div className="gerant-container" style={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
            <h2 style={{ margin: '0' }}>Liste des Employers</h2>

            {/* Search Bar */}
            <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10% auto'}}>
                <TextFieldComponent 
                    value={searchTerm} 
                    placeholder="Rechercher par nom ou email" 
                    onChange={handleSearch} 
                    width="70%" 
                    style={{ marginBottom: '20px' }} 
                />
            </div>

            {/* Employee Table */}
            <TableComponent 
                headers={headers} 
                data={[
                    ...filteredEmployers.map(e => ({
                        ...e, 
                        Actions: (
                            <ButtonComponent 
                                placeholder="Supprimer" 
                                onClickFunction={() => handleDeleteEmployer(e.id)} 
                            />
                        )
                    })),
                    { // Add a row for the "Add Employer" button
                        id: '',
                        nom: '',
                        email: '',
                        dateEmbauche: '',
                        tempsTravaille: '',
                        Actions: (
                            <ButtonComponent 
                                placeholder="Ajouter un employé" 
                                onClickFunction={() => setAjouter(true)} 
                                style={{ backgroundColor: '#4CAF50', color: 'white', width: '150px' }}
                            />
                        )
                    }
                ]}
            />

            {/* Add Employee Modal */}
            {ajouter && (
                <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="modal-content" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '80%', height: '60%', justifyContent: 'space-between', alignItems: 'center'}}>
                        <h3>Ajouter un Employé</h3>
                        <TextFieldComponent 
                            name="nom" 
                            value={newEmployer.nom} 
                            placeholder="Nom" 
                            onChange={(e) => handleInputChange(e, 'nom')} 
                            width="100%"
                        />
                        <TextFieldComponent 
                            name="email" 
                            value={newEmployer.email} 
                            placeholder="Email" 
                            onChange={(e) => handleInputChange(e, 'email')} 
                            width="100%"
                        />
                        <TextFieldComponent
                            name="secret" 
                            value={newEmployer.secret} 
                            placeholder="Secret" 
                            inputType="password" 
                            onChange={(e) => handleInputChange(e, 'secret')} 
                            width="100%"
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '60%', minWidth: '250px' }}>
                            <ButtonComponent 
                                placeholder="Ajouter" 
                                onClickFunction={handleAddEmployer} 
                                width="120px"
                            />
                            <ButtonComponent 
                                placeholder="Annuler" 
                                onClickFunction={() => setAjouter(false)} 
                                width="120px"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Container */}
            <ToastContainer />
        </div>
    );
};

export default GerantTableComponent;
