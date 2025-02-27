import { useContext, useEffect, useState } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

import noctashit from '../assets/nocta-nrg-rf-tee-home.webp';
import original from "../assets/original.webp";
import envio from "../assets/envios.webp";
import devolucion from "../assets/devolucion.webp";

import { Link, useParams } from "react-router-dom";
import { onValue, ref } from "firebase/database";
import { db } from "../utils/firebase.utils";
import { imageMap } from "../utils/imageMap";

const Home = () => {
    const { nombre } = useParams<{ nombre: string }>();
    const [product, setProduct] = useState<{ id: string; stock: number; categoria: string, imagen: string; marca: string; nombre: string; precio: number; descripcion: string } | null>(null);
    const [productos, setProductos] = useState<{ id: string; imagen: string; nombre: string; precio: number, categoria: string, marca: string }[]>([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productsRef = ref(db, 'productos');
                onValue(productsRef, (snapshot) => {
                    const productsData = snapshot.val();
                    const productosList = [];
                    for (const categoria in productsData) {
                        for (const marca in productsData[categoria]) {
                            for (const productId in productsData[categoria][marca]) {
                                const product = productsData[categoria][marca][productId];
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
                                }
                                productosList.push({
                                    id: productId,
                                    imagen: product.imagen || '',
                                    nombre: product.nombre || '',
                                    precio: product.precio || 0,
                                    categoria: product.categoria || '',
                                    marca: product.marca || ''
                                });
                            }
                        }
                    }
                    setProductos(productosList);
                });
            } catch (error) {
                console.error(error);
            }
        };

        fetchProduct();
    }, [nombre]);

    useEffect(() => {
        const swiper = new Swiper(".swiper-hero", {
            direction: "horizontal",
            loop: true,
            autoplay: {
                delay: 2000,
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
            },
            slidesPerView: 1,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                768: {
                    slidesPerView: 1,
                },
                1024: {
                    slidesPerView: 7,
                },
            },
        });
    }, []);

    return (
        <>

            <div className="banner-home m-5 p-5 py-3 border border-1 border-black text-white text-center d-flex flex-column flex-md-row justify-content-evenly align-items-center">
                <div className="col-12 col-md-5 mb-4 mb-md-0">
                    <h2 className="fw-light text-black">YEEZY</h2>
                    <h3 className="fw-light text-black">La mejor zapatilla esta temporada...</h3>
                    <p className="mb-5 text-black-50 fw-light">
                        Puedes combinar estas zapatillas Yeezy con cualquier estilo streetwear.
                        Su diseño atemporal y su silueta única las convierten en un elemento
                        esencial para tu colección. Gracias a su tecnología innovadora,
                        te proporcionan comodidad durante todo el día.
                    </p>
                    <a href="/zapatillas/yeezy" className="border button-nocta border-black p-3 text-decoration-none negro fw-light">Comprar ahora</a>
                    </div>
                <div className="col-12 col-md-5">
                    <img src={imageMap['Yeezy 350 V2 Carbon Beluga']} className="" width={650} style={{ transform: 'rotate(10deg)'}} alt="Yeezy 350 V2 Carbon Beluga" />
                </div>
            </div>

            <main className="mx-1 px-5 mt-5">
                {/* SLIDER YEEZY */}
                <div className="d-flex flex-row justify-content-between align-items-end">
                    <div className="">
                        <h2 className="fw-light negro text-center display-6">
                            YEEZY EN TENDENCIA
                        </h2>
                    </div>
                    <div className="">
                        <Link to="/zapatillas/yeezy" className="text-decoration-none">
                            <button className="button text-start">
                                VES MAS
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="swiper swiper-hero mb-5">
                    <div className="swiper-wrapper">
                        {productos.filter(producto => producto.categoria === 'zapatillas' && producto.marca === 'yeezy').slice(0, 10).map((producto, index) => (
                            <div key={index} className="swiper-slide text-start d-flex flex-column text-left justify-content-center">
                                <Link to={`/${producto.categoria}/${producto.marca}/${producto.id}`}>
                                    <img className='imagen-producto-home mx-auto m-0 align-items-center w-100 h-100' src={producto.imagen || imageMap[producto.nombre]} alt={producto.nombre} onError={(e) => { e.currentTarget.src = imageMap[producto.nombre] }} />
                                </Link>
                                <h5 className="fw-light text-start mt-3">{producto.nombre}</h5>
                                <p className="fw-light text-black-50 m-0 p-0">Desde {producto.precio}€</p>
                            </div>
                        ))}
                    </div>
                    <div className="swiper-button-prev text-black border border-1 border-black"></div>
                    <div className="swiper-button-next text-black border border-1 border-black"></div>
                </div>


                {/* SLIDER JORDAN */}
                <div className="d-flex flex-row justify-content-between align-items-end">
                    <div className="">
                    <h2 className="fw-light negro text-center display-6">
                    JORDAN DESTACADAS
                        </h2>
                    </div>
                    <div className="">
                        <Link to="/zapatillas/jordan" className="text-decoration-none">
                            <button className="button text-start">
                                VES MAS
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="swiper swiper-hero mb-5">
                    <div className="swiper-wrapper">
                        {productos.filter(producto => producto.categoria === 'zapatillas' && producto.marca === 'jordan').slice(0, 10).map((producto, index) => (
                            <div key={index} className="swiper-slide text-start d-flex flex-column text-left justify-content-center">
                                <Link to={`/${producto.categoria}/${producto.marca}/${producto.id}`}>
                                    <img className='imagen-producto-home mx-auto m-0 align-items-center w-100 h-100' src={producto.imagen || imageMap[producto.nombre]} alt={producto.nombre} onError={(e) => { e.currentTarget.src = imageMap[producto.nombre] }} />
                                </Link>
                                <h5 className="fw-light text-start mt-3">{producto.nombre}</h5>
                                <p className="fw-light text-black-50 m-0 p-0">Desde {producto.precio}€</p>
                            </div>
                        ))}
                    </div>
                    <div className="swiper-button-prev text-black border border-1 border-black"></div>
                    <div className="swiper-button-next text-black border border-1 border-black"></div>
                </div>


                <div className="row d-flex flex-row justify-content-around align-items-center my-5">
                    <div className="col-3 w-auto marcas">
                        <h3 className="text-center fw-light">
                            Yeezy
                        </h3>
                        <Link to={`/zapatillas/yeezy`}>
                            <img src={imageMap['Yeezy 350 V2 Beluga']} width={250} alt="Yeezy 350 V2 Beluga"/>
                        </Link>
                    </div>
                    <div className="col-3 w-auto marcas">
                    <h3 className="text-center fw-light">
                    Jordan</h3>
                        <Link to={`/zapatillas/jordan`}>
                            <img src={imageMap['Air Jordan 1 x Cactus Jack']} width={250} alt="Air Jordan 1 x Cactus Jack" />
                        </Link>
                    </div>
                    <div className="col-3 w-auto marcas">
                    <h3 className="text-center fw-light">
                    Nike</h3>
                        <Link to={`/zapatillas/nike`}>
                            <img src={imageMap['Nike Dunk Low Black Panda']} width={250} alt="Nike Dunk Low Black Panda" />
                        </Link>

                    </div>
                    <div className="col-3 w-auto marcas">
                    <h3 className="text-center fw-light">
                    Adidas</h3>
                        <Link to={`/zapatillas/adidas`}>
                            <img src={imageMap['Adidas Forum x Bad Bunny White']} width={250} alt="Adidas Forum x Bad Bunny White" />
                        </Link>
                    </div>
                </div>


                <div className="w-100 banner-home p-5 mb-5 border-1 border border-dark text-center d-flex flex-column flex-md-row justify-content-evenly align-items-center">
                    <div className="col-12 col-md-5 py-4 mb-4 mb-md-0">
                        <img src={noctashit} className="img-fluid" width={400} style={{ transform: 'rotate(350deg)' }} alt="camiseta nocta x nike" />
                    </div>
                    <div className="col-12 col-md-5 negro">
                        <h2 className="fw-light">Nike x Nocta</h2>
                        <h3 className="fw-light">La mejor camiseta esta temporada...</h3>
                        <p className="mb-5 fw-light text-black-50">
                            Puedes combinar estas camisetas Nocta con cualquier estilo streetwear.
                            Su diseño atemporal y su silueta única las convierten en un elemento
                            esencial para tu colección. Gracias a su tecnología innovadora,
                            te proporcionan comodidad durante todo el día.
                        </p>
                        <a href="/camisetas/nike/nocta-nrg-rf-tee" className="border button-nocta border-black p-3 text-decoration-none negro fw-light">Comprar ahora</a>
                    </div>
                </div>


                <div className="d-flex flex-row justify-content-between align-items-end">
                    <div className="">
                        <h2 className="fw-light negro text-center display-6">
                            CAMISETAS DESTACADA
                        </h2>
                    </div>
                    <div className="">
                        <Link to="/products" className="text-decoration-none">
                            <button className="button text-start">
                                VES MAS
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="swiper swiper-hero mb-5">
                    <div className="swiper-wrapper">
                        {productos.filter(producto => producto.categoria === 'camisetas').slice(0, 10).map((producto, index) => (
                            <div key={index} className="swiper-slide text-start d-flex flex-column text-left justify-content-center">
                                <Link to={`/${producto.categoria}/${producto.marca}/${producto.id}`}>
                                    <img className='imagen-producto-home' width={200} src={imageMap[producto.nombre]} alt={producto.nombre} onError={(e) => { e.currentTarget.src = imageMap[producto.nombre] }} />
                                </Link>
                                <h5 className="fw-light text-start mt-3">{producto.nombre}</h5>
                                <p className="fw-light text-black-50 m-0 p-0">Desde {producto.precio}€</p>
                            </div>
                        ))}
                    </div>
                    <div className="swiper-button-prev text-black border border-1 border-black"></div>
                    <div className="swiper-button-next text-black border border-1 border-black"></div>
                </div>

                {/*
                <div className="row bg-black mt-5 p-5 mx-auto m-0 d-flex gap-5 justify-content-evenly align-items-center">
                    <div className="col-12 col-md-4 py-5 mb-4 mb-md-0">
                        {user ? (
                            <>
                                <h4 className="text-start text-white fw-light">
                                    Tu cupón: BIENVENIDO30
                                </h4>
                                <span className="fw-light">*Para compras superiores a 49€</span>
                            </>
                        ) : (
                            <h4 className="text-start fw-light text-white">
                                Regístrate ahora y obtén un descuento del -30% en tu próxima compra
                            </h4>
                        )}
                    </div>
                    <div className="col-12 w-auto col-md-2 p-3 text-center">
                        {user ? (
                            <>
                                <button className='fw-light bg-white border-0 text-black p-3 px-5' onClick={handleSignOut}>Cerrar Sesión en {user.email ? cutMail(user.email) : ''}</button>
                            </>
                        ) : (
                            <>
                                <NavLink to="/register" className='nav-link fw-light bg-white text-black p-3 px-5'>
                                    Regístrate Ahora
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
                */}

                <div className="row d-flex justify-content-around mt-5 m-0 p-0">
                <div className="col-12 col-md-4 info p-4  mb-md-0" style={{ outline: "1px solid #010101", boxSizing: "border-box", backgroundColor: "#fff" }}>
                <img src={original} width={30} alt="icono original" />
                        <div>
                            <h4 className="my-3 fw-light">SneakVault Verified</h4>
                            <p className="fw-light text-black-50">
                                SneakVault Verified es nuestra propia designación y significa que inspeccionamos cada artículo, cada vez.
                                SneakVault Verified es nuestra propia designación y significa que inspeccionamos cada artículo, cada vez. Aprende más
                            </p>
                        </div>
                    </div>

                    <div className="col-12 col-md-4 info p-4  mb-md-0" style={{ outline: "1px solid #010101", boxSizing: "border-box", backgroundColor: "#fff" }}>
                    <img src={envio} width={30} alt="icono envio" />
                        <div>
                        <h4 className="my-3 fw-light">SneakVault Verified</h4>
                        <p className="fw-light text-black-50">
                                Ofrecemos envíos rápidos y seguros para que recibas tus productos lo antes posible.
                                Ofrecemos envíos rápidos y seguros para que recibas tus productos lo antes posible. Aprende más
                            </p>
                        </div>
                    </div>

                    <div className="col-12 col-md-4 info p-4  mb-md-0" style={{ outline: "1px solid #010101", boxSizing: "border-box", backgroundColor: "#fff" }}>
                    <img src={devolucion} width={30} alt="icono devolucion" />
                        <div>
                        <h4 className="my-3 fw-light">SneakVault Verified</h4>
                        <p className="fw-light text-black-50">
                                Facilitamos las devoluciones para que puedas comprar con confianza.
                                Facilitamos las devoluciones para que puedas comprar con confianza. Aprende más
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Home;