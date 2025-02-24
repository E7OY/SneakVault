import { useState, useEffect } from 'react';
import { db } from '../utils/firebase.utils';
import { onValue, ref } from 'firebase/database';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { imageMap } from '../utils/imageMap';
import '../index.css';

interface Product {
    categoria: string,
    marca: string;
    nombre: string;
    imagen: string;
    stock: number;
    precio: number;
    descripcion: string;
}
interface ProductProps {
    products: Product[];
}

const Products: React.FC<ProductProps> = () => {
    const { categoria, marca } = useParams<{ categoria: string, marca: string }>();
    const [products, setProducts] = useState<{ stock: number; id: string; categoria: string, imagen: string; marca: string; nombre: string; precio: number; descripcion: string }[]>([]);
    const [orderBy, setOrderBy] = useState<'alphabetical' |'price-asc' | 'price-desc' | 'stock-asc' | 'stock-desc'>('alphabetical');
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsRef = ref(db, 'productos');
                onValue(productsRef, (snapshot) => {
                    const productsData = snapshot.val();
                    const productsArray = [];

                    for (const category in productsData) {
                        if (categoria && category !== categoria) continue;

                        for (const brand in productsData[category]) {
                            if (marca && brand !== marca) continue;

                            for (const productId in productsData[category][brand]) {
                                const product = productsData[category][brand][productId];
                                productsArray.push({
                                    id: productId,
                                    imagen: product.imagen || '',
                                    nombre: product.nombre || '',
                                    precio: product.precio || 0,
                                    descripcion: product.descripcion || '',
                                    categoria: product.categoria || '',
                                    stock: product.stock || 0,
                                    marca: product.marca || ''
                                });
                            }
                        }
                    }

                    setProducts(productsArray);
                });
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, [categoria, marca]);

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('query');
        if (query) {
            setSearchInput(query);
        }
    }, [location.search]);

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate(`?query=${encodeURIComponent(searchInput)}`);
    };

    /*filtrar productos por nombre o descripcion*/
    const filteredProducts = products.filter(product =>
        product.nombre.toLowerCase().includes(searchInput.toLowerCase()) ||
        product.descripcion.toLowerCase().includes(searchInput.toLowerCase())
    );
    

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setOrderBy(event.target.value as 'alphabetical' | 'price-asc' | 'price-desc' | 'stock-asc' | 'stock-desc');
    };

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (orderBy) {
            case 'alphabetical':
                return 0;
            case 'price-asc':
                return a.precio - b.precio;
            case 'price-desc':
                return b.precio - a.precio;
            case 'stock-asc':
                return a.stock - b.stock;
            case 'stock-desc':
                return b.stock - a.stock;
            default:
                return 0;
        }
    });

    return (
        <>

            <div className="container-fluid px-4">
                <div className=" d-flex flex-row justify-content-between align-items-center">
                    <h1 className='fw-bold display-5 my-2 w-auto d-inline text-nowrap'>{categoria}


                        <h2 className='fw-bold display-5 my-4 w-auto d-inline'>.{marca}
                    
                    <>

                    { searchInput != "" ?

                    <h2 className='fw-bold display-5 my-4 w-auto d-inline'>{`.("${searchInput}")`}</h2>
                    
                    :
                    
                    <h2 className='fw-bold display-5 my-4 w-auto d-inline'>{``}</h2>
                    }
                    </>
                    <h6 className='display-6 fw-regular'>{`${filteredProducts.length} resultados`}</h6>
                    </h2> </h1>

                    <form className="w-50 d-flex justify-content-center align-items-stretch flex-row" onSubmit={handleSearchSubmit}>
                        <input
                            className="searchInput rounded-0 p-2 border-2 w-75 border-black"
                            type="search"
                            placeholder="Buscar"
                            aria-label="Search"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />

                    </form>

                    <div className="d-flex align-items-center">
                        <select id="sortOrder" value={orderBy} onChange={handleSortChange} className="py-2 form-select rounded-0 border border-2 border-dark w-auto">
                            <option value="alphabetical">Alfabéticamente A - Z</option>
                            <option value="price-asc">Precio ascendente</option>
                            <option value="price-desc">Precio descendente</option>
                            <option value="stock-asc">Stock ascendente</option>
                            <option value="stock-desc">Stock descendente</option>
                        </select>
                    </div>

                </div>
                    

                <div className="row w-100 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-0 z-0">
                    {sortedProducts.map(product => (
                        <div className="col" key={product.id}>
                            <div className="producto-card bg-white h-100 w-100 p-1">
                                <Link to={`/${product.categoria}/${product.marca}/${encodeURIComponent(product.id)}`}
                                    className="text-decoration-none text-dark">
                                    {product.stock > 0 ? (
                                        product.stock <= 10 ?
                                            <span className='mx-3 fw-light text-danger position-absolute'>Bajo stock</span> :
                                            <span className="text-dark mx-3 fw-light position-absolute">{product.stock} en stock</span>
                                    ) : (
                                        <span className="text-white fw-light rounded-0 bg-dark mx-3 position-absolute">Agotado</span>
                                    )}
                                    <img
                                        className="producto-img img-fluid p-3"
                                        src={product.imagen || imageMap[product.nombre]}
                                        alt={product.nombre}
                                        onError={(e) => { e.currentTarget.src = imageMap[product.nombre] }}
                                    />
                                    <div className="producto-info p-3">
                                        <h6 className="text-muted mb-2 fw-light text-black-50">{product.categoria}</h6>
                                        <h5 className="text-truncate fw-light">{product.nombre}</h5>
                                        <p className="m-0 p-0 text-muted fw-light text-black-50">{product.precio}€</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Products;