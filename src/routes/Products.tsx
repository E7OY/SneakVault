import { useState, useEffect } from 'react';
import { db } from '../utils/firebase.utils';
import { collection, getDocs } from 'firebase/firestore';

import '../index.css';

import imagen1 from '../assets/jordan1.png';
import imagen2 from '../assets/yeezy.png';
import imagen3 from '../assets/yeezyblack.png';
import imagen4 from '../assets/jordanretro.png';
import imagen5 from '../assets/off-white.png';
import imagen6 from '../assets/offwhitenike.png';

const imageMap: { [key: string]: string } = {
    'Air Jordan 1 x Cactus Jack': imagen1,
    'Yeezy Foam': imagen2,
    'Yeezy Boost 700 V3': imagen3,
    'Jordan Retro Canyon Purple': imagen4,
    'Nike Air Force 1 x Louis Vuitton': imagen5,
    'Air Force 1 Mid x Off-White' :imagen6,
};

const Products = () => {
    const [products, setProducts] = useState<{ id: string; categoria: string, imagen: string; nombre: string; precio: number; stock: number, descripcion: string }[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'productos'));
                const productsData = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        imagen: data.imagen || '',
                        nombre: data.nombre || '',
                        precio: data.precio || 0,
                        stock: data.stock || 0,
                        descripcion: data.descripcion || '',
                        categoria: data.categoria || ''
                    };
                });
                setProducts(productsData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, []);


    return (
        <div className="row mt-5 text-black d-flex justify-content-center align-items-stretch productos">
            {products.map(product => (
                <div className="col-6 col-md-3 m-0 p-0">
                    <div key={product.id} className=" producto">
                    <img className='img-fluid' src={product.imagen || imageMap[product.nombre]} alt={product.nombre} onError={(e) => { e.currentTarget.src = imageMap[product.nombre] }} />
                    <h3 className='mx-3'>{product.nombre}</h3>
                    <p className='mx-3'>{product.precio}€</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Products;