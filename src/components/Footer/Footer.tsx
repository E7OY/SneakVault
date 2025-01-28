import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap CSS
import '../../index.css'; // Importa el archivo CSS personalizado

const Footer = () => {
    return (
        <footer className="mx-auto m-0 border-2 mb-2 rounded borde-marron-oscuro p-3">
            <div className="container d-flex justify-content-center align-items-center">
                <p className="text-center text-black custom-text">© 2023 Tu Empresa. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;