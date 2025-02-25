import { useContext, useEffect, useState } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

import noctashit from '../assets/nocta-nrg-rf-tee-home.png';
import original from "../assets/original.png";
import envio from "../assets/envios.png";
import devolucion from "../assets/devolucion.png";
import bannerfigma from "../assets/bannerfigma.png";

import { Link, NavLink, useParams } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import UserContext from '../context/userContext';
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
            slidesPerView: 7,
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



    function cutMail(email: string | string[]): string | string[] {
        if (typeof email === 'string') {
            for (let i = 0; i < email.length; i++) {
                if (email[i] === '@') {
                    return email.slice(0, i);
                }
            }
        }
        return email;
    }

    const userContext = useContext(UserContext);
    const user = userContext?.user || null;
    const setUser = userContext?.setUser || (() => { });
    const errorMessage = document.querySelectorAll('.error-message');

    const handleSignOut = async () => {
        try {
            await signOut(getAuth());
            setUser(null);
        } catch (error) {
            Array.from(errorMessage).forEach((element) => {
                element.textContent = 'Error al cerrar sesión: ' + error;
            });
        }
    };


    return (
        <>

            <div className="banner-home mx-5 p-5 my-3 bg-negro text-white text-center d-flex flex-column flex-md-row justify-content-evenly align-items-center">
                <div className="col-12 col-md-5 mb-4 mb-md-0">
                    <h2>YEEZY</h2>
                    <h3>La mejor zapatilla esta temporada...</h3>
                    <p className="mb-5">
                        Puedes combinar estas zapatillas Yeezy con cualquier estilo streetwear.
                        Su diseño atemporal y su silueta única las convierten en un elemento
                        esencial para tu colección. Gracias a su tecnología innovadora,
                        te proporcionan comodidad durante todo el día.
                    </p>
                    <a href="/zapatillas/yeezy" className="border button-yeezy border-white p-3 text-decoration-none">Comprar ahora</a>
                </div>
                <div className="col-12 col-md-5">
                    <img src={imageMap['Yeezy 350 V2 Carbon Beluga']} className="img-fluid" width={700} style={{ transform: 'rotate(10deg)'}} alt="" />
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
                                <Link to={`/${producto.categoria}/${producto.marca}/${encodeURIComponent(producto.id)}`}>
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
                                <Link to={`/${producto.categoria}/${producto.marca}/${encodeURIComponent(producto.id)}`}>
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
                            <img src={imageMap['Yeezy 350 V2 Beluga']} width={250} alt="" />
                        </Link>
                    </div>
                    <div className="col-3 w-auto marcas">
                    <h3 className="text-center fw-light">
                    Jordan</h3>
                        <Link to={`/zapatillas/jordan`}>
                            <img src={imageMap['Air Jordan 1 x Cactus Jack']} width={250} alt="" />
                        </Link>
                    </div>
                    <div className="col-3 w-auto marcas">
                    <h3 className="text-center fw-light">
                    Nike</h3>
                        <Link to={`/zapatillas/nike`}>
                            <img src={imageMap['Nike Dunk Low Black Panda']} width={250} alt="" />
                        </Link>

                    </div>
                    <div className="col-3 w-auto marcas">
                    <h3 className="text-center fw-light">
                    Adidas</h3>
                        <Link to={`/zapatillas/adidas`}>
                            <img src={imageMap['Adidas Forum x Bad Bunny White']} width={250} alt="" />
                        </Link>
                    </div>
                </div>


                <div className="w-100 banner-home p-5 mb-5 border-1 border border-dark text-center d-flex flex-column flex-md-row justify-content-evenly align-items-center">
                    <div className="col-12 col-md-5 py-4 mb-4 mb-md-0">
                        <img src={noctashit} className="img-fluid" width={400} style={{ transform: 'rotate(350deg)' }} alt="" />
                    </div>
                    <div className="col-12 col-md-5 negro">
                        <h2>Nike x Nocta</h2>
                        <h3>La mejor camiseta esta temporada...</h3>
                        <p className="mb-5">
                            Puedes combinar estas camisetas Nocta con cualquier estilo streetwear.
                            Su diseño atemporal y su silueta única las convierten en un elemento
                            esencial para tu colección. Gracias a su tecnología innovadora,
                            te proporcionan comodidad durante todo el día.
                        </p>
                        <a href="/camisetas/nike/nocta-nrg-rf-tee" className="border button-nocta border-black p-3 text-decoration-none negro">Comprar ahora</a>
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
                            <div key={index} className="swiper-slide text-start">
                                <Link to={`/${producto.categoria}/${producto.marca}/${encodeURIComponent(producto.id)}`}>
                                    <img className='imagen-ropa-home' width={200} src={imageMap[producto.nombre]} alt={producto.nombre} onError={(e) => { e.currentTarget.src = imageMap[producto.nombre] }} />
                                </Link>
                                <h5 className="fw-bold">{producto.nombre}</h5>
                                <p className="text-decoration-underline">Desde {producto.precio}€</p>
                            </div>
                        ))}
                    </div>
                    <div className="swiper-button-prev text-black border border-1 border-black"></div>
                    <div className="swiper-button-next text-black border border-1 border-black"></div>
                </div>

                {/*
                <div className="row d-flex flex-row justify-content-around align-items-center my-5">
                <div className="col-3 w-auto marcas">
                    <h3 className="text-center">Nike</h3>
                    <img src={imageMap['Nike Nocta NRG Tee Oil Green']} width={250} alt="" />
                </div>
                <div className="col-3 w-auto marcas">
                    <h3 className="text-center">Palace</h3>
                    <img src={imageMap['Palace Heat Sensi Tee Navy']} width={250} alt="" />
                </div>
                <div className="col-3 w-auto marcas">
                    <h3 className="text-center">Supreme</h3>
                    <img src={imageMap['Supreme Tyler The Creator Tee White']} width={250} alt="" />
                </div>
                <div className="col-3 w-auto marcas">
                    <h3 className="text-center">Off-White</h3>
                    <img src={imageMap['Off-White x Nike 005 T-Shirts Beige']} width={250} alt="" />
                </div>
            </div>
            */}

                <div className="row bg-black mt-5 p-5 mx-auto m-0 d-flex gap-5 justify-content-evenly align-items-center">
                    <div className="col-12 col-md-4 py-5 mb-4 mb-md-0">
                        {user ? (
                            <>
                                <h4 className="text-start text-white">
                                    Tu cupón: BIENVENIDO30
                                </h4>
                                <span className="text-light">*Para compras superiores a 49€</span>
                            </>
                        ) : (
                            <h4 className="text-start text-white">
                                Regístrate ahora y obtén un descuento del -30% en tu próxima compra
                            </h4>
                        )}
                    </div>
                    <div className="col-12 col-md-2 p-3 text-center">
                        {user ? (
                            <>
                                <button className='fw-bold bg-white text-black p-3 px-5' onClick={handleSignOut}>Cerrar Sesión en {user.email ? cutMail(user.email) : ''}</button>
                            </>
                        ) : (
                            <>
                                <NavLink to="/register" className='nav-link fw-bold bg-white text-black p-3 px-5'>
                                    Regístrate Ahora
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>

                {/*
                <div className="row mt-5 d-flex justify-content-start">
                    <div className="col-12">
                        <h2 className="fw-bold display-5 pasion negro text-start">
                            PASIÓN POR EL HYPEBEAST
                        </h2>
                    </div>
                    <div className="collage-grid">
                        {images.map((image, index) => (
                            <div key={index} className="collage-item">
                                <img
                                    src={image}
                                    className="collage-img"
                                    alt={`image-${index}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                 */}

                <div className="row d-flex justify-content-center gap-5 mt-5">
                    <div className="col-12 col-md-3 info border border-black border-1 p-4 mb-md-0">
                        <img src={original} width={30} alt="" />
                        <div>
                            <h4 className="my-3">SneakVault Verified</h4>
                            <p>
                                SneakVault Verified es nuestra propia designación y significa que inspeccionamos cada artículo, cada vez.
                                SneakVault Verified es nuestra propia designación y significa que inspeccionamos cada artículo, cada vez. Aprende más
                            </p>
                        </div>
                    </div>

                    <div className="col-12 col-md-3 info border border-black border-1 p-4 mb-md-0">
                        <img src={envio} width={30} alt="" />
                        <div>
                            <h4 className="my-3">SneakVault Verified</h4>
                            <p>
                                Ofrecemos envíos rápidos y seguros para que recibas tus productos lo antes posible.
                                Ofrecemos envíos rápidos y seguros para que recibas tus productos lo antes posible. Aprende más
                            </p>
                        </div>
                    </div>

                    <div className="col-12 col-md-3 info border border-black border-1 p-4  mb-md-0">
                        <img src={devolucion} width={30} alt="" />
                        <div>
                            <h4 className="my-3">SneakVault Verified</h4>
                            <p>
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