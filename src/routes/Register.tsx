import React, { useState, useContext } from 'react';
import { Form, Navigate } from 'react-router-dom';
import UserContext from '../context/userContext';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithGooglePopup } from '../utils/firebase.utils';
import logogoogle from '../assets/logogoogle.png';
import logoapple from '../assets/logoapple.png';

const Register = () => {
    const [isRegistering, setIsRegistering] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const userContext = useContext(UserContext);
    const user = userContext ? userContext.user : null;
    const setUser = userContext ? userContext.setUser : () => {};
    const errorMessage = document.getElementsByClassName('error');

    /*cerrar sesion
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
    */

    //registro
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

    //inicar sesion
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

    //inicio de sesion con google
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
                <div className="col-12 col-md-6 border border-2 border-black py-5 d-flex flex-column justify-content-center">
                    {user ? (
                        <Navigate to="/home"/>
                    ) : (
                        <Form method='post' onSubmit={isRegistering ? handleRegister : handleSignIn}>
                            <div className="container d-flex flex-column justify-content-center gap-4">
                                {isRegistering && (
                                    <div className='form-field w-50 d-flex gap-0'>
                                        <label htmlFor='username' id='username'>Nombre de Usuario *</label>
                                        <input type='text' name='username' id='username' required value={username} onChange={(e) => setUsername(e.target.value)} />
                                    </div>
                                )}
                                <div className='form-field w-50 d-flex gap-0'>
                                    <label htmlFor='email' id='email'>Email *</label>
                                    <input type='text' name='email' id='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className='form-field w-50 d-flex gap-0'>
                                    <label htmlFor='password' id='password'>Contraseña *</label>
                                    <input type='password' name='password' id='password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                {isRegistering && (
                                <>
                                <div className='form-field w-50 d-flex gap-0'>
                                    <label htmlFor='name' id='name'>Nombre y apellidos *</label>
                                    <input type='text' name='name' id='name' required value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className='form-field w-50 d-flex gap-0'>
                                    <label htmlFor='date' id='date'>Fecha de Nacimiento *</label>
                                    <input type='date' name='date' id='date' required value={date} onChange={(e) => setDate(e.target.value)} />
                                </div>
                                </>
                                )}
                                <div className="error"></div>
                                <button type='submit' className='button'>{isRegistering ? 'Registrar' : 'Iniciar Sesión'}</button>
                            </div>
                        </Form>
                    )}

                    <div className='container row  d-flex justify-content-between mx-auto mt-1'>
                    {!user && (
                        <>
                        <div onClick={logGoogleUser} className="col-4 button-google d-flex flex-row gap-2 w-auto justify-content-center align-items-center py-2 px-4">
                            <img  src={ logogoogle } className=' ' width={20} alt="" /> Sign in with Google
                        </div>
                        <div onClick={logGoogleUser}  className="col-4 button-apple d-flex flex-row gap-2 w-auto justify-content-center align-items-center py-2 px-4">
                            <img  src={ logoapple } className='' width={20} alt="" /> Sign in with Apple
                        </div>
                        <div className="col-4 button-google d-flex flex-row gap-2 w-auto justify-content-center align-items-center py-2 px-4">
                            <button className='button-google' onClick={() => setIsRegistering(!isRegistering)}>
                                {isRegistering ? 'Ya tienes una cuenta? Inicia Sesión' : 'No tienes una cuenta? Regístrate'}
                            </button>
                        </div>
                        </>
                    )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Register;
