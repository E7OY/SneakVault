// UserContext.tsx
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Assume user has a role property

    const isAdmin = user && user.role === 'admin';

    return (
        <UserContext.Provider value={{ user, setUser, isAdmin }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);