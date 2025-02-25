import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import '../../index.css';
import './Header.css';
import { getAuth, signOut } from 'firebase/auth';
import UserContext from '../../context/userContext';
import { Cart } from '../../routes/Cart';
import carrito from '../../assets/carrito.png';

const Header = () => {
    const userContext = useContext(UserContext);
    const user = userContext ? userContext.user : null;
    const setUser = userContext ? userContext.setUser : () => { };
    const errorMessage = document.querySelectorAll('.error-message');
    const [isCartOpen, setIsCartOpen] = useState(false);

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

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
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
            <div className="bg-black text-white w-100 text-center py-4 moving-container">
                <span className="moving-text">
                    <h6 className='fw-light'>Últimas Rebajas de invierno hasta -60%</h6>
                    <h6 className='fw-light'>Off-White -45% en productos seleccionados</h6>
                    <h6 className='fw-light'>Envíos Gratis a partir de 50€</h6>
                    <h6 className='fw-light'>Jordan x Cactus jack disponibles</h6>
                </span>
            </div>

        <header>
            <Navbar expand="lg" className="bg-white py-3 px-5 border-bottom border-dark">
                <Container fluid>
                    <NavLink className="navbar-brand me-0" to="/home">
                        <h2 className="mb-0 fw-light">SneakVault</h2>
                    </NavLink>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-dark" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mx-auto gap-3 py-3 py-lg-0">
                            <Nav.Link as={NavLink} to="/home" className="fw-light">
                                HOME
                            </Nav.Link>

                            <NavDropdown title="ZAPATILLAS" id="shoes-dropdown" className="fw-light">
                                <NavDropdown.Item as={NavLink} to="/zapatillas/nike" className="fw-light">Nike</NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="/zapatillas/yeezy" className="fw-light">Yeezy</NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="/zapatillas/jordan" className="fw-light">Jordan</NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="/zapatillas/adidas" className="fw-light">Adidas</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={NavLink} to="/zapatillas" className="fw-light">Ver todas</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="CAMISETAS" id="shirts-dropdown" className="fw-ligh">
                                <NavDropdown.Item as={NavLink} to="/camisetas/off-white" className="fw-light">Off-white</NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="/camisetas/supreme" className="fw-light">Supreme</NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="/camisetas/nike" className="fw-light">Nike</NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="/camisetas/palace" className="fw-light">Palace</NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="/camisetas/stüssy" className="fw-light">Stüssy</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={NavLink} to="/camisetas" className="fw-light">Ver todas</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                        <div className="d-flex gap-2">
                            {user ? (
                                <>
                                    <button
                                        className="button fw-light rounded-0"
                                        onClick={handleSignOut}
                                    >
                                        Cerrar Sesión
                                    </button>
                                    <button onClick={toggleCart} className='bg-transparent border-2 px-3 border-dark '>
                                        <img src={carrito} width={25} alt="Carrito" />
                                    </button>
                                    {isCartOpen && <Cart toggleCart={toggleCart} />}
                                </>
                            ) : (
                                <NavLink
                                    to="/register"
                                    className="button fw-light"
                                >
                                    Iniciar Sesión
                                </NavLink>
                            )}
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            </header>
        </>
    );
};

export default Header;