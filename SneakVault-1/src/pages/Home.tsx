// UserContext.tsx
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Set user with admin property

    const login = (userData) => {
        setUser(userData); // userData should include isAdmin property
    };

    return (
        <UserContext.Provider value={{ user, login }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);