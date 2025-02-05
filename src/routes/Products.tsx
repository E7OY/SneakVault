import { useState, useEffect } from 'react';
import { db } from '../utils/firebase.utils';
import { collection, getDocs } from 'firebase/firestore';

import imagen1 from '../assets/jordan1.png';
import imagen2 from '../assets/yeezy.png';

const imageMap: { [key: string]: string } = {
    'product1': imagen1,
    'product2': imagen2,
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
        <div className="row w-100 h-100 mt-5 text-black">
            {products.map(product => (
                <div className="col-4">
                    <h4>{product.categoria}</h4>
                    <div key={product.id} className=" border border-2 border-black">
                        <img src={product.imagen || imageMap[product.nombre]} alt={product.nombre} onError={(e) => { e.currentTarget.src = 'fallback-image-url'; }} />
                        <h3>{product.nombre}</h3>
                        <p>{product.precio}€</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Products;