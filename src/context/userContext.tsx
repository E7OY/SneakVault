//archivo para manejar el estado del usuario en toda la app

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    register: (event: React.FormEvent<HTMLFormElement>, email: string, password: string) => Promise<void>;
    login: (event: React.FormEvent<HTMLFormElement>, email: string, password: string) => Promise<void>;
}
interface UserProviderProps {
    children: React.ReactNode;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    //comprobar si el usuario está logueado
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    //provider que nos permite usar el contexto global con las funciones y el estado
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

//exportamos hook para usar el contexto global
export const useUser = () => useContext(UserContext);
export default UserContext;