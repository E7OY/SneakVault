import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap CSS
import '../../index.css'; // Importa el archivo CSS personalizado
import { NavLink } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

const Footer = () => {
    return (
        <footer className="bg-white w-100 mt-5 border-top border-2 border-dark">

            <div className="row w-75 mx-auto d-flex align-items-center flex-row justify-content-between pt-5">

                <div className="col-3 w-auto">
                    <h5 className="fw-bold">Informacion</h5>
                    <p className="text-black">+34-000-000-000</p>
                    <p className="text-black">C/Liceo La Paz</p>
                </div>

                <div className="col-3 w-auto">
                    <h5 className="fw-bold">Enlaces</h5>
                    <Navbar expand="lg">
                        <Navbar.Collapse id="navbar-footer">
                            <Nav className="d-flex flex-column fw-medium m-0 p-0">
                                <Nav.Link as={NavLink} to="/home" className="negro fw-regular">HOME</Nav.Link>
                                <NavDropdown title="ZAPATILLAS" id="nav-dropdown" menuVariant="light" drop="end" className='text-black'>
                                    <NavDropdown.Item as={NavLink} to="/zapatillas/nike">Nike</NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to="/zapatillas/yeezy">Yeezy</NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to="/zapatillas/jordan">Jordan</NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to="/zapatillas/adidas">Adidas</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={NavLink} to="/zapatillas">Ver todas</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="CAMISETAS" id="nav-dropdown" menuVariant="light" drop="end" className='text-black'>
                                    <NavDropdown.Item as={NavLink} to="/camisetas/off-white">Off-white</NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to="/camisetas/supreme">Supreme</NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to="/camisetas/nike">Nike</NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to="/camisetas/palace">Palace</NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to="/camisetas/stüssy">Stüssy</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={NavLink} to="/camisetas">Ver todas</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>

                

                <div className="col-3 w-auto">
                    <iframe style={{ filter: 'grayscale(100%)' }} className="border border-2 border-black" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.015043169616!2d-8.405034523376406!3d43.34134147254437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2e7d4a34bbee7d%3A0xfdbb82aae0a76987!2sLiceo%20La%20Paz!5e1!3m2!1ses!2ses!4v1738693589568!5m2!1ses!2ses" width="200" height="200" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>

            </div>

            <div className="mt-5">
                <p className="texto-footer">SNEAKVAULT</p>
            </div>
        </footer>
    );
};

export default Footer;