import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap CSS
import '../../index.css'; // Importa el archivo CSS personalizado

const Footer = () => {
    return (
        <footer className=" w-100 d-flex justify-content-center align-items-center bg-white">
                <p className="text-center text-black custom-text">© 2025 SneakVault. Todos los derechos reservados.</p>
        </footer>
    );
};

export default Footer;