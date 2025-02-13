import { useState, useEffect } from 'react';
import { db } from '../utils/firebase.utils';
import { onValue, ref } from 'firebase/database';
import { Link, useParams } from 'react-router-dom';

import '../index.css';


import { imageMap } from '../utils/imageMap';


const Products = () => {
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
                                    categoria: category || '',
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
            <h2 className='fw-bold display-1 mt-4 w-5 mx-3'>DESCUBRE PRODUCTOS ILIMITADOS SIN LIMITACION</h2>
            <h1 className='fw-bold display-2 mt-4 w-5 mx-3'>{marca}</h1>
            <div className="productos">
                {products.map(product => (
                    <div className="m-0 p-0 " key={product.id}>
                        <div className="producto">
                            <Link to={`/${categoria}/${encodeURIComponent(product.nombre)}`}>
                            <img className='img-fluid imagen-producto py-2' src={product.imagen || imageMap[product.nombre]} alt={product.nombre} onError={(e) => { e.currentTarget.src = imageMap[product.nombre] }} />                            
                            </Link>
                            <h6 className='mx-3 mt-3'>{product.categoria}</h6>
                            <h5 className='fw-semibold mx-3 '>{product.nombre}</h5>
                            <p className='mx-3'>{product.precio}€</p>
                            {product.stock > 0 ?
                                (product.stock <= 10 ? <h6 className='mx-3 fw-light text-danger position-absolute '>Bajo stock</h6> :
                                    <h6 className='mx-3 fw-light position-absolute'>{product.stock} en stock</h6>) :
                                <h6 className='mx-3 text-white bg-black position-absolute'>Agotado</h6>}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Products;