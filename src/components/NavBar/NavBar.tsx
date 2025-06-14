import { signOut, getAuth } from "firebase/auth";
import { useState, useEffect, useContext } from "react";
import { Container, Nav, Navbar, NavLink, Form, FormControl } from "react-bootstrap";
import { useNavigate, useLocation, Link } from "react-router-dom";
import UserContext from "../../context/userContext";
import '../../index.css';
import carrito from '../../assets/carrito.webp';
import { onValue, ref } from "firebase/database";
import { db } from "../../utils/firebase.utils";
import CategoryMenu from "../CategoryMenu";
import CartContext from "../../context/cartContext";

interface Category {
    name: string;
    brands: string[];
}

const NavBar = () => {
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const cartContext = useContext(CartContext);
    const cart = cartContext?.cart;
    const clearCart = cartContext?.clearCart;
    // creamos un estado para guardar las categorias que obtendremos de la base de datos
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        //obtener categorias de la base de datos de forma dinamica
        const fetchCategories = async () => {
            try {
                const productosRef = ref(db, 'productos');
                onValue(productosRef, (snapshot) => {
                    const productosData = snapshot.val();
                    if (productosData) {
                        //mapeamos el objeto de categorias a un array de categorias con sus respectivas marcas para poder mostrarlo en el navbar
                        const categoriesArray: Category[] = Object.entries(productosData).map(([categoryName, categoryData]) => {
                            const brands = Object.keys(categoryData as object);
                            return {
                                name: categoryName,
                                brands: brands,
                            };
                        });
                        setCategories(categoriesArray);
                    }
                });
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

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
            if (clearCart) {
                clearCart();
            }
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
        <Navbar expand="lg" className="py-3 border-bottom border-dark sticky-top bg-white">
            <Container fluid className="px-md-5">
                <Link to="/home" className="navbar-brand">
                    <span className="h2 fw-bold text-uppercase" style={{ letterSpacing: '2px' }}>
                        <span className="negro">SNEAKVAULT</span>
                    </span>
                </Link>
                
                <Navbar.Toggle aria-controls="main-navbar" className="border-0">
                    <span className="navbar-toggler-icon"></span>
                </Navbar.Toggle>
                
                <Navbar.Collapse id="main-navbar">
                    <Nav className="mx-auto d-flex align-items-center">
                        <Nav.Link as={NavLink} to="/home" 
                            className="mx-2 text-uppercase letter-spacing-1" 
                            onClick={() => handleNavLinkClick('/home')}>
                            Home
                        </Nav.Link>
                        
                        <CategoryMenu categories={categories} handleNavLinkClick={handleNavLinkClick} />
                        
                        {user?.email === 'admin@gmail.com' && (
                            <Nav.Link as={Link} to="/admin" 
                                className="fw-bold mx-2 text-uppercase text-danger">
                                Admin
                            </Nav.Link>
                        )}
                    </Nav>
                    
                    <div className="d-flex align-items-center gap-3">
                        <Form onSubmit={handleSearchSubmit} className="d-flex position-relative rounded-0">
                            <FormControl
                                type="search"
                                placeholder="BUSCAR"
                                className="border border-dark py-2 ps-3 pe-4 rounded-0"
                                style={{ width: '200px' }}
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <button type="submit" className="btn position-absolute end-0 top-50 translate-middle-y border-0">
                                <i className="bi bi-search"></i>
                            </button>
                        </Form>
                        
                        {user ? (
                            <button 
                                className="button border border-dark px-4 py-2 text-uppercase"
                                onClick={handleSignOut}>
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="button border border-dark px-4 py-2 text-uppercase"
                                onClick={() => handleNavLinkClick('/login')}>
                                Login
                            </Link>
                        )}
                        
                        {user && (
                            <Link to="/cart" className="position-relative ms-2">
                                <button 
                                    onClick={toggleCart} 
                                    className="btn rounded-0 bg-negro border-dark p-2">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>                                </button>
                                {cart && cart.length > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge bg-danger border border-white" style={{borderRadius: '0'}}>
                                        {cart.length}
                                    </span>
                                )}
                            </Link>
                        )}
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;