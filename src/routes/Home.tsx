import React, { useEffect } from 'react';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import offwhite from '../assets/off-white.png';
import jordan1 from '../assets/jordan1.png';
import yeezy from '../assets/yeezy.png';
import campus from '../assets/campus.png';
import jordanretro from '../assets/jordanretro.png';
import offwhitenike from '../assets/offwhitenike.png';
import jordanfrozen from '../assets/jordanfrozen.png';
import yeezyblack from '../assets/yeezyblack.png';
import nikexstussy from '../assets/nikexstussy.png';

import supreme1 from '../assets/supreme1.jpg';
import fftcent from '../assets/50cent.jpg';
import jordan from '../assets/jordan.jpg';
import nikeaircactus from '../assets/nikeaircactus.jpg';
import nikejordan from '../assets/nikejordan.jpg';
import stussy90s from '../assets/stussy90s.jpg';
import stussy90s1 from '../assets/stussy90s1.jpg';

import supremelogo from '../assets/supremelogo.png';
import nikelogo from '../assets/nikelogo.png';
import stussylogo from '../assets/stussylogo.png';
import palacelogo from '../assets/palacelogo.png';
import yeezylogo from '../assets/yeezylogo.png';
import offwhitelogo from '../assets/offwhitelogo.png';
import mm6logo from '../assets/mm6logo.png';

import offwhiteshirt from '../assets/offwhiteshirt.png';
import supremeshirt from '../assets/supremeshirt.png';
import offwhiteshirtblack from '../assets/offwhiteshirtblack.png';
import nikeshirt from '../assets/nikeshirt.png';
import suprememm6 from '../assets/suprememm6.png';
import jordanshirt from '../assets/jordanshirt.png';
import palaceshirt from '../assets/palaceshirt.png';
import palacelongsleeve from '../assets/palacelongsleeve.png';


import '../index.css';

const Home = () => {
    useEffect(() => {
        const swiper = new Swiper('.swiper-hero', {
            direction: 'horizontal',
            loop: true,
            autoplay: {
                delay: 2000,
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
            },
            slidesPerView: 5,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }, []);
    const images = [supreme1, fftcent, nikeaircactus, jordan, stussy90s1, nikejordan, stussy90s];

    return (
        <>



            <div className="row p-0 m-0 mb-2">
                <div className="col-12 m-0">
                    <h1 className='fw-bold negro'>DESCUBRE ZAPATILLAS LIMITADAS SIN LIMITACIÓN</h1>
                </div>
            </div>
            { /* SLIDER ZAPATILLAS */}
            <div className="row d-flex justify-content-between align-items-center">
                <div className="col">
                    <h2 className='fw-bolder negro text-start display-6'>ZAPATILLAS DESTACADAS</h2>
                </div>
                <div className="col text-end">
                    <button className='button fw-bolder'>VER MÁS</button>
                </div>
            </div>
            <div className="swiper swiper-hero mb-5">
                <div className="swiper-wrapper">
                    <div className="swiper-slide border border-1 border-dark text-start">
                        <img src={offwhite} alt="" />
                        <h5 className='fw-bold'>Nike Air Force 1 x Louis Vuitton</h5>
                        <p className='text-decoration-underline'>Desde 6.900€</p>
                    </div>
                    <div className="swiper-slide border border-1 border-dark text-start">
                        <img src={jordan1} alt="" />
                        <h5 className='fw-bold'>Air Jordan 1 x Cactus Jack</h5>
                        <p className='text-decoration-underline'>Desde 2.500€</p>
                    </div>
                    <div className="swiper-slide border border-1 border-dark text-start">
                        <img src={yeezy} alt="" />
                        <h5 className='fw-bold'>Yeezy Foam</h5>
                        <p className='text-decoration-underline'>Desde 200€</p>
                    </div>
                    <div className="swiper-slide border border-1 border-dark text-start">
                        <img src={campus} alt="" />
                        <h5 className='fw-bold'>Adidas Campus x Bad Bunny</h5>
                        <p className='text-decoration-underline'>Desde 240€</p>
                    </div>
                    <div className="swiper-slide border border-1 border-dark text-start">
                        <img src={jordanretro} alt="" />
                        <h5 className='fw-bold'>Jordan Retro Canyon Purple</h5>
                        <p className='text-decoration-underline'>Desde 400€</p>
                    </div>
                    <div className="swiper-slide border border-1 border-dark text-start">
                        <img src={offwhitenike} alt="" />
                        <h5 className='fw-bold'>Air Force 1 Mid x Off-White</h5>
                        <p className='text-decoration-underline'>Desde 179,90€</p>
                    </div>
                    <div className="swiper-slide border border-1 border-dark text-start">
                        <img src={jordanfrozen} alt="" />
                        <h5 className='fw-bold'>Jordan Frozen Moments</h5>
                        <p className='text-decoration-underline'>Desde 550€</p>
                    </div>
                    <div className="swiper-slide border border-1 border-dark text-start">
                        <img src={yeezyblack} alt="" />
                        <h5 className='fw-bold'>Yeezy Boost 700 V3</h5>
                        <p className='text-decoration-underline'>Desde 400€</p>
                    </div>
                    <div className="swiper-slide border border-1 border-dark text-start">
                        <img src={nikexstussy} alt="" />
                        <h5 className='fw-bold'>Nike Air Zoom x Stussy</h5>
                        <p className='text-decoration-underline'>Desde 1.800€</p>
                    </div>
                </div>
                <div className="swiper-button-prev text-black border border-1 border-black"></div>
                <div className="swiper-button-next text-black border border-1 border-black"></div>
            </div>


            { /* SLIDER ROPA */}
            <div className="row d-flex justify-content-between align-items-center mt-5">
                <div className="col">
                    <h2 className='fw-bolder negro text-start display-6'>ROPA EN TENDENCIA</h2>
                </div>
                <div className="col text-end">
                    <button className='button fw-bolder'>VER MÁS</button>
                </div>
            </div>
            <div className="swiper swiper-hero">
                <div className="swiper-wrapper">
                    <div className="swiper-slide border border-1 border-dark text-start">
                        <img src={offwhiteshirt} alt="" />
                        <h5 className='fw-bold'>Off-White camiseta shared logo</h5>
                        <p className='text-decoration-underline'>Desde 300€</p>
                    </div>
                    <div className="swiper-slide border border-1 border-dark text-start">
                        <img src={supremeshirt} alt="" />
                        <h5 className='fw-bold'>Supreme x Undercover face</h5>
                        <p className='text-decoration-underline'>Desde 150€</p>
                    </div>
                    <div className="swiper-slide border border-1 border-dark text-start">
                        <img src={nikeshirt} alt="" />
                        <h5 className='fw-bold'>Nike x Commes des Garcons</h5>
                        <p className='text-decoration-underline'>Desde 150€</p>
                    </div>
                    <div className="swiper-slide border border-1 border-dark text-start">
                        <img src={offwhiteshirtblack} alt="" />
                        <h5 className='fw-bold'>Off-White black t-shirt</h5>
                        <p className='text-decoration-underline'>Desde 250€</p>
                    </div>
                    <div className="swiper-slide border border-1 border-dark text-start">
                        <img src={jordanshirt} alt="" />
                        <h5 className='fw-bold'>Camiseta Off-White x Jordan</h5>
                        <p className='text-decoration-underline'>Desde 105€</p>
                    </div>
                    <div className="swiper-slide border border-1 border-dark text-start">
                        <img src={suprememm6} alt="" />
                        <h5 className='fw-bold'>Camiseta Supreme x MM6</h5>
                        <p className='text-decoration-underline'>Desde 550€</p>
                    </div>
                    <div className="swiper-slide border border-1 border-dark text-start">
                        <img src={palaceshirt} alt="" />
                        <h5 className='fw-bold'>Palace x Oakley T-Shirt</h5>
                        <p className='text-decoration-underline'>Desde 130</p>
                    </div>
                    <div className="swiper-slide border border-1 border-dark text-start">
                        <img src={palacelongsleeve} alt="" />
                        <h5 className='fw-bold'>Palace x Carhartt WIP</h5>
                        <p className='text-decoration-underline'>Desde 150€</p>
                    </div>
                </div>
                <div className="swiper-button-prev text-black border border-1 border-black"></div>
                <div className="swiper-button-next text-black border border-1 border-black"></div>
            </div>




            <div className="row d-flex justify-content-between align-items-center mt-5">
                <div className="col">
                    <h2 className='fw-bolder negro text-start display-6'>MARCAS EN TENDENCIA</h2>
                </div>
            </div>

            <div className="container-fluid marcas d-flex flex-column align-items-center m-0 mx-0">
            <div className="row">
            <div className="col-3 border border-1 border-black d-flex flex-column align-items-center ">
                    <img src={supremelogo} className='w-75' alt="" />
                </div>
                <div className="col-3 border border-1 border-black d-flex flex-column align-items-center ">
                <img src={nikelogo} className='w-75' alt="" />
                </div>
                <div className="col-3 border border-1 border-black d-flex flex-column align-items-center ">
                <img src={stussylogo} className='w-75' alt="" />
                </div>
                <div className="col-3 border border-1 border-black d-flex flex-column align-items-center ">
                <img src={palacelogo} className='w-75' alt="" />
                </div>
            </div>
            <div className="row">
            <div className="col-3 border border-1 border-black d-flex flex-column align-items-center ">
            <img src={yeezylogo} className='w-75' alt="" />
                </div>
                <div className="col-3 border border-1 border-black d-flex flex-column align-items-center ">
                <img src={offwhitelogo} className='w-75' alt="" />
                </div>
                <div className="col-3 border border-1 border-black d-flex flex-column align-items-center ">
                <img src={yeezylogo} className='w-75' alt="" />
                </div>
                <div className="col-3 border border-1 border-black d-flex flex-column align-items-center ">
                <img src={mm6logo} className='w-75' alt="" />
                </div>
            </div>
            </div>


            <div className="row mt-5">
                <div className="col-12">
                    <h1 className='fw-bold negro text-start'>PASIÓN POR EL HYPEBEAST</h1>
                </div>
            </div>
            <div className="container ">
                <div className="collage-grid">
                    {images.map((image, index) => (
                        <div key={index} className="collage-item">
                            <img src={image} className="collage-img" alt={`image-${index}`} />
                        </div>
                    ))}
                </div>
            </div>


            <div className="row bg-black mt-5 mb-3 py-5">
                <p className='text-center w-50 mx-auto text-white'>
                La cultura hypebeast es un subgénero de la cultura streetwear, un estilo de ropa 
                que surgió del estilo de vida californiano del surf y el monopatín. Hypebeast 
                generalmente se refiere a una persona que se dedica a la adquisición de artículos 
                de moda, especialmente ropa y zapatos. Para satisfacer tu necesidad de moda, 
                SneakVault está aquí. ¡El único lugar con docenas de marcas de zapatillas de alta 
                gama, ropa de calle y de moda están aquí esperando a que Cop «em down! De los 70
                 a Travis, tenemos todo cubierto.
                </p>
            </div>




        </>
    );
};

export default Home;