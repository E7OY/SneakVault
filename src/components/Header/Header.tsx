import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import carrito from '../../assets/carrito.png';
import './Header.css';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import '../../index.css';
import './Header.css';

import { getAuth, signOut } from 'firebase/auth';
import UserContext from '../../context/UserContext';

const Header = () => {
    const userContext = useContext(UserContext);
    const user = userContext ? userContext.user : null;

    const setUser = userContext ? userContext.setUser : () => {};
    const errorMessage = document.querySelectorAll('.error-message');

    const handleSignOut = async () => {
        try {
            await signOut(getAuth());
            setUser(null);
        } catch (error) {
            Array.from(errorMessage).forEach((element) => {
                element.textContent = 'Error al cerrar sesión: ' + error;
            });
        }
    };
    

    useEffect(() => {
        const texts = document.querySelectorAll('.moving-text h6');
        let index = 0;

        const showNextText = () => {
            texts.forEach((text, i) => {
                text.classList.remove('active');
                if (i === index) {
                    text.classList.add('active');
                }
            });
            index = (index + 1) % texts.length;
        };

        showNextText();
        const interval = setInterval(showNextText, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="bg-black text-white w-100 text-center py-3 moving-container">
                <span className="moving-text">
                    <h6>Últimas Rebajas de invierno hasta -60%</h6>
                    <h6>Off-White -45% en productos seleccionados</h6>
                    <h6>Envíos Gratis a partir de 50€</h6>
                </span>
            </div>
            <header className="w-100 bg-white p-4 border-bottom border-2 border-black">
                <nav className="navbar navbar-expand-lg d-flex justify-content-between w-100 gap-5">
                    <a className="navbar-brand" href="#">
                        <h1 className='fw-bold negro'>
                            <NavLink className="nav-link negro" to="/home">SneakVault</NavLink>
                        </h1>
                    </a>
                    <Navbar expand="lg">
                        <Navbar.Collapse id="navbar-footer">
                            <Nav className="d-flex flex-row fw-bolder m-0 p-0">
                                <Nav.Link as={NavLink} to="/home" className="negro fw-bold">HOME</Nav.Link>
                                <NavDropdown title="ZAPATILLAS" id="nav-dropdown" menuVariant="light" className='text-black'>
                                    <NavDropdown.Item as={NavLink} to="/home">Nike</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Jordan</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Yeezy</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Ver todas</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="ROPA" id="nav-dropdown" menuVariant="light" className='text-black'>
                                    <NavDropdown.Item as={NavLink} to="/home">Nike</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Supreme</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Palace</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Stussy</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Off-White</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Ver todo</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>

                    <form className="w-50 d-flex justify-content-center">
                        <input
                            className="form-control rounded-0 border-1 w-75 border-black"
                            type="search"
                            placeholder="Buscar..."
                            aria-label="Search"
                        />
                    </form>

                    {user ? (
                        <>
                        <button className='button' onClick={handleSignOut}>Cerrar Sesión</button>
                        <NavLink className="btn rounded-0 fw-semibold px-4 py-2 bg-white" to="/">
                            <img src={carrito} width={25} alt="Logo" />
                        </NavLink>
                        </>
                    ) : (
                        <>
                        <NavLink to="/register" className='nav-link fw-bold button'>
                            Log In
                        </NavLink>
                    </>
                    )}
                    { /*si el usuario existe, se muestra o nombre de usuario o email y carrito, sino "Log In" */ }
                    

                </nav>
            </header>
        </>
    );
};

export default Header;