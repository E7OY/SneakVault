import React, { useEffect, useState, useRef } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';import original from "../assets/original.webp";
import envio from "../assets/envios.webp";
import devolucion from "../assets/devolucion.webp";
import { Link, useParams } from "react-router-dom";
import { onValue, ref } from "firebase/database";
import { db } from "../utils/firebase.utils";
import { imageMap } from "../utils/imageMap";

const Home = () => {
    const { nombre } = useParams<{ nombre: string }>();
    const [, setProduct] = useState<{ id: string; stock: number; categoria: string, imagen: string; marca: string; nombre: string; precio: number; descripcion: string } | null>(null);
    const [productos, setProductos] = useState<{ id: string; imagen: string; nombre: string; precio: number, categoria: string, marca: string }[]>([]);
    const imageRef = useRef<HTMLImageElement>(null);


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
                delay: 4000,
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
                    slidesPerView: 4,
                },
            },
        });
    }, []);


    return (
        <>  
                <main className=" w-75 mx-auto">
                    <div className="banner-home text-white text-start d-flex flex-column flex-md-row justify-content-center align-items-center">
                        <div className="col-12 col-md-6 mb-4 mb-md-0 text-center">
                            <h2 className="fw-light text-black">Air Jordan 1</h2>
                            <h3 className="fw-light text-black">La mejor zapatilla esta temporada...</h3>
                            <p className="mb-5 text-black-50 fw-light text-center">
                                Puedes combinar estas zapatillas Yeezy con cualquier estilo streetwear.
                                Su diseño atemporal y su silueta única las convierten en un elemento
                                esencial para tu colección.
                            </p>
                            <a href="/search?query=Air%20Jordan%201" className="border button border-black p-3 text-decoration-none fw-light">Explorar todas</a>
                        </div>
                        <div className="col-12 col-md-6 position-relative text-center">
                            <img
                                ref={imageRef}
                                src={imageMap['Air Jordan 1 Retro High Satin Black Toe']}
                                className="img-fluid"
                                alt="Yeezy 350 V2 Onyx"
                            />
                        </div>
                    </div>

                    {/* SLIDER YEEZY */}
                    <div className="d-flex flex-row justify-content-between  align-items-end">
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
                    <div className="d-flex flex-row justify-content-between gap-4 align-items-end">
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
                            <h3 className="text-center fw-light m-0 p-0">
                                Yeezy
                            </h3>
                            <Link to={`/zapatillas/yeezy`}>
                                <img src={imageMap['Yeezy 350 V2 Beluga']} width={200} alt="Yeezy 350 V2 Beluga" />
                            </Link>
                        </div>
                        <div className="col-3 w-auto marcas">
                            <h3 className="text-center fw-light m-0 p-0">
                                Jordan</h3>
                            <Link to={`/zapatillas/jordan`}>
                                <img src={imageMap['Air Jordan 1 x Cactus Jack']} width={200} alt="Air Jordan 1 x Cactus Jack" />
                            </Link>
                        </div>
                        <div className="col-3 w-auto marcas">
                            <h3 className="text-center fw-light m-0 p-0">
                                Nike</h3>
                            <Link to={`/zapatillas/nike`}>
                                <img src={imageMap['Nike Dunk Low Black Panda']} width={200} alt="Nike Dunk Low Black Panda" />
                            </Link>

                        </div>
                        <div className="col-3 w-auto marcas">
                            <h3 className="text-center fw-light m-0 p-0">
                                Adidas</h3>
                            <Link to={`/zapatillas/adidas`}>
                                <img src={imageMap['Adidas Forum x Bad Bunny White']} width={200} alt="Adidas Forum x Bad Bunny White" />
                            </Link>
                        </div>
                    </div>

                    <div className="d-flex flex-row justify-content-between align-items-end">
                        <div className="">
                            <h2 className="fw-light negro text-center display-6">
                                CAMISETAS DESTACADAS
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
                                        <img className='imagen-producto-home w-100 h-100' src={imageMap[producto.nombre]} alt={producto.nombre} onError={(e) => { e.currentTarget.src = imageMap[producto.nombre] }} />
                                    </Link>
                                    <h5 className="fw-light text-start mt-3">{producto.nombre}</h5>
                                    <p className="fw-light text-black-50 m-0 p-0">Desde {producto.precio}€</p>
                                </div>
                            ))}
                        </div>
                        <div className="swiper-button-prev text-black border border-1 border-black"></div>
                        <div className="swiper-button-next text-black border border-1 border-black"></div>
                    </div>

                    <div className="row d-flex justify-content-around mt-5 m-0 p-0">
                        <div className="col-12 col-md-4 info p-4 mb-md-0">
                            <img src={original} width={30} alt="icono original" />
                            <div>
                                <h4 className="my-3 fw-light">SneakVault Verified</h4>
                                <p className="fw-light text-black-50">
                                    SneakVault Verified es nuestra propia designación y significa que inspeccionamos cada artículo, cada vez.
                                    SneakVault Verified es nuestra propia designación y significa que inspeccionamos cada artículo, cada vez. Aprende más
                                </p>
                            </div>
                        </div>

                        <div className="col-12 col-md-4 info p-4  mb-md-0" >
                            <img src={envio} width={30} alt="icono envio" />
                            <div>
                                <h4 className="my-3 fw-light">SneakVault Verified</h4>
                                <p className="fw-light text-black-50">
                                    Ofrecemos envíos rápidos y seguros para que recibas tus productos lo antes posible.
                                    Ofrecemos envíos rápidos y seguros para que recibas tus productos lo antes posible. Aprende más
                                </p>
                            </div>
                        </div>

                        <div className="col-12 col-md-4 info p-4  mb-md-0">
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