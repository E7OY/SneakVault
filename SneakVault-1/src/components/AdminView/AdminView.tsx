// UserContext.tsx
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Replace with your user fetching logic

    const isAdmin = user?.role === 'admin'; // Assuming user has a role property

    return (
        <UserContext.Provider value={{ user, setUser, isAdmin }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);