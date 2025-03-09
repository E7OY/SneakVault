import { useState, useEffect } from 'react';
import { db } from '../utils/firebase.utils';
import { onValue, ref } from 'firebase/database';
import { useParams, useLocation } from 'react-router-dom';
import '../index.css';
import ProductCard from '../components/ProductCard';
import ProductSort from '../components/ProductSort';

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
    // useParams hook que permite acceder a los parámetros de la URL por ejemplo: /productos/:categoria/:marca
    const { categoria, marca } = useParams<{ categoria: string, marca: string }>();
    // useState hook que permite manejar el estado de los productos
    const [products, setProducts] = useState<{ stock: number; id: string; categoria: string, imagen: string; marca: string; nombre: string; precio: number; descripcion: string }[]>([]);
    const [orderBy, setOrderBy] = useState<'alphabetical' | 'price-asc' | 'price-desc' | 'stock-asc' | 'stock-desc'>('alphabetical');
    const [searchInput, setSearchInput] = useState('');
    // useLocation hook que permite acceder a la ubicación actual de la URL
    const location = useLocation();
    const [visibleProducts, setVisibleProducts] = useState(20);
    
    const loadMore = () => {
        setVisibleProducts(prevVisibleProducts => prevVisibleProducts + 20);
    };

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
            <div className="container-fluid w-75 px-4">
                <div className="row m-0 p-0 my-3 w-auto d-flex flex-row justify-content-between align-items-center">
                    <div className="col-4 w-auto m-0 p-0">
                        <h2 className='fw-light display-6 my-2 w-auto d-inline text-nowrap'>{categoria}</h2>
                        {searchInput !== '' ? (
                            <p className='display-6 fw-light text-black-50'>{`"${searchInput}" ${filteredProducts.length} resultados`}</p>
                        ) : (
                            <p className='display-6 fw-light text-black-50'>{`${filteredProducts.length} resultados`}</p>
                        )}
                    </div>

                    <div className="col-4 w-auto col-sm-12 d-flex align-items-center m-0 p-0">
                        <ProductSort orderBy={orderBy} handleSortChange={handleSortChange} />
                    </div>
                </div>

                <div className="row w-100 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4 g-0 z-0">
                {sortedProducts.slice(0, visibleProducts).map(product => (
                    <div className="col" key={product.id}>
                        <ProductCard product={product} />
                    </div>
                ))}
                </div>

                {visibleProducts < sortedProducts.length && (
                    <div className="text-center my-5">
                        <button onClick={loadMore} className="button fw-light">
                            Ver más productos
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Products;