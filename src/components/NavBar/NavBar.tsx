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

interface Category {
    name: string;
    brands: string[];
}

const NavBar = () => {
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
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

        <Navbar expand="lg" className="bg-white py-3 px-5 border-bottom border-dark">
            <Link to="/home" className="h1 text-decoration-none negro mb-0 fw-light">SneakVault</Link>
            <Navbar.Toggle aria-controls="basic-navbar-na" className="border-dark" />

            <Navbar.Collapse id="basic-navbar-nav">

                <Container className="navbar d-flex justify-content-between w-100">

                    <Nav className="d-flex flex-column flex-lg-row align-items-lg-left gap-3 w-auto">
                        <Link className="navbar-brand" to="/home" onClick={() => handleNavLinkClick('/home')}></Link>
                        <Nav.Link as={NavLink} to="/home" className="fw-light" onClick={() => handleNavLinkClick('/home')}>HOME</Nav.Link>

                        <CategoryMenu categories={categories} handleNavLinkClick={handleNavLinkClick} />

                    </Nav>

                    <Form onSubmit={handleSearchSubmit} className="d-flex my-lg-0">
                        <FormControl
                            type="search"
                            placeholder="Buscar"
                            className="mr-2 rounded-0 px-5 py-4 border-1 fw-light text-black-50 border-black"
                            aria-label="Search"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </Form>

                </Container>
            </Navbar.Collapse>

            <div className="w-auto d-flex gap-2 justify-content-end mt-3 mt-lg-0">
                        {user ? (
                            <>
                                <button className="button fw-light rounded-0" onClick={handleSignOut}>
                                    Cerrar Sesión
                                </button>
                                <Link to="/cart">
                                    <button onClick={toggleCart} className="bg-transparent border-1 p-2 border-dark">
                                        <img src={carrito} width={37} alt="imagen carrito" />
                                    </button>
                                </Link>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="button fw-light"
                                onClick={() => handleNavLinkClick('/login')}
                            >
                                Iniciar Sesión
                            </Link>
                        )}
                </div>
        </Navbar>

    );

}

export default NavBar;