import React from 'react';
import { Form } from 'react-router-dom';
import '../index.css'; // Importa el archivo CSS

import logogoogle from '../assets/logogoogle.png';

import { signInWithGooglePopup } from "../utils/firebase.utils.tsx";

//funcion para loguear con google
const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
};

const Register = () => (
    <>
        <div className="register container mx-auto mt-5 mb-5">
            <div className="row">
                <div className="col-12 col-md-6 bg-black text-white p-5 position-relative text-end">
                    <h2>Registro</h2>
                    <p>Registrate y consigue un 10% de descuento</p>
                    <h1 className='position-absolute bottom-0 text-opacity-100'>SneakVault</h1>
                </div>
                <div className="col-12 col-md-6 border border-2 border-black py-5">
                    <Form method='post'>
                        <div className="container d-flex flex-column justify-content-center gap-3">
                            <div className='form-field w-50'>
                                <label htmlFor='email' id='email'>Email *</label>
                                <input type='text' name='email' id='email' required />
                            </div>
                            <div className='form-field w-50'>
                                <label htmlFor='name' id='name'>Nombre *</label>
                                <input type='text' name='name' id='name' required />
                            </div>
                            <div className='form-field w-50'>
                                <label htmlFor='telf' id='telf'>Telefono</label>
                                <input type='tel' name='telf' id='telf' />
                            </div>
                            <div className='form-field w-50'>
                                <label htmlFor='password' id='password'>Contraseña *</label>
                                <input type='password' name='password' id='password' required />
                            </div>
                            <div className='form-field w-50'>
                                <label htmlFor='password2' id='password2'>Repetir Contraseña *</label>
                                <input type='password' name='password2' id='password2' required />
                            </div>
                            <div className='row d-flex gap-2 container'>
                                    <button type='submit' className='button'>Registrarse</button>
                                    <button className='button-google' onClick={logGoogleUser}>
                                    <img src={logogoogle } className='mx-2' width={20} alt="" />
                                        Sign In With Google
                                    </button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </>
);


export default Register;