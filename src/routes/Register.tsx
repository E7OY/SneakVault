import React, { useState, useContext } from 'react';
import { Form, Navigate, useNavigate } from 'react-router-dom';
import UserContext from '../context/userContext';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithGooglePopup } from '../utils/firebase.utils';
import logogoogle from '../assets/logogoogle.webp';
import show from '../assets/show.webp';
import hide from '../assets/hide.webp';

const Register = () => {
    const [isSignUpMode, setIsSignUpMode] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const user = userContext ? userContext.user : null;
    const setUser = userContext ? userContext.setUser : () => { };
    const errorMessage = document.getElementsByClassName('error');
    const [showPassword, setShowPassword] = useState(false);

    //registro
    const register = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();  //para evitar el comportamiento default del evento, del form, (enviarlo y recargar pag)
        try {
            const auth = getAuth();
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            setUser(user);
            navigate(-1);
        } catch (error) {
            Array.from(errorMessage).forEach((element) => {
                element.textContent = 'Error en el registro.';
            });
        }
    };

    //inicar sesion
    const login = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const auth = getAuth();
            const { user } = await signInWithEmailAndPassword(auth, email, password);
            setUser(user);
            navigate(-1);
        } catch (error) {
            Array.from(errorMessage).forEach((element) => {
                element.textContent = 'Error al iniciar sesion: email y/o contraseña incorrectos.'; {/* + error */ }
            });
        }
    };

    //inicio de sesion con google
    const loginGoogle = async () => {
        try {
            const response = await signInWithGooglePopup();
            setUser(response.user);
            navigate(-1);
        } catch (error) {
            Array.from(errorMessage).forEach((element) => {
                element.textContent = 'Error al iniciar sesion con Google.';
            });
        }
    };

    //mostrar contraseña
    const showPassWord = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="register my-5 p-5">
            <div className="row mx-auto">
                <div className="mx-auto col-12 col-md-6 border border-1 border-black py-5 d-flex text-center flex-column justify-content-center">
                    <h3 className='fw-light mt-4'>{isSignUpMode ? 'INICIA SESIÓN CON TU CUENTA' : 'CREAR UNA CUENTA'}</h3>
                    <h6 className='my-3 fw-light'>{isSignUpMode ? 'Accede con tu usuario (e-mail) y contraseña' : 'Registrate y consigue un 10% de descuento'}</h6>
                    {user ? (
                        <Navigate to='/home' replace />
                    ) : (
                        <Form method='post' onSubmit={isSignUpMode ? login : register}>
                            <div className="my-3 d-flex flex-column justify-content-center gap-4">
                                {isSignUpMode ? (
                                    <>
                                        <div className='form-field w-75 d-flex gap-0 mx-auto'>
                                            <label htmlFor='email' id='email'><h6 className='fw-light text-black-50'>Dirección de correo electrónico *</h6></label>
                                            <input type='text' className='p-1 fw-light' name='email' id='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div className='form-field w-75 d-flex gap-0 mx-auto'>
                                        <label htmlFor='password' id='password'><h6 className='fw-light text-black-50'>Contraseña *</h6></label>
                                        <div>
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                className='p-1 w-75'
                                                name='password'
                                                id='password'
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <button type='button' className='w-25 button-password py-1' onClick={showPassWord}>
                                                <img width={20} src={showPassword ? hide : show} alt='hide / show password'/>
                                            </button>
                                        </div>
                                    </div>
                                    </>
                                )
                                    :
                                    <>
                                    
                                    <div className='form-field'>
                                        <label htmlFor='gender'><h6 className='fw-light text-black-50'>Género </h6></label>
                                        <div className='form-field w-75 d-flex justify-content-start flex-row gap-4 mx-auto'>
                                            <div>
                                                <input type='radio' name='gender' id='hombre' value='Hombre'/>
                                                <label htmlFor='hombre'><h6 className='text-black-50 mx-1 fw-lighter'>Hombre</h6></label>
                                            </div>
                                            <div>
                                                <input type='radio' name='gender' id='mujer' value='Mujer'/>
                                                <label htmlFor='mujer'><h6 className='text-black-50 mx-1 fw-lighter'>Mujer</h6></label>
                                            </div>
                                            <div>
                                                <input type='radio' name='gender' id='otro' value='Otro'/>
                                                <label htmlFor='otro'><h6 className='text-black-50 mx-1 fw-lighter'>Otro</h6></label>
                                            </div>
                                        </div>
                                        </div>

                                        <div className='form-field  w-75 d-flex gap-0 mx-auto'>
                                            <label htmlFor='email' id='email'><h6 className='fw-light text-black-50'>Email *</h6></label>
                                            <input type='text' className='p-1 fw-light'  name='email' id='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>

                                        <div className='form-field w-75 d-flex gap-0 mx-auto'>
                                        <label htmlFor='password' id='password'><h6 className='fw-light text-black-50'>Contraseña *</h6></label>
                                        <div>
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                className='p-1 w-75 fw-light'
                                                name='password'
                                                id='password'
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <button type='button' className='w-25 button-password py-1' onClick={showPassWord}>
                                                <img width={20} src={showPassword ? hide : show} alt='hide / show password'/>
                                            </button>
                                        </div>
                                    </div>

                                        <div className='form-field  w-75 d-flex gap-0 mx-auto'>
                                            <label htmlFor='username' id='username'><h6 className='fw-light text-black-50'>Nombre de Usuario *</h6></label>
                                            <input type='text' className='p-1 fw-light'  name='username' id='username' required value={username} onChange={(e) => setUsername(e.target.value)} />
                                        </div>
                                        <div className='form-field  w-75 d-flex gap-0 mx-auto'>
                                            <label htmlFor='name' id='name'><h6 className='fw-light text-black-50'>Nombre y apellidos *</h6></label>
                                            <input type='text' className='p-1 fw-light'  name='name' id='name' required value={name} onChange={(e) => setName(e.target.value)} />
                                        </div>
                                        <div className='form-field  w-75 d-flex gap-0 mx-auto'>
                                            <label htmlFor='date' id='date'><h6 className='fw-light text-black-50'>Fecha de Nacimiento *</h6></label>
                                            <input type='date' className='p-1 fw-light'  name='date' id='date' required value={date} onChange={(e) => setDate(e.target.value)} />
                                        </div>

                                        <div className='form-field w-75 d-flex justify-content-start align-items-start flex-row gap-1 mx-auto mt-3'>
                                                <input type='checkbox' name='terms' id='terms'/>
                                                <label htmlFor='terms'><h6 className='text-black-50 mx-1 fw-light'>Acepto los terminos y condiciones.</h6></label>
                                        </div>


                                    </>
                                }
                                <div className="error"></div>
                                <button type='submit' className='button fw-light w-75 mx-auto'>{isSignUpMode ? 'Iniciar Sesión' : 'Registrarse'}</button>
                            </div>
                        </Form>
                    )}

                    <div className='d-flex flex-column gap-2 justify-content-center align-items-center'>
                        {!user && (
                            <>
                                {isSignUpMode ?
                                    <div className="row mx-auto w-75">
                                        <div onClick={loginGoogle} className="col-12 button-google d-flex flex-row justify-content-center align-items-center py-3 gap-4 px-3">
                                            <img src={logogoogle} className='fw-light' width={20} alt="logo google" /> <h6 className='p-0 m-0 fw-light'>Entrar con Google</h6> 
                                        </div>
                                    </div> 
                                    :
                                    null
                                }
                                <div className="col-12 d-flex flex-row w-auto mx-auto justify-content-center align-items-center py-2 px-2">
                                    <a className='text-black-50 fw-light' onClick={() => setIsSignUpMode(!isSignUpMode)}>
                                        {isSignUpMode ? '¿No tienes cuenta? Cree una aquí' : 'Ya tienes cuenta? Inicia Sesión'}
                                    </a>
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