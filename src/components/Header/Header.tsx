import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import carrito from '../../assets/carrito.png';
import './Header.css';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useEffect } from 'react';

const Header = () => {
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
            <header className="w-100 bg-white py-4 sticky-header">
                <nav className="navbar navbar-expand-lg d-flex justify-content-between w-100 mx-auto gap-5">
                    <a className="navbar-brand" href="#">
                        <h1 className='fw-bold negro'>
                            <NavLink className="nav-link negro" to="/home">SneakVault</NavLink>
                        </h1>
                    </a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto d-flex flex-row justify-content-center fw-semibold gap-3">
                            <li className="nav-item">
                                <NavLink className="nav-link negro fw-bold" to="/home">HOME</NavLink>
                            </li>

                            <Navbar.Toggle aria-controls="navbar-dark-example" />
                            <Navbar.Collapse id="navbar-dark-example">
                                <Nav>
                                    <NavDropdown
                                        id="nav-dropdown"
                                        title="PRODUCTOS"
                                        menuVariant="light"
                                        className='text-black'
                                    >
                                        <NavDropdown.Item href="/home">Zapatillas</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">Ropa</NavDropdown.Item>
                                        {/*     <NavDropdown.Divider />
           <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>


                            <li className="nav-item custom-text">
                                <NavLink className="nav-link negro fw-bold" to="/register">REGISTRO</NavLink>
                            </li>
                        </ul>
                    </div>
                    <form className="w-50">
                        <input
                            className="form-control rounded-0 border-2 py-2 w-100 border-black"
                            type="search"
                            placeholder="Buscar..."
                            aria-label="Search"
                        />
                    </form>
                    <NavLink className="fw-bolder button" to="/register">LOG IN</NavLink>
                    <NavLink className="btn rounded-0 fw-semibold px-4 py-2 bg-white" to="/"><img src={carrito} width={25} alt="Logo" /></NavLink>
                </nav>
            </header>
        </>
    );
};

export default Header;