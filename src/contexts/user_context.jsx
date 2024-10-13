import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const UserContext = createContext();

// Create a context provider
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Retrieve user data from session storage if available
        const storedUser = sessionStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null; // Parse JSON if it exists
    });

    // Update session storage whenever user changes
    useEffect(() => {
        if (user) {
            sessionStorage.setItem('user', JSON.stringify(user)); // Store user in session storage
        } else {
            sessionStorage.removeItem('user'); // Remove user from session storage if null
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the context
export const useUser = () => {
    return useContext(UserContext);
};
