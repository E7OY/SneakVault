import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../utils/firebase.utils';
import { ref, onValue } from 'firebase/database';

import prohibido from '../assets/prohibido.webp';
import { imageMap } from '../utils/imageMap';
import UserContext from '../context/userContext';

import '../index.css';
import { useCart } from '../context/cartContext';
import SizeGuideModal from '../components/SizeGuideModal';

const ProductDetails= () => {
    // este hook se usa para que el componente pueda acceder a los parametros de la URL
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<{ stock: number; id: string; categoria: string, imagen: string; marca: string; nombre: string; precio: number; descripcion: string; color: string } | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<{ stock: number; id: string; categoria: string, imagen: string; marca: string; nombre: string; precio: number; descripcion: string }[]>([]);
    const userContext = useContext(UserContext);
    const user = userContext?.user;
    const day = new Date().getDate() + 4;
    const day2 = new Date().getDate() + 7;
    const month = new Date().toLocaleString('default', { month: 'long' });
    


    const { addToCart } = useCart();
    //hook de react que maneja efectos secundarios en componentes funcionales, en este cadso obtiene productos de la bd
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                /*creamos referencia a la base de datos*/
                const productsRef = ref(db, 'productos');
                /*leemos los datos en tiempo real, con onValue que escucha los cambios, el snapshot contiene los datos de la base de datos 
                */
                onValue(productsRef, (snapshot) => {
                    const productsData = snapshot.val();  //almacenamos los datos de la base de datos en productsData, .val es un metodo que devuelve los datos de la base de datos
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
        //llamamos a la funcion fetchProduct y le pasamos el id del producto actual
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
        <main className='w-75 mx-auto'>
        <div>
            <div className="row d-flex flex-row mt-5 mx-auto justify-content-center align-items-center">

            <div className="d-flex flex-column col-md-8 col-sm-12">
                        <div className="imagenes d-flex flex-wrap col-md-12 p-0 m-0 image-container">
                            <img className="imagen-producto-detail col-6 p-1" src={imageMap[product.nombre]} alt={product.nombre}
                                onError={(e) => { e.currentTarget.src = imageMap[product.nombre]; }} />
                            <img className="imagen-producto-detail col-6 p-1" src={imageMap[product.nombre]} alt={product.nombre}
                                onError={(e) => { e.currentTarget.src = imageMap[product.nombre]; }}
                                style={{ transform: 'rotateY(180deg)' }} />
                            <img className="imagen-producto-detail col-6 p-1" src={imageMap[product.nombre]} alt={product.nombre}
                                onError={(e) => { e.currentTarget.src = imageMap[product.nombre]; }}
                                style={{ transform: 'rotateX(180deg)' }} />
                            <img className="imagen-producto-detail col-6 p-1" src={imageMap[product.nombre]} alt={product.nombre}
                                onError={(e) => { e.currentTarget.src = imageMap[product.nombre]; }} />
                        </div>
                    </div>

                <div className="col-md-4 col-sm-12 negro product-detail-info">
                    {product.stock > 0 ?
                        (product.stock <= 10 ? <h6 className='fw-light bg-white text-danger border-1 border border-black p-1 d-inline-block float-right'>Menos de {product.stock} unidades</h6> :
                            <h6 className='fw-light bg-white text-black p-1 d-inline-block float-right border-1 border border-black'>{product.stock} en stock</h6>) 
                            :
                            <h5 className='bg-white text-danger d-inline-block border border-1 border-black fst-italic p-1 float-right'>Agotado</h5>}

                    <Link to={`/${product.categoria}/${product.marca.toLowerCase()}`} className='text-decoration-none fw-lighter negro'>
                        <h4 className='fw-lighter text-black text-decoration-none negro'>{product.marca}</h4>
                    </Link>
                    
                    <h2 className='display-7 mt-3 fw-light'>{product.nombre}</h2>
                    <div className={`${product.color}-color mt-3`} data-toggle="tooltip" data-placement="top" title={`${product.color}`} >{}</div>
                    <h3 className='fw-light mt-3'>{product.precio}€</h3>
                    <h6 className='fw-light mb-5'>Tasas de aduanas incluidas</h6>

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
                            <div className="message-cart fw-light">
                                Producto añadido al carrito
                            </div>
                            </>
                        )
                    ) : (
                        <a href="/login" className='button fw-light'>Inicia sesión para comprar</a>
                    )}

                <h6 className='fw-light mt-5'>ENTREGA ESTIMADA</h6>
                <h6 className='fw-light text-black-50'>Recíbelo entre el {day} y {day2} de {month}</h6>

                <div className="container-registro">
                    {
                        user ? 
                        <p className='text-black-50'>
                        Utiliza el código SNV10 en el pago para obtener un -10% en tu primer pedido. Solo en la app y en 
                        estilos seleccionados.
                        </p>
                        : (
                            <>
                            <h5>Registráte y obtén 10%</h5>
                            <p className='text-black-50'>
                            Utiliza el código SNV10 en el pago para obtener un -10% en tu primer pedido. Solo en la app y en 
                            estilos seleccionados.
                            </p>
                            </>
                        )
                    }
                </div>

                </div>
            </div>

            <div className="container-fuid mt-5 m-5">
            <h2 className="fw-light mb-4">Detalles del Producto</h2>
            <p className="fw-light text-black-50">{product.descripcion}</p>

            <SizeGuideModal product={product}/>

            <br />
            <a className="mt-5 fw-light text-decoration-none" data-toggle="modal" data-target="#myModal">
                Guía de tallas
            </a>

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

            </div>

            {/* Productos Relacionados */}
            <div className="container-fluid mt-5 m-5">
                <h2 className="fw-light mb-4">Productos Relacionados</h2>
                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 row-cols-xl-5 mr-5 d-flex g-0 accordion-flush flex-row justify-content-start align-items-center">
                    {relatedProducts.slice(0, 10).map(relatedProduct => (
                        <div className="col" key={relatedProduct.id}>
                            <div className="producto-card bg-white h-100">
                                <Link
                                    to={`/${relatedProduct.categoria}/${relatedProduct.marca}/${encodeURIComponent(relatedProduct.id)}`}
                                    className="text-decoration-none text-dark"
                                >
                                    <img
                                        className="producto-img img-fluid p-0 w-100 h-100"
                                        src={relatedProduct.imagen || imageMap[relatedProduct.nombre]}
                                        alt={relatedProduct.nombre}
                                        onError={(e) => { e.currentTarget.src = imageMap[relatedProduct.nombre] }}
                                    />
                                    <div className="px-3 pb-4 productos-related-info">
                                        <h6 className="mb-2 fw-light text-black-50 ">{relatedProduct.marca}</h6>
                                        <h5 className="text-black fw-light  mb-2">{relatedProduct.nombre}</h5>
                                        <h6 className="mb-0 fw-light text-black-50">Desde {relatedProduct.precio}€</h6>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}

                        {relatedProducts.length < 10 && relatedProducts.length > 0 ? (
                            <div className="col">
                                <div className="producto-card-related">
                                    <Link to={`/${product.categoria}/${product.marca.toLowerCase()}`} className="text-decoration-none text-dark h2 fw-light">
                                        Ver más de <span className='text-decoration-underline'>{product.marca}</span>
                                    </Link>
                                </div>
                            </div>
                        ) : null}

                </div>
            </div>
        </div>
        </main>
    );
};
export default ProductDetails;
