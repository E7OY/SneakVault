import React, { useEffect } from 'react';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import offwhite from '../assets/off-white.png';
import jordan1 from '../assets/jordan1.png';
import yeezy from '../assets/yeezy.png';
import campus from '../assets/campus.png';
import jordanretro from '../assets/jordanretro.png';

import supreme1 from '../assets/supreme1.jpg';
import fftcent from '../assets/50cent.jpg';
import jordan from '../assets/jordan.jpg';
import nikeaircactus from '../assets/nikeaircactus.jpg';
import nikejordan from '../assets/nikejordan.jpg';
import stussy90s from '../assets/stussy90s.jpg';
import stussy90s1 from '../assets/stussy90s1.jpg';




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
            slidesPerView: 4,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }, []);
    const images = [supreme1, fftcent, nikeaircactus, jordan, stussy90s1, nikejordan, stussy90s];

    return (
        <>



            <div className="row">
                <div className="col-12">
                    <h1 className='fw-bold negro text-start'>DESCUBRE ZAPATILLAS LIMITADAS SIN LIMITACIÓN</h1>
                </div>
            </div>
            <div className="swiper swiper-hero">
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
                </div>
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
            </div>


            <div className="row mt-5">
                <div className="col-12">
                    <h1 className='fw-bold negro text-start'>PASIÓN POR EL STREETWEAR</h1>
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
                    Hypebeast culture is a subgenre of
                    streetwear culture—a clothing style that
                    emerged from Californian surf and skateboard
                    lifestyle. Hypebeast generally refers to a
                    person who is devoted to acquiring
                    fashionable items, especially clothing and
                    shoes. To satisfy your fashion need,
                    HYPEBIZZ are here. The one and only place
                    with dozens of high-end, street wear,
                    fashionable sneaker brands come are here
                    waiting for you to Cop “em down!

                    From 70's to Travis, We got you all covered.
                </p>
            </div>
            



        </>
    );
};

export default Home;