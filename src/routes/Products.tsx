import { useState, useEffect } from 'react';
import { db } from '../utils/firebase.utils';
import { onValue, ref } from 'firebase/database';
import { useParams } from 'react-router-dom';

import '../index.css';

import imagen1 from '../assets/jordan1.png';
import imagen5 from '../assets/off-white.png';
import imagen6 from '../assets/offwhitenike.png';

import imagen7 from '../assets/nikexstussy.png';
import imagen8 from '../assets/yeezy.png';
import imagen9 from '../assets/yeezyblack.png';
import imagen10 from '../assets/jordanretro.png';
import imagen11 from '../assets/jordanfrozen.png';
import imagen12 from '../assets/campus.png';

import imagen13 from '../assets/offwhiteshirt.png';
import imagen14 from '../assets/offwhiteshirtblack.png';
import imagen15 from '../assets/supremeshirt.png';
import imagen16 from '../assets/suprememm6.png';
import imagen17 from '../assets/nikeshirt.png';
import imagen18 from '../assets/palaceshirt.png';
import imagen19 from '../assets/palacelongsleeve.png';



/*  NO EN HOME */ 
import imagen20 from '../assets/yeezy-350-cloud.png';
import imagen21 from '../assets/yeezy-350-granite.png';
import imagen22 from '../assets/yeezy-350-beluga.png';
import imagen23 from '../assets/yeezy-350-frozen-yellow.png';
import imagen24 from '../assets/yeezy-foam-sulfur.png';
import imagen25 from '../assets/yeezy-slides-onyx.png';
import imagen26 from '../assets/yeezy-foam-cinder.png';

import imagen27 from '../assets/jordan-retro-seafoam.png';
import imagen28 from '../assets/jordan-retro-low-fragment-travis.png';
import imagen29 from '../assets/jordan-retro-low-travis.png';
import imagen30 from '../assets/jordan-retro-low-travis-mocha.png';
import imagen31 from '../assets/jordan-jumpman-travis.png';
import imagen32 from '../assets/jordan-low-travis-black-phantom.png';



const imageMap: { [key: string]: string } = {
    'Air Jordan 1 x Cactus Jack': imagen1,   //meter nombres de los productos en la bbdd
    'Nike Air Force 1 x Louis Vuitton': imagen5,
    'Air Force 1 Mid x Off-White' :imagen6,
    'Nike Air Zoom x Stussy' : imagen7,
    'Yeezy Foam' : imagen8,
    'Yeezy Boost 700 V3' : imagen9,
    'Jordan Retro Canyon Purple' : imagen10,
    'Jordan Frozen Moments' : imagen11,
    'Adidas Campus x Bad Bunny' : imagen12,

    'Off-White camiseta shared logo' :imagen13,
    'Off-White black t-shirt' : imagen14,
    'Supreme x Undercover face' : imagen15,
    'Camiseta Supreme x MM6' : imagen16,
    'Nike x Commes des Garcons' :imagen17,
    'Palace x Oakley T-Shirt' : imagen18,
    'Palace x Carhartt WIP' : imagen19,

    'Yeezy 350 V2 Cloud White' : imagen20,
    'Yeezy 350 V2 Granite' : imagen21,
    'Yeezy 350 V2 Beluga' : imagen22,
    'Yeezy 350 V2 Frozen Yellow' : imagen23,
    'Yeezy Foam Runner Sulfur' : imagen24,
    'Yeezy Slides Onyx' : imagen25,
    'Yeezy Foam Runner Cinder' : imagen26,
    'Jordan 4 Retro Seafoam' : imagen27,
    'Air Jordan 1 Low OG SP x Fragment Design x Travis Scott' : imagen28,
    'Jordan 1 Retro Low OG SP Travis Scott' : imagen29,
    'Air Jordan 1 Low Travis Scott Reverse Mocha' : imagen30,
    'Jordan Jumpman Travis Scott' : imagen31,
    'Jordan 1 Low OG SP Travis Scott Black Phantom' : imagen32,

};




const Products = () => {
    const { categoria, marca } = useParams<{ categoria: string, marca: string }>();
    const [products, setProducts] = useState<{ stock: number; id: string; categoria: string, imagen: string; nombre: string; precio: number; descripcion: string }[]>([]);

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
                                    stock: product.stock || 0
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
            <h1 className='fw-bold display-1 mt-4 w-5 mx-3'>DESCUBRE PRODUCTOS ILIMITADOS SIN LIMITACION</h1>
            <div className="productos">
                {products.map(product => (
                    <div className="m-0 p-0 " key={product.id}>
                        <div className="producto">
                        <img className='img-fluid' src={product.imagen || imageMap[product.nombre]} alt={product.nombre} onError={(e) => { e.currentTarget.src = imageMap[product.nombre] }} />                            
                        <h6 className='mx-3 mt-3'>{product.categoria}</h6>
                            <h5 className='fw-semibold mx-3 '>{product.nombre}</h5>
                            <p className='mx-3'>{product.precio}€</p>
                        {product.stock <= 10 ? <h6 className='mx-3 fw-light text-danger position-absolute '>Bajo stock</h6> :
                        <h6 className='mx-3 fw-light position-absolute'>{product.stock} en stock</h6> }
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Products;
