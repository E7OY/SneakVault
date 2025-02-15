import { useContext, useEffect, useState } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import 'bootstrap/dist/css/bootstrap.min.css';


import supreme1 from "../assets/supreme1.jpg";
import fftcent from "../assets/50cent.jpg";
import jordan from "../assets/jordan.jpg";
import nikeaircactus from "../assets/nikeaircactus.jpg";
import nikejordan from "../assets/nikejordan.jpg";
import stussy90s from "../assets/stussy90s.jpg";
import stussy90s1 from "../assets/stussy90s1.jpg";
import travis1 from "../assets/travis1.png";

import supremelogo from "../assets/supremelogo.png";
import nikelogo from "../assets/nikelogo.png";
import stussylogo from "../assets/stussylogo.png";
import palacelogo from "../assets/palacelogo.png";
import yeezylogo from "../assets/yeezylogo.png";
import offwhitelogo from "../assets/offwhitelogo.png";
import mm6logo from "../assets/mm6logo.png";
import adidaslogo from "../assets/adidaslogo.png";



import shoksnike from "../assets/shoksnike.jpg";
import newbalancebanner from "../assets/newbalancebanner.jpg";
import airjordanbanner from "../assets/airjordanbanner.jpg";
import bannercj from "../assets/banner-cj.png";
import bannercjmocha from "../assets/banner-cj-mocha.png";
import bannerfigma from "../assets/bannerfigma.png";

import original from "../assets/original.png";
import envio from "../assets/envios.png";
import devolucion from "../assets/devolucion.png";

import '../index.css';
import { Link, NavLink, useParams } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import UserContext from '../context/userContext';
import { onValue, ref } from "firebase/database";
import { db } from "../utils/firebase.utils";

import { imageMap } from "../utils/imageMap";

const Home = () => {
    const { nombre } = useParams<{ nombre: string }>();
    const [product, setProduct] = useState<{ stock: number; id: string; categoria: string, imagen: string; marca: string; nombre: string; precio: number; descripcion: string } | null>(null);
    const [productos, setProductos] = useState<{ imagen: string; nombre: string; precio: number, categoria: string, marca: string }[]>([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productsRef = ref(db, 'productos');
                onValue(productsRef, (snapshot) => {
                    const productsData = snapshot.val();
                    const productosList = [];
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
                                }
                                productosList.push({
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
                delay: 8000,
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
            },
            slidesPerView: 7,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    }, []);

    useEffect(() => {
        const swiperBanners = new Swiper(".swiper-banner", {
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
    const setUser = userContext?.setUser || (() => {});
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

    const images = [
        supreme1,
        fftcent,
        nikeaircactus,
        jordan,
        stussy90s1,
        nikejordan,
        stussy90s,
        travis1,
        /*travis2,
        travis3*/
    ];

    return (
        <>
        {/* 
        <div className="swiperBanners swiper-banner mb-5">
            <div className="swiper-wrapper p-0">
                <div className="swiper-slide text-start">
                    <img src={shoksnike} alt="" />
                </div>
                <div className="swiper-slide ">
                    <img src={newbalancebanner} alt="" />
                </div>
                <div className="swiper-slide ">
                    <img src={bannercjmocha} alt="" />
                </div>
                <div className="swiper-slide ">
                    <img src={airjordanbanner} alt="" />
                </div>
                <div className="swiper-slide ">
                    <img src={bannercj} alt="" />
                </div>
            </div>
            <div className="swiper-button-prev text-black border border-1 border-black"></div>
            <div className="swiper-button-next text-black border border-1 border-black"></div>
        </div>
        */}


        
            <div className="w-100 p-5 mb-5 bg-negro text-white text-center d-flex justify-content-evenly align-items-center">
                    <div className="col-5">
                        <h2>YEEZY</h2>
                        <h3>La mejor zapatilla esta temporada...</h3>
                        <p className="mb-5">
                            Puedes combinar estas zapatillas Yeezy con cualquier estilo streetwear. 
                            Su diseño atemporal y su silueta única las convierten en un elemento 
                            esencial para tu colección. Gracias a su tecnología innovadora, 
                            te proporcionan comodidad durante todo el día.
                        </p>
                        <a href="" className="border border-white p-3 text-decoration-none text-white">Comprar ahora</a>
                    </div>
                    <div className="col-5">
                        <img src={imageMap['Yeezy 350 V2 Carbon Beluga']} width={600}
                        style={{ transform: 'rotate(350deg)' }}
                        alt="" />
                    </div>
                </div>


            <main className="mx-1 px-5 mt-5">
                {/* SLIDER ZAPATILLAS */}
                <div className="d-flex flex-row justify-content-between align-items-end">
                    <div className="">
                        <h2 className="fw-bolder negro text-center display-6">
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
                            <div key={index} className="swiper-slide text-start">
                            <Link to={`/${producto.categoria}/${producto.marca}/${encodeURIComponent(producto.nombre)}`}>
                                <img className='imagen-producto-home' width={350} src={producto.imagen || imageMap[producto.nombre]} alt={producto.nombre} onError={(e) => { e.currentTarget.src = imageMap[producto.nombre] }} />                            
                            </Link>
                    <h5 className="fw-bold">{producto.nombre}</h5>
                                <p className="text-decoration-underline">Desde {producto.precio}€</p>
                            </div>
                        ))}
                    </div>
                    <div className="swiper-button-prev text-black border border-1 border-black"></div>
                    <div className="swiper-button-next text-black border border-1 border-black"></div>
                </div>


        
                {/* SLIDER ZAPATILLAS */}
                <div className="d-flex flex-row justify-content-between align-items-end">
                    <div className="">
                        <h2 className="fw-bolder negro text-center display-6">
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
                            <div key={index} className="swiper-slide text-start">
                            <Link to={`/${producto.categoria}/${producto.marca}/${encodeURIComponent(producto.nombre)}`}>
                                <img className='imagen-producto-home' width={350} src={producto.imagen || imageMap[producto.nombre]} alt={producto.nombre} onError={(e) => { e.currentTarget.src = imageMap[producto.nombre] }} />                            
                            </Link>
                    <h5 className="fw-bold">{producto.nombre}</h5>
                                <p className="text-decoration-underline">Desde {producto.precio}€</p>
                            </div>
                        ))}
                    </div>
                    <div className="swiper-button-prev text-black border border-1 border-black"></div>
                    <div className="swiper-button-next text-black border border-1 border-black"></div>
                </div>

                <div className="w-100 p-5 mb-5 border-2 border-dark border text-white text-center d-flex justify-content-evenly align-items-center">
                    <div className="col-5">
                        <img src={imageMap['Nike Nocta NRG RF Tee']} width={500}
                        style={{ transform: 'rotate(350deg)' }}
                        alt="" />
                    </div>
                    <div className="col-5 negro">
                        <h2>Nike x Nocta</h2>
                        <h3>La mejor camiseta esta temporada...</h3>
                        <p className="mb-5">
                            Puedes combinar estas camisetas Nocta con cualquier estilo streetwear. 
                            Su diseño atemporal y su silueta única las convierten en un elemento 
                            esencial para tu colección. Gracias a su tecnología innovadora, 
                            te proporcionan comodidad durante todo el día.
                        </p>
                        <a href="" className="border border-black p-3 text-decoration-none negro">Comprar ahora</a>
                    </div>
                </div>

            
                <div className="d-flex flex-row justify-content-between align-items-end">
                    <div className="">
                        <h2 className="fw-bolder negro text-center display-6">
                            ROPA DESTACADAS
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
                                                <Link to={`/undefined/${encodeURIComponent(producto.nombre)}`}>
                            <img className='imagen-ropa-home' width={ 200} src={imageMap[producto.nombre]} alt={producto.nombre} onError={(e) => { e.currentTarget.src = imageMap[producto.nombre] }} />                            
                            </Link>
                    <h5 className="fw-bold">{producto.nombre}</h5>
                                <p className="text-decoration-underline">Desde {producto.precio}€</p>
                            </div>
                        ))}
                    </div>
                    <div className="swiper-button-prev text-black border border-1 border-black"></div>
                    <div className="swiper-button-next text-black border border-1 border-black"></div>
                </div>
           



                <div className="row d-flex justify-content-between align-items-center mt-5">
                    <div className="col">
                        <h2 className="fw-bolder negro text-start display-6">
                            MARCAS EN TENDENCIA
                        </h2>
                    </div>
                </div>

                <div className="container-fluid marcas d-flex flex-column align-items-start m-0 mx-0">
                    <div className="row">
                        <div className="col-2 border border-1 border-black d-flex flex-column align-items-center ">
                            <img src={supremelogo} className="w-75" alt="" />
                        </div>
                        <div className="col-2 border border-1 border-black d-flex flex-column align-items-center ">
                            <img src={nikelogo} className="w-75" alt="" />
                        </div>
                        <div className="col-2 border border-1 border-black d-flex flex-column align-items-center ">
                            <img src={stussylogo} className="w-75" alt="" />
                        </div>
                        <div className="col-2 border border-1 border-black d-flex flex-column align-items-center ">
                            <img src={palacelogo} className="w-75" alt="" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2 border border-1 border-black d-flex flex-column align-items-center ">
                            <img src={yeezylogo} className="w-75" alt="" />
                        </div>
                        <div className="col-2 border border-1 border-black d-flex flex-column align-items-center ">
                            <img src={offwhitelogo} className="w-75" alt="" />
                        </div>
                        <div className="col-2 border border-1 border-black d-flex flex-column align-items-center ">
                            <img src={adidaslogo} className="w-75" alt="" />
                        </div>
                        <div className="col-2 border border-1 border-black d-flex flex-column align-items-center ">
                            <img src={mm6logo} className="w-75" alt="" />
                        </div>
                    </div>
                </div>

                <div className="row bg-black mt-5 p-5 mx-auto m-0 d-flex gap-5 justify-content-center align-items-center">
                    <div className="col-3 w-25 py-5">
                        {user ? (
                            <>
                                <h4 className="text-start text-white">
                                    Tu cupón: BIENVENIDO30
                                </h4>
                                <span className="text-light">*Para compras superiores a 49€</span>
                            </>
                        ) : (
                            <h4 className="text-start text-white">
                                Registrate ahora y obtén un descuento del -30% en tu próxima compra
                            </h4>
                        )}
                    </div>
                    <div className="col-3 w-auto p-3">
                        {user ? (
                            <>
                                <button className='fw-bold bg-white text-black p-3 px-5' onClick={handleSignOut}>Cerrar Sesión en {user.email ? cutMail(user.email) : ''}</button>
                            </>
                        ) : (
                            <>
                                <NavLink to="/register" className='nav-link fw-bold bg-white text-black p-3 px-5'>
                                    Registrate Ahora
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>

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

                <div className="row d-flex justify-content-start gap-5 mt-5">
                    <div className="col-3 info border border-black border-2 p-4">
                        <img src={original} width={30} alt="" />
                        <div>
                            <h4>SneakVault Verified</h4>
                            <p>
                                StockX Verified is our own designation and means that we inspect every item, every time.
                                StockX Verified is our own designation and means that we inspect every item, every time.Learn More
                            </p>
                        </div>
                    </div>

                    <div className="col-3 info border border-black border-2 p-4">
                        <img src={envio} width={30} alt="" />
                        <div>
                            <h4>SneakVault Verified</h4>
                            <p>
                                StockX Verified is our own designation and means that we inspect every item, every time.
                                StockX Verified is our own designation and means that we inspect every item, every time.Learn More
                            </p>
                        </div>
                    </div>
                    <div className="col-3 info border border-black border-2 p-4">
                        <img src={devolucion} width={30} alt="" />
                        <div>
                            <h4>SneakVault Verified</h4>
                            <p>
                                StockX Verified is our own designation and means that we inspect every item, every time.
                                StockX Verified is our own designation and means that we inspect every item, every time.Learn More
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Home;