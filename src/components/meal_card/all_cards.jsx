import { useState, useEffect, useContext } from "react";
import useMenu from "../../utilities/client/menu_function";
import MealCardComponent from "./meal_card";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import des styles de Toastify
import { usePanier } from "../../contexts/panier_context";

const AllCardsComponent = () => {
    const { fetchMenu } = useMenu();
    const [menu, setMenu] = useState([]);
    const { panier, ajouterAuPanier, supprimerDuPanier } = usePanier();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchMenu();

            if (Array.isArray(data)) {
                const parsedMenu = data.map(c => {
                    return {
                        id: c.id_plat,      // ID du plat
                        image: c.image,     // Image en base64 ou chemin de l'image
                        nom: c.nom,         // Nom du plat
                        prix: c.prix,       // Prix du plat
                    };
                });

                setMenu(parsedMenu); // Mise à jour du menu avec les données directement extraites
            }
        };

        fetchData();
    }, []);

    const handleDoubleClick = (data) => {
        // Vérifie si l'élément est déjà dans le panier
        
        ajouterAuPanier(data);
        if (panier.includes(data)) {
            // Affiche une notification toast
            toast(`${data.nom} a été ajouté au panier encore!`, {
                autoClose: 3000, // Toast se ferme automatiquement après 3 secondes
                className: 'montaga-font', // Apply custom class here
                style: {backgroundColor: '#cfbd97', color: 'white'}
            });
        } else {
            // Affiche une notification toast
            toast(`${data.nom} a été ajouté au panier !`, {
                autoClose: 3000, // Toast se ferme automatiquement après 3 secondes
                className: 'montaga-font', // Apply custom class here
                style: {backgroundColor: '#cfbd97', color: 'white'}
            });
        }
    };

    return (
        <>
            <ToastContainer /> {/* Conteneur de Toastify */}
            <div
                className="all-cards"
                style={{
                    backgroundColor: 'black',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    columnGap: '20px',
                    rowGap: '20px',
                    minHeight: '100vh',
                }}
            >
                {menu.length > 0 ? (
                    menu.map((m, index) => (
                        <MealCardComponent
                            onDoubleClickFunction={() => handleDoubleClick(m)}
                            key={index}
                            id_plat={m.id}
                            nom={m.nom}
                            image={m.image}
                            prix={m.prix}
                        />
                    ))
                ) : (
                    <li
                        style={{
                            fontSize: '40px',
                            listStyle: 'none',
                            color: 'white',
                            fontFamily: 'pacifico',
                        }}
                    >
                        Aucun élément
                    </li>
                )}
            </div>
        </>
    );
};

export default AllCardsComponent;
