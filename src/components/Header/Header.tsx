import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import carrito from '../../assets/carrito.png';
import './Header.css';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useContext, useEffect } from 'react';
import '../../index.css';
import './Header.css';
import React from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/userContext';

const Header = () => {
    const userContext = useContext(UserContext);
    const user = userContext ? userContext.user : null;

    function cutMail(email: string | string[]): string | string[] {
        if (typeof email === 'string') {
            for (let i = 0; i < email.length; i++) {
                if (email[i] === '@') {
                    return email.slice(0, i);
                }
            }
        }
        return email;
    }

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
        const interval = setInterval(showNextText, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="bg-black text-white w-100 text-center py-4 moving-container">
                <span className="moving-text">
                    <h6>Últimas Rebajas de invierno hasta -60%</h6>
                    <h6>Off-White -45% en productos seleccionados</h6>
                    <h6>Envíos Gratis a partir de 50€</h6>
                </span>
            </div>
            <header className="w-100 bg-white p-4 sticky-header">
                <nav className="navbar navbar-expand-lg d-flex justify-content-between w-100 mx-auto gap-5">
                    <a className="navbar-brand" href="#">
                        <h1 className='fw-bold negro'>
                            <NavLink className="nav-link negro" to="/home">SneakVault</NavLink>
                        </h1>
                    </a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto d-flex flex-row justify-content-center fw-bolder gap-3">
                            <li className="nav-item">
                                <NavLink className="nav-link negro fw-bold" to="/home">HOME</NavLink>
                            </li>

                            <Navbar.Toggle aria-controls="navbar-dark-example" />
                            <Navbar.Collapse id="navbar-dark-example">
                                <Nav>
                                    <NavDropdown
                                        id="nav-dropdown"
                                        title="ZAPATILLAS"
                                        menuVariant="light"
                                        className='text-black'
                                    >
                                        <NavDropdown.Item href="/home">Nike</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">Jordan</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">Yeezy</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.4">
                                            Ver todas
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>


                            <Navbar.Toggle aria-controls="navbar-dark-example" className='menu-desplegable' />
                            <Navbar.Collapse id="navbar-dark-example">
                                <Nav>
                                    <NavDropdown
                                        id="nav-dropdown"
                                        title="ROPA"
                                        menuVariant="light"
                                        className='text-black'
                                    >
                                        <NavDropdown.Item href="/home">Nike</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">Supreme</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">Palace</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">Stussy</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">Off-White</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.4">
                                            Ver todo
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>

                        </ul>
                    </div>
                    <form className="w-50">
                        <input
                            className="form-control rounded-0 border-2 py-2 w-50 border-black"
                            type="search"
                            placeholder="Buscar..."
                            aria-label="Search"
                        />
                    </form>

                    {user ? (
                        <>
                        <NavLink to="/register" className='nav-link fw-bold button'>
                        <span>{user.displayName || (user.email ? cutMail(user.email) : '') }</span>
                            </NavLink>
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
                    { /*si el usuario existe, se muestra o nombre de usuario o email, sino "Log In" */ }
                    

                </nav>
            </header>
        </>
    );
};

export default Header;