//archivo para manejar el estado del usuario en toda la app

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

interface UserContextType {
    //le indicamos cada uno de los datos que va a tener el contexto global y su tipo
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    register: (event: React.FormEvent<HTMLFormElement>, email: string, password: string) => Promise<void>;
    login: (event: React.FormEvent<HTMLFormElement>, email: string, password: string) => Promise<void>;
    isSignUpMode: boolean;
    setIsSignUpMode: React.Dispatch<React.SetStateAction<boolean>>;
}

// children es el contenido que se va a renderizar dentro del provider y es de tipo React.ReactNode
interface UserProviderProps {
    children: React.ReactNode;
}

const UserContext = createContext<UserContextType | null>(null);

//provider que nos permite usar el contexto global con las funciones y el estado
//react.FC es un tipo generico que recibe las props que recibe el componente Y CHILDREN es el contenido que se va a renderizar dentro del provider
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    //comprobar si el usuario está logueado, el hook useEffect escucha cambios en el estado de autenticación del usuario utilizando la funcion
    //onAuthStateChanged de firebase, si el usuario está logueado setUser se actualiza con el usuario actual, si no setUser se actualiza con null
    useEffect(() => {
        //getAuth() inicializa la autenticación de firebase
        const auth = getAuth();
        const isLogged = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

//el hook para poder user el contexto global
export const useUser = () => useContext(UserContext);
export default UserContext;