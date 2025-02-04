import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap CSS
import '../../index.css'; // Importa el archivo CSS personalizado
import { NavLink } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

const Footer = () => {
    return (
        <footer className="bg-white w-100 mt-5 border border-2 border-dark">

            <div className="row w-100 mb-5 d-flex align-items-center flex-row justify-content-evenly">

                <div className="col-3 w-auto">
                    <h5 className="fw-bold">Informacion</h5>
                    <p className="text-black">+34-000-000-000</p>
                    <p className="text-black">C/Liceo La Paz</p>
                </div>

                <div className="col-3 w-auto">
                    <h5 className="fw-bold">Enlaces</h5>
                    <Navbar expand="lg">
                        <Navbar.Collapse id="navbar-footer">
                            <Nav className="d-flex flex-column fw-bolder m-0 p-0">
                                <Nav.Link as={NavLink} to="/home" className="negro fw-bold">HOME</Nav.Link>
                                <NavDropdown title="ZAPATILLAS" id="nav-dropdown" drop="end" menuVariant="light" className='text-black'>
                                    <NavDropdown.Item as={NavLink} to="/home">Nike</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Jordan</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Yeezy</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Ver todas</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="ROPA" id="nav-dropdown" drop="end" menuVariant="light" className='text-black'>
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
                </div>

                <div className="col-3 w-auto">
                    <h5 className="fw-bold">Enlaces</h5>
                    <Navbar expand="lg">
                        <Navbar.Collapse id="navbar-footer">
                            <Nav className="d-flex flex-column fw-bolder m-0 p-0">
                                <Nav.Link as={NavLink} to="/home" className="negro fw-bold">HOME</Nav.Link>
                                <NavDropdown title="ZAPATILLAS" id="nav-dropdown" drop="end" menuVariant="light" className='text-black'>
                                    <NavDropdown.Item as={NavLink} to="/home">Nike</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Jordan</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Yeezy</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Ver todas</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="ROPA" id="nav-dropdown" drop="end" menuVariant="light" className='text-black'>
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
                </div>

                <div className="col-3 w-auto">
                    <iframe style={{ filter: 'grayscale(100%)' }} className="border border-2 border-black" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.015043169616!2d-8.405034523376406!3d43.34134147254437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2e7d4a34bbee7d%3A0xfdbb82aae0a76987!2sLiceo%20La%20Paz!5e1!3m2!1ses!2ses!4v1738693589568!5m2!1ses!2ses" width="200" height="200" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>

            </div>

            <div className="row text-black w-100 p-2 mt-5">
                <p className="text-center fw-bold custom-text">© 2025 SneakVault. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;