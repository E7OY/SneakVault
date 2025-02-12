import  { useContext, useEffect } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import 'bootstrap/dist/css/bootstrap.min.css';

import offwhite from "../assets/off-white.png";
import jordan1 from "../assets/jordan1.png";
import yeezy from "../assets/yeezy.png";
import campus from "../assets/campus.png";
import jordanretro from "../assets/jordanretro.png";
import offwhitenike from "../assets/offwhitenike.png";
import jordanfrozen from "../assets/jordanfrozen.png";
import yeezyblack from "../assets/yeezyblack.png";
import nikexstussy from "../assets/nikexstussy.png";

import supreme1 from "../assets/supreme1.jpg";
import fftcent from "../assets/50cent.jpg";
import jordan from "../assets/jordan.jpg";
import nikeaircactus from "../assets/nikeaircactus.jpg";
import nikejordan from "../assets/nikejordan.jpg";
import stussy90s from "../assets/stussy90s.jpg";
import stussy90s1 from "../assets/stussy90s1.jpg";
import travis1 from "../assets/travis1.png";
import travis2 from "../assets/travis2.png";
import travis3 from "../assets/travis3.png";


import supremelogo from "../assets/supremelogo.png";
import nikelogo from "../assets/nikelogo.png";
import stussylogo from "../assets/stussylogo.png";
import palacelogo from "../assets/palacelogo.png";
import yeezylogo from "../assets/yeezylogo.png";
import offwhitelogo from "../assets/offwhitelogo.png";
import mm6logo from "../assets/mm6logo.png";
import adidaslogo from "../assets/adidaslogo.png";

import offwhiteshirt from "../assets/offwhiteshirt.png";
import supremeshirt from "../assets/supremeshirt.png";
import offwhiteshirtblack from "../assets/offwhiteshirtblack.png";
import nikeshirt from "../assets/nikeshirt.png";
import suprememm6 from "../assets/suprememm6.png";
import jordanshirt from "../assets/jordanshirt.png";
import palaceshirt from "../assets/palaceshirt.png";
import palacelongsleeve from "../assets/palacelongsleeve.png";

import shoksnike from "../assets/shoksnike.jpg";
import newbalancebanner from "../assets/newbalancebanner.jpg";
import adidasbanner from "../assets/adidasbanner.jpg";
import airjordanbanner from "../assets/airjordanbanner.jpg";
import bannercj from "../assets/banner-cj.png";
import bannercjmocha from "../assets/banner-cj-mocha.png";


import original from "../assets/original.png";
import envio from "../assets/envios.png";
import devolucion from "../assets/devolucion.png";



import '../index.css';
import { Link, NavLink } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import UserContext from '../context/userContext';



const Home = () => {
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

            <main className="mx-1 px-5">
                {/* SLIDER ZAPATILLAS */}
                <div className="d-flex flex-row justify-content-between align-items-end">
                    <div className="">
                        <h2 className="fw-bolder negro text-center display-6">
                            ZAPATILLAS DESTACADAS
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
                        <div className="swiper-slide text-start">
                            <img src={offwhite} alt="" />
                            <h5 className="fw-bold">Nike Air Force 1 x Louis Vuitton</h5>
                            <p className="text-decoration-underline">Desde 6.900€</p>
                        </div>
                        <div className="swiper-slide text-start">
                            <img src={jordan1} alt="" />
                            <h5 className="fw-bold">Air Jordan 1 x Cactus Jack</h5>
                            <p className="text-decoration-underline">Desde 2.500€</p>
                        </div>
                        <div className="swiper-slide text-start">
                            <img src={yeezy} alt="" />
                            <h5 className="fw-bold">Yeezy Foam</h5>
                            <p className="text-decoration-underline">Desde 200€</p>
                        </div>
                        <div className="swiper-slide text-start">
                            <img src={campus} alt="" />
                            <h5 className="fw-bold">Adidas Campus x Bad Bunny</h5>
                            <p className="text-decoration-underline">Desde 240€</p>
                        </div>
                        <div className="swiper-slide text-start">
                            <img src={jordanretro} alt="" />
                            <h5 className="fw-bold">Jordan Retro Canyon Purple</h5>
                            <p className="text-decoration-underline">Desde 400€</p>
                        </div>
                        <div className="swiper-slide text-start">
                            <img src={offwhitenike} alt="" />
                            <h5 className="fw-bold">Air Force 1 Mid x Off-White</h5>
                            <p className="text-decoration-underline">Desde 179,90€</p>
                        </div>
                        <div className="swiper-slide text-start">
                            <img src={jordanfrozen} alt="" />
                            <h5 className="fw-bold">Jordan Frozen Moments</h5>
                            <p className="text-decoration-underline">Desde 550€</p>
                        </div>
                        <div className="swiper-slide text-start">
                            <img src={yeezyblack} alt="" />
                            <h5 className="fw-bold">Yeezy Boost 700 V3</h5>
                            <p className="text-decoration-underline">Desde 400€</p>
                        </div>
                        <div className="swiper-slide text-start">
                            <img src={nikexstussy} alt="" />
                            <h5 className="fw-bold">Nike Air Zoom x Stussy</h5>
                            <p className="text-decoration-underline">Desde 1.800€</p>
                        </div>
                    </div>
                    <div className="swiper-button-prev text-black border border-1 border-black"></div>
                    <div className="swiper-button-next text-black border border-1 border-black"></div>
                </div>

                {/* SLIDER ROPA */}
                <div className="d-flex flex-row justify-content-between align-items-end">
                    <div className="">
                        <h2 className="fw-bolder negro text-center display-6">
                            NUEVA COLECCION
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
                <div className="swiper swiper-hero">
                    <div className="swiper-wrapper">
                    <div className="swiper-slide text-start">
                    <img src={offwhiteshirt} alt="" />
                            <h5 className="fw-bold">Off-White camiseta shared logo</h5>
                            <p className="text-decoration-underline">Desde 300€</p>
                        </div>
                        <div className="swiper-slide text-start">
                            <img src={supremeshirt} alt="" />
                            <h5 className="fw-bold">Supreme x Undercover face</h5>
                            <p className="text-decoration-underline">Desde 150€</p>
                        </div>
                        <div className="swiper-slide text-start">
                            <img src={nikeshirt} alt="" />
                            <h5 className="fw-bold">Nike x Commes des Garcons</h5>
                            <p className="text-decoration-underline">Desde 150€</p>
                        </div>
                        <div className="swiper-slide text-start">
                            <img src={offwhiteshirtblack} alt="" />
                            <h5 className="fw-bold">Off-White black t-shirt</h5>
                            <p className="text-decoration-underline">Desde 250€</p>
                        </div>
                        <div className="swiper-slide text-start">
                            <img src={jordanshirt} alt="" />
                            <h5 className="fw-bold">Camiseta Off-White x Jordan</h5>
                            <p className="text-decoration-underline">Desde 105€</p>
                        </div>
                        <div className="swiper-slide text-start">
                            <img src={suprememm6} alt="" />
                            <h5 className="fw-bold">Camiseta Supreme x MM6</h5>
                            <p className="text-decoration-underline">Desde 550€</p>
                        </div>
                        <div className="swiper-slide text-start">
                            <img src={palaceshirt} alt="" />
                            <h5 className="fw-bold">Palace x Oakley T-Shirt</h5>
                            <p className="text-decoration-underline">Desde 130€</p>
                        </div>
                        <div className="swiper-slide text-start">
                            <img src={palacelongsleeve} alt="" />
                            <h5 className="fw-bold">Palace x Carhartt WIP</h5>
                            <p className="text-decoration-underline">Desde 150€</p>
                        </div>
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
                        {/*
                        La cultura hypebeast es un subgénero de la cultura streetwear, un
                        estilo de ropa que surgió del estilo de vida californiano del surf y
                        el monopatín. Hypebeast generalmente se refiere a una persona que se
                        dedica a la adquisición de artículos de moda, especialmente ropa y
                        zapatos. Para satisfacer tu necesidad de moda, SneakVault está aquí.
                        ¡El único lugar con docenas de marcas de zapatillas de alta gama,
                        ropa de calle y de moda están aquí esperando a que Cop «em down! De
                        los 70 a Travis, tenemos todo cubierto.
                        */}
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
