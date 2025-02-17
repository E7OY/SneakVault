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

    return (
        <>
            <div className="container-fluid px-4">
                <h1 className='fw-bold display-2 my-4 w-auto float-left d-inline'>{categoria} 
                    
                <h2 className='fw-bold display-2 my-4 w-auto d-inline'>.{marca}</h2>
                    <span className='display-3 fw-bold'>({products.length})</span></h1>

                <div className="row w-100 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-0 z-0">
                    {products.map(product => (
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