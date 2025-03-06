import { signOut, getAuth } from "firebase/auth";
import { useState, useEffect, useContext } from "react";
import { Nav, Navbar, NavDropdown, NavLink } from "react-bootstrap";
import { useNavigate, useLocation, Link } from "react-router-dom";
import UserContext from "../../context/userContext";
import '../../index.css';
import carrito from '../../assets/carrito.webp';
import { onValue, ref } from "firebase/database";
import { db } from "../../utils/firebase.utils";

interface Category {
    name: string;
    brands: string[];
}

const NavBar = () => {
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    // creamos un estado para guardar las categorias que obtendremos de la base de datos
    const[categories, setCategories] = useState<Category[]>([]);

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

                                {categories.map((category) => (
                                    <NavDropdown title={category.name.toUpperCase()} id={`${category.name}-dropdown`} key={category.name} className="fw-light">
                                        {category.brands.map((brand) => (
                                            <NavDropdown.Item
                                                as={NavLink}
                                                to={`/${category.name}/${brand}`}
                                                className="fw-light"
                                                onClick={() => handleNavLinkClick(`/${category.name}/${brand}`)}
                                                //key es necesario para que react pueda identificar cada elemento de la lista
                                                key={brand}
                                            >
                                                {brand}
                                            </NavDropdown.Item>
                                        ))}
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item
                                            as={NavLink}
                                            to={`/${category.name}`}
                                            className="fw-light"
                                            onClick={() => handleNavLinkClick(`/${category.name}`)}
                                        >
                                            Ver todas
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                ))}
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