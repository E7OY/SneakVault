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
    const [categories, setCategories] = useState<Category[]>([]);
    const userContext = useContext(UserContext);
    const user = userContext ? userContext.user : null;
    const setUser = userContext ? userContext.setUser : () => { };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const productosRef = ref(db, 'productos');
                onValue(productosRef, (snapshot) => {
                    const productosData = snapshot.val();
                    if (productosData) {
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
        navigate(`/search-results?query=${encodeURIComponent(searchInput)}`);
    };

    const handleNavLinkClick = (path: string) => {
        navigate(path);
        setSearchInput('');
    };

    const handleSignOut = async () => {
        try {
            await signOut(getAuth());
            setUser(null);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <Navbar expand="lg" className="bg-white py-3 px-5 border-bottom border-dark">
            <Link to="/home" className="h1 text-decoration-none negro mb-0 fw-light">SneakVault</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-white rounded-0 text-white-50" />
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
                <div className="w-auto d-flex gap-2 justify-content-between mt-lg-0">
                    {user ? (
                        <>
                            <button className="button fw-light rounded-0" onClick={handleSignOut}>
                                Cerrar Sesión
                            </button>
                            <Link to="/cart">
                                <button className="bg-transparent border-1 p-2 border-dark">
                                    <img src={carrito} width={37} alt="imagen carrito" />
                                </button>
                            </Link>
                        </>
                    ) : (
                        <Link to="/login" className="button fw-light" onClick={() => handleNavLinkClick('/login')}>
                            Iniciar Sesión
                        </Link>
                    )}
                </div>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;