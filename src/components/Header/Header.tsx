import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap CSS
import logo from '../../assets/logonofondo.png';
import './Header.css';

const Header = () => {

    return (
        <>
        <header className="mx-auto m-0  mt-2 border-2 rounded borde-marron-oscuro p-3">
        <div className="container ">
                <nav className="navbar navbar-expand-lg d-flex justify-around gap-5">
                <a className="navbar-brand" href="#">
                    <img src={logo} width={300} alt="Logo" />
                </a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto d-flex flex-row justify-content-center gap-3">
                        <li className="nav-item">
                            <NavLink className="nav-link texto-marron-oscuro" to="/home">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link texto-marron-oscuro" to="/users">Users</NavLink>
                        </li>
                        <li className="nav-item custom-text">
                            <NavLink className="nav-link texto-marron-oscuro" to="/register">Register</NavLink>
                        </li>
                    </ul>
                    </div>
                    <form className="">
                        <input
                            className="form-control borde-marron-oscuro"
                            type="search"
                            placeholder="Buscar"
                            aria-label="Search"
                            />
                    </form>
                    <NavLink className="btn fw-semibold rounded-5 px-4 py-2 button-hover-marron-oscuro" to="/register">Register</NavLink>
                            </nav>
                            </div>
                </header>
            </>
    );
};

export default Header;