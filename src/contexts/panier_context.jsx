import { createContext, useContext, useEffect, useState } from "react";
import { openDB } from "idb";

export const PanierContext = createContext();

const PANIER_DB_NAME = "PanierDB";
const PANIER_STORE_NAME = "panier";

// Ouvrir ou créer la base de données IndexedDB
const openPanierDB = async () => {
    return openDB(PANIER_DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(PANIER_STORE_NAME)) {
                db.createObjectStore(PANIER_STORE_NAME, { keyPath: "id" });
            }
        },
    });
};

// Récupérer le panier depuis IndexedDB
const getPanierFromDB = async () => {
    const db = await openPanierDB();
    return db.getAll(PANIER_STORE_NAME);
};

// Ajouter ou mettre à jour un plat dans IndexedDB
const updatePanierInDB = async (panier) => {
    const db = await openPanierDB();
    const tx = db.transaction(PANIER_STORE_NAME, "readwrite");
    const store = tx.objectStore(PANIER_STORE_NAME);

    // Ajouter ou mettre à jour chaque plat
    for (let item of panier) {
        store.put(item);
    }
    await tx.done;
};

// Supprimer un plat dans IndexedDB
const removePlatFromDB = async (id) => {
    const db = await openPanierDB();
    const tx = db.transaction(PANIER_STORE_NAME, "readwrite");
    const store = tx.objectStore(PANIER_STORE_NAME);
    await store.delete(id);
    await tx.done;
};

export const PanierProvider = ({ children }) => {
    const [panier, setPanier] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchPanier = async () => {
            const panierFromDB = await getPanierFromDB();
            setPanier(panierFromDB);
        };

        fetchPanier();
    }, []);

    const openPanierModal = () => {
        setOpen(true)
    }

    const closePanierModal = () => {
        setOpen(false)
    }

    const getPanierState = () => {
        return open
    }

    const ajouterAuPanier = async (plat) => {
        setPanier((prevPanier) => {
            const existingPlat = prevPanier.find(item => item.id === plat.id);
            let updatedPanier;

            if (existingPlat) {
                updatedPanier = prevPanier.map(item =>
                    item.id === plat.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                updatedPanier = [...prevPanier, { ...plat, quantity: 1 }];
            }

            // Mettre à jour IndexedDB
            updatePanierInDB(updatedPanier);
            return updatedPanier;
        });
    };

    const supprimerDuPanier = async (plat) => {
        setPanier((prevPanier) => {
            const existingPlat = prevPanier.find(item => item.id === plat.id);
            let updatedPanier;

            if (existingPlat) {
                if (existingPlat.quantity > 1) {
                    updatedPanier = prevPanier.map(item =>
                        item.id === plat.id ? { ...item, quantity: item.quantity - 1 } : item
                    );
                } else {
                    updatedPanier = prevPanier.filter(item => item.id !== plat.id);
                    removePlatFromDB(plat.id);  // Supprimer l'élément s'il n'est plus dans le panier
                }
            } else {
                updatedPanier = prevPanier;
            }

            // Mettre à jour IndexedDB
            updatePanierInDB(updatedPanier);
            return updatedPanier;
        });
    };

    return (
        <PanierContext.Provider value={{ panier, ajouterAuPanier, supprimerDuPanier, openPanierModal, closePanierModal, getPanierState }}>
            {children}
        </PanierContext.Provider>
    );
};

export const usePanier = () => {
    return useContext(PanierContext);
};
