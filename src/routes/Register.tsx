import { ActionFunction, Form } from 'react-router-dom';
import '../index.css'

const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get('name');
    const password = formData.get('password');
    const password2 = formData.get('password2');

    if (password !== password2) {
        console.error('Passwords do not match');
    } else {
        console.log({ name, password, password2 });
    }

    return { status: 200 };
};

const Register = () => (
    <>

        <div className="register row container mx-auto m-0 mt-5 mb-5">
            <div className="col-6 bg-black text-white p-5 position-relative">
                <h2>Registro</h2>
                <p>Registrate y consigue un 10% de descuento</p>
                <h1 className='position-absolute bottom-0 text-opacity-100'>SneakVault</h1>
            </div>
            <div className="col-6 border border-2 border-black p-5">
                <Form method='post'>
                <div className="container d-flex flex-column justify-content-center gap-4">
                <div className='form-field'>
                        <label htmlFor='email' id='email'>Email</label>
                        <input type='text' name='email' id='email' required />
                    </div>
                    <div className='form-field'>
                        <label htmlFor='name' id='name'>Nombre</label>
                        <input type='text' name='name' id='name' required />
                    </div>
                    <div className='form-field'>
                        <label htmlFor='password' id='password'>Contraseña</label>
                        <input type='password' name='password' id='password' required />
                    </div>
                    <div className='form-field'>
                        <label htmlFor='password2' id='password2'>Confirma Contraseña</label>
                        <input type='password' name='password2' id='password2' required />
                    </div>
                    <div className='form-field'>
                        <input type='checkbox' name='terms' id='terms' required />
                        <label htmlFor='terms' id='terms'>Acepto los términos y condiciones.</label>
                    </div>
                    <button id='register' className='button' type='submit'>
                        Registrarse
                    </button>
                </div>
                </Form>
            </div>
        </div>
    </>
);

Register.action = action;

export default Register;