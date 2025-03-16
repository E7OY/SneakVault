import { useContext, useState } from "react";
import show from '../assets/show.webp';
import hide from '../assets/hide.webp';
import { Form, Navigate, useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const [errors, setErrors] = useState<string[]>([]);
    // user es el usuario actual, si no hay usuario es null
    const user = userContext ? userContext.user : null;
    const setUser = userContext ? userContext.setUser : () => { };

    //mostrar contraseña
    const showPassWord = () => {
        setShowPassword(!showPassword);
    };

    //registro
    //funcion asincrona con evento de formulario
    const register = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();  //para evitar el comportamiento default del evento, del form, (enviarlo y recargar pag)

        if (!formValidation()) {
            return;
        }

        try {
            const auth = getAuth();
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(user);  //email de verificacion
            setUser(user);
            navigate('/home');
        } catch (e) {
            setErrors(["Error en el registro. Por favor, inténtalo de nuevo." + e]);
        }
    };

    //validaciones formulario
    const formValidation = (): boolean => {
        const newErrors: string[] = [];

        if (!username.trim()) {
            newErrors.push("Escribe un nombre de usuario");
        }
        if (password.length < 6) {
            newErrors.push("La contraseña debe contener al menos 6 caracteres.");
        }
        if (!name.trim()) {
            newErrors.push("Escribe un nombre.");
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            newErrors.push("El email escrito no es válido.");
        }
        const birthDate = new Date(date);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 18) {
            newErrors.push("Debes ser mayor de edad para registrarte!");
        }

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    return (
        <>
            <div className="register my-5 p-5">
                <div className="row mx-auto">
                    <div className="mx-auto col-12 col-md-6 border border-1 border-black py-5 d-flex text-center flex-column justify-content-center">
                        <h3 className='fw-light mt-4'>CREAR UNA CUENTA</h3>
                        <h6 className='my-3 fw-light'>Regístrate y consigue un 10% de descuento</h6>
                        {user ? (
                            <Navigate to='/home' replace />
                        ) : (
                            <Form method='post' onSubmit={register}>

                                {errors.length > 0 && (
                                    <div className="error my-3">
                                        {errors.map((error, index) => (
                                            <p key={index} className="text-danger">{error}</p>
                                        ))}
                                    </div>
                                )}

                                <div className='form-field my-4 w-75 d-flex gap-0 mx-auto'>
                                    <label htmlFor='email' id='email'><h6 className='fw-light text-black-50'>Email *</h6></label>
                                    <input
                                        type='text'
                                        className='p-1 fw-light'
                                        name='email'
                                        id='email'
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className='form-field my-4 w-75 d-flex gap-0 mx-auto'>
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
                                            <img width={20} src={showPassword ? hide : show} alt='hide / show password' />
                                        </button>
                                    </div>
                                </div>

                                <div className='form-field my-4 w-75 d-flex gap-0 mx-auto'>
                                    <label htmlFor='username' id='username'><h6 className='fw-light text-black-50'>Nombre de Usuario *</h6></label>
                                    <input
                                        type='text'
                                        className='p-1 fw-light'
                                        name='username'
                                        id='username'
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>

                                <div className='form-field my-4 w-75 d-flex gap-0 mx-auto'>
                                    <label htmlFor='name' id='name'><h6 className='fw-light text-black-50'>Nombre y apellidos *</h6></label>
                                    <input
                                        type='text'
                                        className='p-1 fw-light'
                                        name='name'
                                        id='name'
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className='form-field  w-75 d-flex gap-0 mx-auto'>
                                    <label htmlFor='date' id='date'><h6 className='fw-light text-black-50'>Fecha de Nacimiento *</h6></label>
                                    <input
                                        type='date'
                                        className='p-1 fw-light'
                                        name='date'
                                        id='date'
                                        required
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </div>

                                <div className='form-field w-75 my-4 d-flex justify-content-start align-items-start flex-row gap-1 mx-auto'>
                                    <input type='checkbox' name='terms' id='terms' required />
                                    <label htmlFor='terms'><h6 className='text-black-50 mx-1 fw-light'>Acepto los términos y condiciones.</h6></label>
                                </div>

                                <button type='submit' className='button fw-light w-75 mx-auto'>Registrarse</button>

                                <div className="col-12 d-flex flex-row w-auto mx-auto justify-content-center align-items-center py-2 mt-3 px-2">
                                    <a className='text-black-50 fw-light text-decoration-none' onClick={() => navigate("/login")}>
                                        ¿Ya tienes cuenta? <span className="text-decoration-underline">Inicia Sesión</span>
                                    </a>
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