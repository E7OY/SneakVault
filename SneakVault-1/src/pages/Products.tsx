// context/userContext.tsx
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Set user with admin privileges

    const value = {
        user,
        setUser,
        isAdmin: user?.role === 'admin', // Assuming user has a role property
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);