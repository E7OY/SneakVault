import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap CSS
import carrito from '../../assets/carrito.png';
import './Header.css';

const Header = () => {

    return (
        <>
            <header className="w-100 bg-white py-4">
                <nav className="navbar navbar-expand-lg d-flex justify-content-between w-100 mx-auto gap-5">
                    <a className="navbar-brand" href="#">
                        <h1 className='fw-bold negro'>
                            <NavLink  className="nav-link negro" to="/home">SneakVault</NavLink>
                            </h1>
                    </a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto d-flex flex-row justify-content-center fw-semibold gap-3">
                            <li className="nav-item">
                                <NavLink className="nav-link negro" to="/home">HOME</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link negro" to="/products">PRODUCTOS</NavLink>
                            </li>
                            <li className="nav-item custom-text">
                                <NavLink className="nav-link negro" to="/register">REGISTRO</NavLink>
                            </li>
                        </ul>
                    </div>
                    <form className="">
                        <input
                            className="form-control rounded-0 border-2 py-2 w-100 border-black"
                            type="search"
                            placeholder="Buscar..."
                            aria-label="Search"
                        />
                    </form>
                    <NavLink className="fw-bolder button" to="/register">LOG IN</NavLink>
                    <NavLink className="btn fw-semibold rounded-5 px-4 py-2 bg-white" to="/"><img src={carrito} width={25} alt="Logo" /></NavLink>
                </nav>
            </header>
        </>
    );
};

export default Header;