import React, { useState, useContext } from 'react';
import { Form, Link, Navigate, useNavigate } from 'react-router-dom';
import UserContext from '../context/userContext';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithGooglePopup } from '../utils/firebase.utils';
import logogoogle from '../assets/logogoogle.webp';
import show from '../assets/show.webp';
import hide from '../assets/hide.webp';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    // user es el usuario actual, si no hay usuario es null
    const user = userContext ? userContext.user : null;
    const setUser = userContext ? userContext.setUser : () => { };
    const errorMessage = document.getElementsByClassName('error');
    const [showPassword, setShowPassword] = useState(false);



    //inicar sesion
    const login = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const auth = getAuth();
            const { user } = await signInWithEmailAndPassword(auth, email, password);
            setUser(user);
            navigate(-1);
        } catch {
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
        } catch {
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
                    <h3 className='fw-light mt-4'>INICIA SESIÓN CON TU CUENTA</h3>
                    <h6 className='my-3 fw-light'>Accede con tu usuario (e-mail) y contraseña</h6>
                    {user ? (
                        <Navigate to='/home' replace />
                    ) : (
                        <Form method='post' onSubmit={login}>
                            <div className="my-3 d-flex flex-column justify-content-center gap-4">
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
                                        <div className='d-flex flex-row align-items-center mt-5'>
                                            <hr className='w-50'/>
                                            <h6 className="mx-2 fw-light text-black-50">O continua con</h6>
                                            <hr className='w-50'/>
                                        </div>
                                    </div>
                                    </>
                                <div className="error"></div>
                                <button type='submit' className='button fw-light w-75 mx-auto'>Iniciar Sesión</button>
                            </div>
                        </Form>
                    )}

                    <div className='d-flex flex-column gap-2 justify-content-center align-items-center'>
                                    <div className="row mx-auto w-75">
                                        <div onClick={loginGoogle} className="col-12 button  d-flex flex-row justify-content-center align-items-center py-3 gap-4 px-3">
                                            <img src={logogoogle} className='fw-light' width={20} alt="logo google" /> <h6 className='p-0 m-0 fw-light'>Entrar con Google</h6> 
                                        </div>
                                    </div> 
                    </div>

                    <Link to="/register" className='text-decoration-none text-black-50 mt-3 fw-light'>
                        No tienes cuenta? <span className='text-decoration-underline'>Regístrate</span>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default Login;