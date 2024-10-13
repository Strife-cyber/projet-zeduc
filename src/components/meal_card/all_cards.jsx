import { useState, useEffect } from "react";
import useMenu from "../../utilities/client/menu_function";
import MealCardComponent from "./meal_card";

const AllCardsComponent = () => {
    const { fetchMenu } = useMenu();
    const [menu, setMenu] = useState([]);

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

    return (
        <div className="all-cards" style={{backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', columnGap: '20px', rowGap: '20px', minHeight: '100vh'}}>
            {menu.length > 0 ? (
                menu.map((m, index) => (
                    <MealCardComponent key={index} nom={m.nom} image={m.image} prix={m.prix} />
                ))
            ) : (
                <li style={{fontSize: '40px', listStyle: "none", color: 'white', fontFamily: 'pacifico'}}>Aucun élément</li>
            )}
        </div>
    );
};

export default AllCardsComponent;
