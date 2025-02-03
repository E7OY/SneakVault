import React, { useState } from 'react';
import { Form } from 'react-router-dom';
import '../index.css';

import logogoogle from '../assets/logogoogle.png';

import { signInWithGooglePopup, registerWithEmailAndPassword, signInWithEmailAndPassword, signOutUser } from "../utils/firebase.utils.tsx";

interface RegisterProps {
    setUser: React.Dispatch<React.SetStateAction<{ displayName?: string; email: string } | null>>;
}

const Register: React.FC<RegisterProps> = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isRegistering, setIsRegistering] = useState(true);
    const [user, setLocalUser] = useState<{ displayName?: string; email: string } | null>(null);

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const user = await registerWithEmailAndPassword(email, password);
            setLocalUser({ ...user, displayName: username });
            setUser({ ...user, displayName: username });
            //mensaje de error o redireccion
        } catch {
            //errores
        }
    };

    const handleSignIn = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const user = await signInWithEmailAndPassword(email, password);
            setLocalUser(user);
            setUser( user );
            //mensaje de error o redireccion
        } catch {
            //errores
        }
    };

    const handleSignOut = async () => {
        try {
            await signOutUser();
            setLocalUser(null);
            setUser( null );
            //mensaje de error o redireccion
        } catch {
            //errores
        }
    };

    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        setLocalUser(response.user);
        setUser(response.user);
        console.log(response);
    };

    return (
        <>
            <div className="register container mx-auto mt-5 mb-5">
                <div className="row">
                    <div className="col-12 col-md-6 bg-black text-white p-5 position-relative text-end">
                        <h2>{isRegistering ? 'Registro' : 'Iniciar Sesión'}</h2>
                        <p>{isRegistering ? 'Registrate y consigue un 10% de descuento' : 'Inicia sesión para continuar'}</p>
                        <h1 className='position-absolute bottom-0 text-opacity-100'>SneakVault</h1>
                    </div>
                    <div className="col-12 col-md-6 border border-2 border-black py-5">
                        {user ? (
                            <div className="container d-flex flex-column justify-content-center gap-3">
                                <h3>Bienvenido, {user.displayName || user.email}</h3>
                                <button className='button' onClick={handleSignOut}>Cerrar Sesión</button>
                            </div>
                        ) : (
                            <Form method='post' onSubmit={isRegistering ? handleRegister : handleSignIn}>
                                <div className="container d-flex flex-column justify-content-center gap-3">
                                    {isRegistering && (
                                        <div className='form-field w-50'>
                                            <label htmlFor='username' id='username'>Nombre de Usuario *</label>
                                            <input type='text' name='username' id='username' required value={username} onChange={(e) => setUsername(e.target.value)} />
                                        </div>
                                    )}
                                    <div className='form-field w-50'>
                                        <label htmlFor='email' id='email'>Email *</label>
                                        <input type='text' name='email' id='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className='form-field w-50'>
                                        <label htmlFor='password' id='password'>Contraseña *</label>
                                        <input type='password' name='password' id='password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className='row d-flex gap-2 container'>
                                        <button type='submit' className='button'>{isRegistering ? 'Registrarse' : 'Iniciar Sesión'}</button>
                                        <button className='button-google' onClick={logGoogleUser}>
                                            <img src={logogoogle} className='mx-2' width={20} alt="" />
                                            Sign In With Google
                                        </button>
                                    </div>
                                    <button type='button' className='button w-50' onClick={() => setIsRegistering(!isRegistering)}>
                                        {isRegistering ? '¿Ya tienes una cuenta? Inicia Sesión' : '¿No tienes una cuenta? Regístrate'}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;