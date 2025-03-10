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
        return () => isLogged();
    }, []);

    //provider que nos permite usar el contexto global con las funciones y el estado
    //este fragmento de codigo es la pare central del componente userProvider
    //proporciona el estado delusuario (user) y la funcion para actualizarlo (setUser) a todos los componentes que esten envueltos dentro de este
    //value define que datos se van a compartir a los componentes hijos; user el estado actual del usuario y setUser la funcion para actualizarlo
    //{children} es el contenido que se va a renderizar dentro del provider, al ponerlo indicamos que todo lo que este dentro de UserProvider va a tener acceso al contexto global
    return (
        <UserContext.Provider value={{ user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};

//exportamos hook para usar el contexto global
export const useUser = () => useContext(UserContext);
export default UserContext;