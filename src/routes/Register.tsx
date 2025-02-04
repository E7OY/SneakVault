import React, { useState, useContext } from 'react';
import { Form } from 'react-router-dom';
import UserContext from '../context/userContext';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { signInWithGooglePopup } from '../utils/firebase.utils';
import logogoogle from '../assets/logogoogle.png';

const Register = () => {
    const [isRegistering, setIsRegistering] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userContext = useContext(UserContext);
    const user = userContext ? userContext.user : null;
    const setUser = userContext ? userContext.setUser : () => {};
    const errorMessage = document.getElementsByClassName('error');

    function cutMail(email: string | string[]): string | string[] {
        if (typeof email === 'string') {
            for (let i = 0; i < email.length; i++) {
                if (email[i] === '@') {
                    return email.slice(0, i);
                }
            }
        }
        return email;
    }

    const handleSignOut = async () => {
        try {
            await signOut(getAuth());
            setUser(null);
        } catch (error) {
            Array.from(errorMessage).forEach((element) => {
                element.textContent = 'Error al cerrar sesion: ' + error;
            });
        }
    };

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const auth = getAuth();
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            setUser(user);
        } catch (error) {
            Array.from(errorMessage).forEach((element) => {
                element.textContent = 'Error en el registro: ' + error;
            });
        }
    };

    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const auth = getAuth();
            const { user } = await signInWithEmailAndPassword(auth, email, password);
            setUser(user);
        } catch (error) {
            Array.from(errorMessage).forEach((element) => {
                element.textContent = 'Error al iniciar sesion: ' + error;
            });
        }
    };

    const logGoogleUser = async () => {
        try {
            const response = await signInWithGooglePopup();
            setUser(response.user);
        } catch (error) {
            Array.from(errorMessage).forEach((element) => {
                element.textContent = 'Error al iniciar sesion con Google: ' + error;
            });        }
    };

    return (
        <div className="register container mx-auto mt-5 mb-5">
            <div className="row">
                <div className="col-12 col-md-6 bg-black text-white p-5 position-relative text-end">
                    <h2>{isRegistering ? 'Registro' : 'Iniciar Sesión'}</h2>
                    <p>{isRegistering ? 'Registrate y consigue un 10% de descuento' : 'Inicia sesión para poder comprar'}</p>
                    <h1 className='position-absolute bottom-0 text-opacity-100'>SneakVault</h1>
                </div>
                <div className="col-12 col-md-6 border border-2 border-black py-5">
                    {user ? (
                        <div className="container d-flex flex-column justify-content-center gap-3">
                            <h3>Bienvenido, {user.displayName || (user.email ? cutMail(user.email) : '') }</h3>
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
                                <div className="error"></div>
                                <button type='submit' className='button'>{isRegistering ? 'Registrar' : 'Iniciar Sesión'}</button>
                            </div>
                        </Form>
                    )}

                    <div className='container d-flex flex-row justify-content-center gap-2 mt-2'>
                    {!user && (
                        <button className='button w-50' onClick={logGoogleUser}>Iniciar Sesión con Google
                        <img src={ logogoogle } className='mx-3' width={20} alt="" />
                        </button>
                    )}
                    <button className='button w-50' onClick={() => setIsRegistering(!isRegistering)}>
                        {isRegistering ? 'Ya tienes una cuenta? Inicia Sesión' : 'No tienes una cuenta? Regístrate'}
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;