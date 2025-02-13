// filepath: /C:/Users/soyel/Desktop/2ºDAW/2ºEVAL/DAWC/SneakVault/src/routes/ProductDetails.tsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../utils/firebase.utils';
import { ref, onValue } from 'firebase/database';

import prohibido from '../assets/prohibido.png';

import imagen1 from '../assets/jordan1.png';
import imagen5 from '../assets/off-white.png';
import imagen6 from '../assets/offwhitenike.png';

import imagen7 from '../assets/nikexstussy.png';
import imagen8 from '../assets/yeezy.png';
import imagen9 from '../assets/yeezyblack.png';
import imagen10 from '../assets/jordanretro.png';
import imagen11 from '../assets/jordanfrozen.png';
import imagen12 from '../assets/campus.png';

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

import imagen33 from '../assets/yeezy-350-black.png';
import imagen34 from '../assets/yeezy-380-alien.png';
import imagen35 from '../assets/yeezy-350-light.png';
import imagen36 from '../assets/yeezy-700-wave.png';
import imagen37 from '../assets/yeezy-700-static.png';
import imagen38 from '../assets/yeezy-slides-ochre.png';
import imagen39 from '../assets/jordan-retro-fear.png';
import imagen40 from '../assets/jordan-retro-wet-cement.png';
import imagen41 from '../assets/jordan-retro-olive.png';
import imagen42 from '../assets/jordan-retro-A-Ma-Maniére.png';
import imagen43 from '../assets/zoom-vomero-5.png';
import imagen44 from '../assets/nocta-black.png';
import imagen45 from '../assets/nocta-white.png';
import imagen46 from '../assets/nocta-eggplant.png'
import imagen47 from '../assets/nocta-glide-white.png'
import imagen48 from '../assets/nocta-rattan.png';
import imagen49 from '../assets/nocta-orange.png';
import imagen50 from '../assets/forum-bad-bunny-white.png';
import imagen51 from '../assets/response-cl-bad-bunny.png';
import imagen52 from '../assets/response-cl-white-bad-bunny.png'
import imagen53 from '../assets/response-cl-black-bad-bunny.png';
import imagen54 from '../assets/response-cl-blue-bad-bunny.png';
import imagen55 from '../assets/jordan-jumpman-travis-dark-mocha.png';
import imagen56 from '../assets/jordan-jumpman-travis-university-red.png';

import imagen57 from '../assets/yeezy-350-zebra.png';
import imagen58 from '../assets/yeezy-350-dazzling-blue.png';
import imagen59 from '../assets/yeezy-slides-granite.png';
import imagen60 from '../assets/yeezy-slides-bone.png';
import imagen61 from '../assets/yeezy-slides-resin.png';
import imagen62 from '../assets/yeezy-350-sesame.png';
import imagen63 from '../assets/yeezy-350-yeezreel.png';
import imagen64 from '../assets/forum-bad-bunny-black.png';
import imagen65 from '../assets/forum-bad-bunny-blue.png';
import imagen66 from '../assets/campus-cream.png';
import imagen67 from '../assets/supreme-4-life.png';
import imagen68 from '../assets/jordan-biggie-tee.png';
import imagen69 from '../assets/tyler-the-creator-tee-white.png';
import imagen70 from '../assets/backwards-tee-white.png';
import imagen71 from '../assets/wave-outline-tee-white.png';
import imagen72 from '../assets/jumbo-arrow-tee-white.png';
import imagen73 from '../assets/jumbo-arrow-tee-purple.png';
import imagen74 from '../assets/nocta-nrg-tee-grey.png';
import imagen75 from '../assets/nocta-nrg-rf-tee.png';
import imagen76 from '../assets/nocta-nrg-tee-oil-green.png';
import imagen77 from '../assets/nocta-souvenir-cactus.png';
import imagen78 from '../assets/8-ball-tee-khaki.png';
import imagen79 from '../assets/8-ball-tee-natural.png';
import imagen80 from '../assets/8-ball-tee-black.png';
import imgen81 from '../assets/thermal-stock-tee.png';
import imagen82 from '../assets/surfwalk-tee-black.png';
import imagen83 from '../assets/surfwalk-tee-white.png';
import imagen84 from '../assets/surfwalk-tee-navy.png';
import imagen85 from '../assets/heat-sensi-tee-navy.png';
import imagen86 from '../assets/save-thyself-tee-white.png';


const imageMap: { [key: string]: string } = {
    'Air Jordan 1 x Cactus Jack': imagen1,   //meter nombres de los productos en la bbdd
    'Nike Air Force 1 x Louis Vuitton': imagen5,
    'Air Force 1 Mid x Off-White': imagen6,
    'Nike Air Zoom x Stussy': imagen7,
    'Yeezy Foam': imagen8,
    'Yeezy Boost 700 V3': imagen9,
    'Jordan 4 Retro Canyon Purple': imagen10,
    'Jordan 4 Retro Frozen Moments': imagen11,
    'Adidas Campus x Bad Bunny': imagen12,
    'Off-White x Nike 005 T-Shirts Beige': imagen14,
    'Supreme x Undercover face': imagen15,
    'Camiseta Supreme x MM6': imagen16,
    'Nike x Commes des Garcons': imagen17,
    'Palace x Oakley T-Shirt': imagen18,
    'Palace x Carhartt WIP': imagen19,
    'Yeezy 350 V2 Cloud White': imagen20,
    'Yeezy 350 V2 Granite': imagen21,
    'Yeezy 350 V2 Beluga': imagen22,
    'Yeezy 350 V2 Frozen Yellow': imagen23,
    'Yeezy Foam Runner Sulfur': imagen24,
    'Yeezy Slides Onyx': imagen25,
    'Yeezy Foam Runner Cinder': imagen26,
    'Jordan 4 Retro Seafoam': imagen27,
    'Air Jordan 1 Low OG SP x Fragment Design x Travis Scott': imagen28,
    'Jordan 1 Retro Low OG SP Travis Scott': imagen29,
    'Air Jordan 1 Low Travis Scott Reverse Mocha': imagen30,
    'Jordan Jumpman Travis Scott': imagen31,
    'Jordan 1 Low OG SP Travis Scott Black Phantom': imagen32,
    'Yeezy 350 V2 Core Black Red': imagen33,
    'Yeezy 380 Alien': imagen34,
    'Yeezy 350 V2 Light': imagen35,
    'Yeezy 700 Wave Runner': imagen36,
    'Yeezy 700 Static': imagen37,
    'Yeezy Slides Ochre': imagen38,
    'Jordan 4 Retro Fear': imagen39,
    'Jordan 4 Retro Wet Cement': imagen40,
    'Jordan 4 Retro Olive': imagen41,
    'Jordan 3 Retro A Ma Maniére': imagen42,
    'Nike Zoom Vomero 5': imagen43,
    'Nike Hot Step Nocta Black': imagen44,
    'Nike Hot Step 2 Nocta Drake White': imagen45,
    'Nike Hot Step 2 Nocta Eggplant': imagen46,
    'Nike Nocta Glide Drake White': imagen47,
    'Nike Hot Step 2 Nocta Rattan': imagen48,
    'Nike Hot Step 2 Nocta Orange': imagen49,
    'Adidas Forum x Bad Bunny White': imagen50,
    'Adidas Response CL x Bad Bunny': imagen51,
    'Adidas Response CL White x Bad Bunny': imagen52,
    'Adidas Response CL Black x Bad Bunny': imagen53,
    'Adidas Response CL Blue x Bad Bunny': imagen54,
    'Jordan Jumpman Travis Scott Dark Mocha': imagen55,
    'Jordan Jumpman Travis Scott University Red': imagen56,

    'Yeezy 350 V2 Zebra': imagen57,
    'Yeezy 350 V2 Dazzling Blue': imagen58,
    'Yeezy Slides Granite': imagen59,
    'Yeezy Slides Bone': imagen60,
    'Yeezy Slides Resin': imagen61,
    'Yeezy 350 V2 Sesame': imagen62,
    'Yeezy 350 V2 Yeezreel': imagen63,
    'Adidas Forum x Bad Bunny Black': imagen64,
    'Adidas Forum x Bad Bunny Blue': imagen65,
    'Adidas Campus Cream x Bad Bunny': imagen66,
    'Supreme 4 Life Tee White': imagen67,
    'Supreme Jordan Biggie Tee Black': imagen68,
    'Supreme Tyler The Creator Tee White': imagen69,
    'Supreme Backwards Tee White': imagen70,
    'Off-White Wave Outline Tee White': imagen71,
    'Off-White Jumbo Arrow Tee White': imagen72,
    'Off-White Jumbo Arrow Tee Purple': imagen73,
    'Nike Nocta NRG Tee Grey': imagen74,
    'Nike Nocta NRG RF Tee': imagen75,
    'Nike Nocta NRG Tee Oil Green': imagen76,
    'Nike Nocta Souvenir Cactus': imagen77,

    'Stussy 8 Ball Tee Khaki': imagen78,
    'Stussy 8 Ball Tee Natural': imagen79,
    'Stussy 8 Ball Tee Black': imagen80,
    'Stussy Thermal Stock Tee': imgen81,

    'Stussy Surfwalk Tee Black': imagen82,
    'Stussy Surfwalk Tee White': imagen83,
    'Stussy Surfwalk Tee Navy': imagen84,
    'Palace Heat Sensi Tee Navy': imagen85,
    'Palace Save Thyself Tee White': imagen86

};
const ProductDetails = () => {
    const { nombre } = useParams<{ nombre: string }>();
    const [product, setProduct] = useState<{ stock: number; id: string; categoria: string, imagen: string; marca: string; nombre: string; precio: number; descripcion: string } | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productsRef = ref(db, 'productos');
                onValue(productsRef, (snapshot) => {
                    const productsData = snapshot.val();
                    for (const category in productsData) {
                        for (const brand in productsData[category]) {
                            for (const productId in productsData[category][brand]) {
                                const product = productsData[category][brand][productId];
                                if (product.nombre === nombre) {
                                    setProduct({
                                        id: productId,
                                        imagen: product.imagen || '',
                                        nombre: product.nombre || '',
                                        precio: product.precio || 0,
                                        descripcion: product.descripcion || '',
                                        categoria: product.categoria || '',
                                        stock: product.stock || 0,
                                        marca: product.marca || ''
                                    });
                                    return;
                                }
                            }
                        }
                    }
                });
            } catch (error) {
                console.error(error);
            }
        };

        fetchProduct();
    }, [nombre]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="row d-flex flex-row mt-5 mx-auto justify-content-center align-items-center gap-5">
                <div className="col-6 p-0 m-0">
                    <img className='imagen-producto' width={600} src={product.imagen || imageMap[product.nombre]} alt={product.nombre} onError={(e) => { e.currentTarget.src = imageMap[product.nombre] }} />
                </div>
                <div className="col-5">
                    {product.stock > 0 ?
                        (product.stock <= 10 ? <h6 className='fw-bold text-danger'>Menos de {product.stock} unidades</h6> :
                            <h6 className='fw-bold'>{product.stock} en stock</h6>) :
                        <h5 className='text-danger'>Agotado</h5>}
                    <h2>{product.marca}</h2>
                    <h2 className='display-3 fw-bold'>{product.nombre}</h2>
                    <h5 className='display-6 fw-medium'>{product.descripcion}</h5>
                    <p className='display-5 fw-bolder mt-3'>{product.precio}€</p>
                    {product.stock <= 0 ?

                        (<>
                            <a className='btn rounded-0 btn-dark text-danger p-3 mb-3'><img src={prohibido} className='mx-1' width={20}></img>Añadir a la cesta</a></>)
                        :
                        <a href="" className='btn rounded-0 text-white bg-dark p-3 mb-3'>Añadir a la cesta</a>
                    }

                    <br />
                    <a className="mt-5" data-toggle="modal" data-target="#myModal">
                        Guía de tallas
                    </a>

                    <div id="myModal" className="modal fade" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content p-3 rounded-0">
                                <div className="modal-header">
                                <h4 className="text-start modal-title">Guía de Tallas {product.categoria}</h4>
                                    <button type="button" className="close" data-dismiss="modal">
                                        &times;
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <h5>{product.nombre}</h5>
                                    <img className='imagen-producto mx-auto m-0' width={400} src={product.imagen || imageMap[product.nombre]} alt={product.nombre} onError={(e) => { e.currentTarget.src = imageMap[product.nombre] }} />
                                    {product.marca === 'Yeezy'&& (
                                
                                        <h5 className='my-4'>Para zapatillas yeezy se recomienda una talla más de la habitual.</h5>
                                    )} 
                                    <>
                                    {product.categoria === 'zapatillas' ?
                                        (
                                            <>
                                                <table className="table table-bordered table-striped">
                                                    <thead className="thead-dark">
                                                        <tr>
                                                            <th>Talla EU</th>
                                                            <th>Talla US Hombre</th>
                                                            <th>Talla UK Hombre</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr><td>35.5</td><td>3.5</td><td>2.5</td></tr>
                                                        <tr><td>36</td><td>4</td><td>3</td></tr>
                                                        <tr><td>36.5</td><td>4.5</td><td>3.5</td></tr>
                                                        <tr><td>37.5</td><td>5</td><td>4</td></tr>
                                                        <tr><td>38</td><td>5.5</td><td>4.5</td></tr>
                                                        <tr><td>38.5</td><td>6</td><td>5</td></tr>
                                                        <tr><td>39</td><td>6.5</td><td>5.5</td></tr>
                                                        <tr><td>40</td><td>7</td><td>6</td></tr>
                                                        <tr><td>40.5</td><td>7.5</td><td>6.5</td></tr>
                                                        <tr><td>41</td><td>8</td><td>7</td></tr>
                                                        <tr><td>42</td><td>8.5</td><td>7.5</td></tr>
                                                        <tr><td>42.5</td><td>9</td><td>8</td></tr>
                                                        <tr><td>43</td><td>9.5</td><td>8.5</td></tr>
                                                        <tr><td>44</td><td>10</td><td>9</td></tr>
                                                        <tr><td>44.5</td><td>10.5</td><td>9.5</td></tr>
                                                        <tr><td>45</td><td>11</td><td>10</td></tr>
                                                        <tr><td>45.5</td><td>11.5</td><td>10.5</td></tr>
                                                        <tr><td>46</td><td>12</td><td>11</td></tr>
                                                        <tr><td>47</td><td>12.5</td><td>11.5</td></tr>
                                                        <tr><td>47.5</td><td>13</td><td>12</td></tr>
                                                        <tr><td>48.5</td><td>14</td><td>13</td></tr>
                                                        <tr><td>49.5</td><td>15</td><td>14</td></tr>
                                                    </tbody>
                                                </table>
                                            </>
                                        )
                                        :
                                        (
                                            <>
                                                <p>Para encontrar la talla correcta de camisetas, mide el contorno de tu pecho en su parte más ancha. Usa la tabla de tallas para encontrar la talla correspondiente.</p>
                                            </>
                                        )
                                    
                                    }
                                    </> 
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductDetails;