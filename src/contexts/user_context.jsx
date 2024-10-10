import React, { createContext, useContext, useState } from 'react';

// Créer le contexte
const UserContext = createContext();

// Créer un fournisseur de contexte
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // État pour l'utilisateur

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte
export const useUser = () => {
    return useContext(UserContext);
};
