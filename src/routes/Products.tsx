import { useState, useEffect } from 'react';
import { db } from '../utils/firebase.utils';
import { onValue, ref } from 'firebase/database';
import { useParams } from 'react-router-dom';

import '../index.css';

import imagen1 from '../assets/jordan1.png';
import imagen2 from '../assets/yeezy.png';
import imagen3 from '../assets/yeezyblack.png';
import imagen4 from '../assets/jordanretro.png';
import imagen5 from '../assets/off-white.png';
import imagen6 from '../assets/offwhitenike.png';

const imageMap: { [key: string]: string } = {
    'Air Jordan 1 x Cactus Jack': imagen1,   //meter nombres de los productos en la bbdd
    'Yeezy Foam': imagen2,
    'Yeezy Boost 700 V3': imagen3,
    'Jordan Retro Canyon Purple': imagen4,
    'Nike Air Force 1 x LV': imagen5,
    'Air Force 1 Mid x Off-White' :imagen6,
};




const Products = () => {
    const { categoria, marca } = useParams<{ categoria: string, marca: string }>();
    const [products, setProducts] = useState<{ id: string; categoria: string, imagen: string; nombre: string; precio: number; descripcion: string }[]>([]);

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
                                    categoria: product.categoria || ''
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
            <h1 className='fw-bold display-1 mt-4 w-50 mx-3'>DESCUBRE PRODUCTOS ILIMITADOS SIN LIMITACION</h1>
            <div className="productos">
                {products.map(product => (
                    <div className="m-0 p-0" key={product.id}>
                        <div className="producto">
                        <img className='img-fluid' src={product.imagen || imageMap[product.nombre]} alt={product.nombre} onError={(e) => { e.currentTarget.src = imageMap[product.nombre] }} />                            
                        <h6 className='mx-3 mt-3'>{product.categoria}</h6>
                            <h3 className='mx-3'>{product.nombre}</h3>
                            <p className='mx-3'>{product.precio}€</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Products;
