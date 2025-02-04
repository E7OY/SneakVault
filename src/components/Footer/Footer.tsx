import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap CSS
import '../../index.css'; // Importa el archivo CSS personalizado

const Footer = () => {
    return (
        <footer className=" w-100 d-flex flex-column justify-content-center align-items-center bg-white">
            <div className="row container">
                <div className="col-6">
                    <p className="text-center text-black custom-text">+34-000-000-000</p>
                </div>
                <div className="col-6">
                    <p className="text-center text-black custom-text">C/Liceo La Paz</p>
                </div>
            </div>
            <div className="row bg-black text-white w-100 p-2 m-0 p-0">
                    <p className="text-center custom-text">© 2025 SneakVault. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;