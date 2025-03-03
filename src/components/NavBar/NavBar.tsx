import { signOut, getAuth } from "firebase/auth";
import { useState, useEffect, useContext } from "react";
import { Nav, Navbar, NavDropdown, NavLink } from "react-bootstrap";
import { useNavigate, useLocation, Link } from "react-router-dom";
import UserContext from "../../context/userContext";
import '../../index.css';
import carrito from '../../assets/carrito.webp';

const NavBar = () => {
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('query');
        if (query) {
            setSearchInput(query);
        }
    }, [location.search]);

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate(`/search?query=${encodeURIComponent(searchInput)}`);
    };

    const handleNavLinkClick = (path: string) => {
        navigate(path);
        setSearchInput('');
    };

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
    
    return(
        <Navbar expand="lg" className="bg-white py-3 px-5 border-bottom border-dark">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-dark" />

                    <Navbar.Collapse id="basic-navbar-nav" className='d-flex flex-row align-items-center justify-content-between'>
                        <div className="col-4 w-auto">
                            <Nav className="d-flex align-items-center gap-3 w-auto">
                                <Link className="navbar-brand" to="/home" onClick={() => handleNavLinkClick('/home')}>
                                    <h1 className="mb-0 fw-light">SneakVault</h1>
                                </Link>
                                <Nav.Link as={NavLink} to="/home" className="fw-light" onClick={() => handleNavLinkClick('/home')}>
                                    HOME
                                </Nav.Link>

                                <NavDropdown title="ZAPATILLAS" id="shoes-dropdown" className="fw-light">
                                    <NavDropdown.Item as={NavLink} to="/zapatillas/nike" className="fw-light" onClick={() => handleNavLinkClick('/zapatillas/nike')}>Nike</NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to="/zapatillas/yeezy" className="fw-light" onClick={() => handleNavLinkClick('/zapatillas/yeezy')}>Yeezy</NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to="/zapatillas/jordan" className="fw-light" onClick={() => handleNavLinkClick('/zapatillas/jordan')}>Jordan</NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to="/zapatillas/adidas" className="fw-light" onClick={() => handleNavLinkClick('/zapatillas/adidas')}>Adidas</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={NavLink} to="/zapatillas" className="fw-light" onClick={() => handleNavLinkClick('/zapatillas')}>Ver todas</NavDropdown.Item>
                                </NavDropdown>

                                <NavDropdown title="CAMISETAS" id="shirts-dropdown" className="fw-light">
                                    <NavDropdown.Item as={NavLink} to="/camisetas/off-white" className="fw-light" onClick={() => handleNavLinkClick('/camisetas/off-white')}>Off-white</NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to="/camisetas/supreme" className="fw-light" onClick={() => handleNavLinkClick('/camisetas/supreme')}>Supreme</NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to="/camisetas/nike" className="fw-light" onClick={() => handleNavLinkClick('/camisetas/nike')}>Nike</NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to="/camisetas/palace" className="fw-light" onClick={() => handleNavLinkClick('/camisetas/palace')}>Palace</NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to="/camisetas/stüssy" className="fw-light" onClick={() => handleNavLinkClick('/camisetas/stüssy')}>Stüssy</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={NavLink} to="/camisetas" className="fw-light" onClick={() => handleNavLinkClick('/camisetas')}>Ver todas</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </div>

                        <div className="col-4 w-auto">
                            <form onSubmit={handleSearchSubmit}>
                                <input
                                    className="searchInput rounded-0 p-2 border-1 fw-light text-black-50 border-black"
                                    type="search"
                                    placeholder="Buscar"
                                    aria-label="Search"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                />
                            </form>
                        </div>

                        <div className="col-4 d-flex gap-2 w-auto">
                            {user ? (
                                <>
                                    <button
                                        className="button fw-light rounded-0"
                                        onClick={handleSignOut}
                                    >
                                        Cerrar Sesión
                                    </button>
                                    <Link to="/cart">
                                        <button onClick={toggleCart} className='bg-transparent border-1 p-3 border-dark '>
                                            <img src={carrito} width={35} alt="imagen carrito" />
                                        </button>
                                    </Link>
                                </>
                            ) : (
                                <Link
                                    to="/register"
                                    className="button fw-light"
                                    onClick={() => handleNavLinkClick('/register')}
                                >
                                    Iniciar Sesión
                                </Link>
                            )}
                        </div>
                    </Navbar.Collapse>
                </Navbar>
    );

}

export default NavBar; 