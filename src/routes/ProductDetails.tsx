import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../utils/firebase.utils';
import { ref, onValue } from 'firebase/database';
import productTendencia from '../assets/hot-ptoduct.png';

import prohibido from '../assets/prohibido.webp';
import { imageMap } from '../utils/imageMap';
import UserContext from '../context/userContext';

import '../index.css';
import { useCart } from '../context/cartContext';

const ProductDetails= () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<{ stock: number; id: string; categoria: string, imagen: string; marca: string; nombre: string; precio: number; descripcion: string; color: string } | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<{ stock: number; id: string; categoria: string, imagen: string; marca: string; nombre: string; precio: number; descripcion: string }[]>([]);
    const userContext = useContext(UserContext);
    const user = userContext ? userContext.user : null;

    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                /*creamos referencia a la base de datos*/
                const productsRef = ref(db, 'productos');
                /*leemos los datos en tiempo real, con onValue que escucha los cambios*/
                onValue(productsRef, (snapshot) => {
                    const productsData = snapshot.val();
                    /*inicializamos array vacio para almacenar productos*/
                    const productsArray: { id: string; stock: number; categoria: string; imagen: string; marca: string; nombre: string; precio: number; descripcion: string, color: string }[] = [];
                    /*recorremos los datos de la base de datos y los almacenamos en el array*/
                    for (const categoria in productsData) {
                        for (const marca in productsData[categoria]) {
                            for (const productId in productsData[categoria][marca]) {
                                const product = productsData[categoria][marca][productId];
                                productsArray.push({
                                    id: productId,
                                    ...product
                                });
                            }
                        }
                    }

                    /*buscamos el producto actual por el nombre*/
                    const currentProduct = productsArray.find(p => p.id === id);
                    /*almacenamos el producto actual en el estado, sino se encuentra se establece nulo*/
                    setProduct(currentProduct || null);
                    /*buscamos productos relacionados por marca y categoria*/
                    if (currentProduct) {
                        /*si se encuentra el producto actual, filtramos productos relacionados con misma marca y categoria y excluimos el actual*/
                        const related = productsArray.filter(p => p.marca === currentProduct.marca && p.categoria === currentProduct.categoria && p.nombre !== currentProduct.nombre);
                        setRelatedProducts(related);
                    } else {
                        setProduct(null);
                    }
                });
            } catch (error) {
                console.error(error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <div>Cargando producto...</div>;
    }

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.nombre,
            price: product.precio,
            image: product.imagen
        });
    };

    const messageCart = () => {
        const message = document.querySelector('.message-cart') as HTMLElement;
        message.style.display = 'block';
        setTimeout(() => {
            message.style.display = 'none';
        }, 2000);
    };

    return (
        <main>
        <div>
            <div className="row d-flex flex-row mt-5 mx-auto justify-content-center align-items-center gap-5">
                <div className="d-flex flex-column col-md-6 col-sm-12 g-0">
                    <img className='imagen-producto-detail col-sm-12 col-12 col-md-12' src={product.imagen || imageMap[product.nombre]} alt={product.nombre} onError={(e) => { e.currentTarget.src = imageMap[product.nombre] }} />
                    <div className="imagenes d-flex flex-row col-md-12 p-0 m-0">
                        <img
                            className="imagen-producto-detail"
                            src={product.imagen || imageMap[product.nombre]}
                            alt={product.nombre}
                            onError={(e) => {
                                e.currentTarget.src = imageMap[product.nombre];
                            }}
                        />

                        <img
                            className="imagen-producto-detail"
                            src={product.imagen || imageMap[product.nombre]}
                            alt={product.nombre}
                            onError={(e) => {
                                e.currentTarget.src = imageMap[product.nombre];
                            }}
                            style={{ transform: 'rotateY(180deg)' }}
                        />
                        <img
                            className="imagen-producto-detail"
                            src={product.imagen || imageMap[product.nombre]}
                            alt={product.nombre}
                            onError={(e) => {
                                e.currentTarget.src = imageMap[product.nombre];
                            }}
                            style={{ transform: 'rotateX(180deg)' }}

                        />
                    </div>
                </div>
                <div className="col-md-5 col-sm-12 negro product-detail-info">
                    {product.stock > 0 ?
                        (product.stock <= 10 ? <h6 className='fw-bold bg-danger text-white p-1 d-inline-block float-right'>Menos de {product.stock} unidades</h6> :
                            <h6 className='fw-bold bg-success text-white p-1 d-inline-block float-right'>{product.stock} en stock</h6>) :
                        <h5 className='bg-danger text-white d-inline-block fst-italic p-1 float-right'>Agotado</h5>}

                    <Link to={`/${product.categoria}/${product.marca.toLowerCase()}`}>
                        <h4 className='fw-light text-black-50 text-decoration-none negro'>{product.marca}</h4>
                    </Link>
                    <h2 className='display-4 mt-3 fw-light'>{product.nombre}</h2>
                    <h5 className=' fw-light text-black-50'>{product.descripcion}</h5>
                    <div className={`${product.color}-color mt-3`} data-toggle="tooltip" data-placement="top" title={`${product.color}`} >{}</div>

                    <h3 className='fw-light my-4'>{product.precio}€</h3>

                    {user ? (
                        product.stock <= 0 ? (
                            <>
                            <a onClick={() => messageCart()} className='btn rounded-0 btn-dark fw-light text-danger p-3'>
                                <img src={prohibido} className='mx-1' width={20} alt="prohibido" />
                                Añadir a la cesta
                            </a>
                            <div className="message-cart bg-danger text-white">
                                Producto agotado.
                            </div>
                            </>
                        ) : (
                            <>
                            <a onClick={() => { handleAddToCart(); messageCart(); }} className='button fw-light' style={{ cursor: "pointer" }}>Añadir a la cesta</a>
                            {
                                            product.stock <= 5 ? (
                                                <>
                                                   <br/> <img src={productTendencia} className='producto-card-tendencia mt-4' alt="" width={100}/>
                                            </>) : null
                                        }
                            <div className="message-cart fw-light">
                                Producto añadido al carrito
                            </div>
                            </>
                        )
                    ) : (
                        <a href="/register" className='button fw-light'>Inicia sesión para comprar</a>
                    )}

                    <details className="my-2 mt-5">
                        <summary className='p-2 border-bottom fw-light'>
                            Envíos
                        </summary>
                        <h6 className='m-3 fw-light text-black-50'>
                            Una vez que realice su pedido, espere de 1 a 2 días hábiles para procesar sus pedidos. Después de eso,
                            tomará entre 1 y 2  días hábiles para la entrega en España, y entre 3 y 5 días hábiles para los pedidos
                            Unión Europea (según la ubicación).
                        </h6>
                    </details>

                    <details className="my-2">
                    <summary className='p-2 border-bottom fw-light'>
                    Cambios Y Devoluciones
                        </summary>
                        <h6 className='m-3 fw-light text-black-50'>
                            En SneakVault nos esforzamos por asegurar la plena satisfacción de nuestros clientes. Si no está completamente
                            satisfecho con su compra, le ofrecemos la opción de devolver los artículos bajo las siguientes condiciones:
                            <br /><li>Plazo para devoluciones:</li> Debe retornar los artículos dentro de los 14 días hábiles siguientes a la fecha de recepción.
                            <br /><li>Condición del artículo:</li> Los productos devueltos deben estar sin usar, en su embalaje original y en estado completo.
                            <br /><li>Coste de devolución:</li> No se reembolsarán los costos de envío iniciales. La devolución tiene un coste de etiqueta de envío
                            de 4,95€.
                            Adicionalmente, para facilitar un proceso de cambio sin complicaciones, ofrecemos envío gratuito en todos los cambios
                            de productos dentro de nuestro marco de devoluciones. Esto asegura que pueda elegir el producto más adecuado sin
                            preocuparse por costos adicionales.
                            Para más información o asistencia con su devolución, no dude en contactarnos. Estamos aquí para ayudarle.
                        </h6>
                    </details>
                    <details className="my-2">
                    <summary className='p-2 border-bottom fw-light'>
                    Autenticidad
                        </summary>
                        <h6 className='m-3 fw-light text-black-50'>
                            Cada producto disponible en SneakVault está respaldado por nuestra garantía de autenticidad. Antes de
                            ser entregados, nuestros especialistas verifican minuciosamente cada artículo para asegurarse de que sea genuino.
                            Nuestra colección de productos proviene directamente de una red de distribuidores asociados que han sido elegidos
                            cuidadosamente debido a su experiencia en la industria. Cada artículo es seleccionado individualmente y se te enviará
                            en su caja original, completa con todos los accesorios necesarios. Además, lo recibirás con el sello distintivo de
                            SneakVault, que confirma que el producto ha sido inspeccionado y enviado por nuestro equipo.
                            En SneakVault, nos esforzamos por garantizar la calidad y autenticidad de cada producto que ofrecemos. Queremos que
                            tengas la confianza de saber que estás adquiriendo productos genuinos y de alta calidad. Si tienes alguna pregunta
                            sobre la autenticidad de nuestros productos, no dudes en ponerte en contacto con nosotros. Estamos aquí para b
                            rindarte la mejor experiencia de compra posible.
                        </h6>
                    </details>


                    <div id="myModal" className="modal fade" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content p-3 rounded-0">
                                <div className="modal-header">
                                    <h4 className="text-start modal-title fw-medium">Guía de Tallas {product.categoria}</h4>
                                    <button type="button" className="close" data-dismiss="modal">
                                        &times;
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <h5>{product.nombre}</h5>
                                    <img className='imagen-producto mx-auto m-0' width={400} src={product.imagen || imageMap[product.nombre]} alt={product.nombre} onError={(e) => { e.currentTarget.src = imageMap[product.nombre] }} />
                                    {product.marca === 'yeezy' && (

                                        <h5 className='my-4 text-black-50 fw-light'>Para zapatillas yeezy se recomienda una talla más de la habitual.</h5>
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
                                                    <table className="table table-bordered table-striped">
                                                        <thead className="thead-dark">
                                                            <tr>
                                                                <th>Talla</th>
                                                                <th>Medidas (Pecho x Torso x Pierna)</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr><td>XS</td><td>3 x 10 x 12,5</td></tr>
                                                            <tr><td>S</td><td>4 x 12 x 15</td></tr>
                                                            <tr><td>M</td><td>5 x 15 x 17</td></tr>
                                                            <tr><td>L</td><td>6 x 17 x 20</td></tr>
                                                            <tr><td>XL</td><td>7 x 19 x 25</td></tr>
                                                            <tr><td>XXL</td><td>8 x 21 x 29</td></tr>


                                                        </tbody>
                                                    </table>
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

                    <br />
                    <a className="mt-5 fw-light text-decoration-none" data-toggle="modal" data-target="#myModal">
                        Guía de tallas
                    </a>

                </div>
            </div>

            {/* Productos Relacionados */}
            <div className="container-fluid mt-5 m-5">
                <h2 className="fw-light mb-4">Productos Relacionados</h2>
                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4 mr-5 g-2">
                    {relatedProducts.slice(0, 8).map(relatedProduct => (
                        <div className="col" key={relatedProduct.id}>
                            <div className="producto-card bg-white h-100">
                                <Link
                                    to={`/${relatedProduct.categoria}/${relatedProduct.marca}/${encodeURIComponent(relatedProduct.id)}`}
                                    className="text-decoration-none text-dark"
                                >
                                    <img
                                        className="producto-img img-fluid p-3"
                                        src={relatedProduct.imagen || imageMap[relatedProduct.nombre]}
                                        alt={relatedProduct.nombre}
                                        onError={(e) => { e.currentTarget.src = imageMap[relatedProduct.nombre] }}
                                    />
                                    <div className="p-3 productos-related-info">
                                        <h6 className="mb-2 fw-light text-white-50">{relatedProduct.marca}</h6>
                                        <h5 className="text-white fw-light  mb-2">{relatedProduct.nombre}</h5>
                                        <h6 className="mb-0 fw-light text-white-50">Desde {relatedProduct.precio}€</h6>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </main>
    );
};
export default ProductDetails;
