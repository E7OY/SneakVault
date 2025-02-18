import { useState, useEffect } from 'react';
import { db } from '../utils/firebase.utils';
import { onValue, ref } from 'firebase/database';
import { Link, useParams } from 'react-router-dom';

import '../index.css';

import { imageMap } from '../utils/imageMap';

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
    const [orderBy, setOrderBy] = useState<'asc' | 'desc' | 'stock-asc' | 'stock-desc'>('asc');


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


    /* funcion con evento de cambio, cuando el user selecciona una opcion en el menu y 
    actualiza el estado con el valor seleccionado por el user */
    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setOrderBy(event.target.value as 'asc' | 'desc' | 'stock-asc' | 'stock-desc');
    };

    /*crea copia del array productos y los ordena tonmando dos productos (a y b)*/
    const sortedProducts = [...products].sort((a, b) => {
        switch (orderBy) {
            case 'asc':
                return a.precio - b.precio;
            case 'desc':
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
                    <h1 className='fw-bold display-2 my-4 w-auto d-inline'>{categoria}
                        <h2 className='fw-bold display-2 my-4 w-auto d-inline'>.{marca}</h2>
                        <span className='display-3 fw-bold'>({products.length})</span>
                    </h1>

                    <div className="d-flex align-items-center mt-4">
                        <select id="sortOrder" value={orderBy} onChange={handleSortChange} className="form-select rounded-0 border border-2 border-dark w-auto">
                            <option value="asc">Precio ascendente</option>
                            <option value="desc">Precio descendente</option>
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
                                            <span className="text-dark mx-3 position-absolute">{product.stock} en stock</span>
                                    ) : (
                                        <span className="text-white rounded-0 bg-dark mx-3 position-absolute">Agotado</span>
                                    )}
                                    <img
                                        className="producto-img img-fluid p-3"
                                        src={product.imagen || imageMap[product.nombre]}
                                        alt={product.nombre}
                                        onError={(e) => { e.currentTarget.src = imageMap[product.nombre] }}
                                    />
                                    <div className="producto-info p-3">
                                        <h6 className="text-muted mb-2">{product.categoria}</h6>
                                        <h5 className="text-truncate fw-semibold">{product.nombre}</h5>
                                        <p className="m-0 p-0 text-muted">{product.precio}€</p>
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