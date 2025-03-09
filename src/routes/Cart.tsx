import '../index.css';
import { useCart } from '../context/cartContext';
import { imageMap } from '../utils/imageMap';
import mastercad from '../assets/mastercard_icon.webp';
import visa from '../assets/visa_icon.webp';
import paypal from '../assets/paypal_icon.webp';
import { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import UserContext from '../context/userContext';
import { Container } from 'react-bootstrap';

interface CartProps {
    toggleCart: () => void;
}


export function Cart({ toggleCart }: CartProps) {

    const { cart, removeFromCart, increaseQuantity, decreaseQuantity, totalCart } = useCart();
    const userContext = useContext(UserContext);
    const user = userContext?.user;

    return (
        <>
            {user ?

        <Container>


            <div className='d-flex flex-row p-5   m-5'  onClick={toggleCart}>

                <div className="col-8 cart-products">
                    <h3 className='fw-semibold'>Cesta  ({cart.length})</h3>
                    <ul className='list-unstyled p-0'>
                        {cart.map((product) => (
                            <li key={product.id} className='my-5'>
                                <div>
                                    <div className="w-100 product-details d-flex flex-row justify-content-around align-items-center float-start">
                                        <img src={imageMap[product.name]} width={200} alt={product.name} />
                                        
                                        <Link to={`/${product.categoria}/${product.marca}/${product.id}`} className=' text-decoration-none'>
                                        <h5 className='w-auto fw-light text-black text-decoration-none'>{product.name}
                                        <h5 className='fw-light text-black-50'>{product.price}€</h5>
                                        </h5>
                                        </Link>
                                        <h6 className='w-auto fw-light text-black'>{product.marca}</h6>
                                        <h6 className='p-3 border border-1 fw-light border-black float-end'>{product.quantity}</h6>
                                    </div>
                                    <div className='d-flex w-100 flex-row justify-content-end gap-1 align-items-center'>
                                        <button onClick={() => decreaseQuantity(product.id)} className='p-2 px-3 fw-regular border border-1 fw-light border-black bg-transparent'>-</button>
                                        <button onClick={() =>  increaseQuantity(product.id)} className='p-2 px-3 fw-regular border border-1 fw-light border-black bg-transparent'>+</button>
                                        <button onClick={() => removeFromCart(product.id)} className='p-2 px-3 fw-regular border border-1 fw-light border-black bg-negro text-white'>Eliminar</button>
                                    </div>
                                </div>
                                <hr />
                            </li>
                            
                        ))}
                    </ul>
                </div>

                <div className="col-4 cart-payment">
                    <h4 className='fw-light'>Resumen</h4>
                    <h5 className='fw-light'>Subtotal<h5 className='d-inline float-end text-black-50 fw-light'> €{totalCart()} EUR</h5></h5>
                    <h5 className='fw-light'>Entrega<h5 className='d-inline float-end text-black-50 fw-light'>Gratis</h5></h5>
                    <hr />
                    <h4 className='fw-semibold'>Total<h4 className='d-inline float-end text-black-50 fw-light'>€{totalCart()} EUR</h4></h4>


                    <button className='p-3 px-5 my-3 w-100 fw-regular border border-1 fw-light border-black bg-negro text-white'>Comprar</button>
                    <div className='d-flex flex-row justify-content-start gap-1'>
                        <img src={mastercad} className='p-1 border-1 border border-black-50' width={50} alt="imagen logo mastercard"/>
                        <img src={visa} className='p-1 border-1 border border-black-50' width={50} alt="imagen logo visa"/>
                        <img src={paypal} className='p-1 border-1 border border-black-50' width={50} alt="imagen logo paypal"/>
                    </div>
                </div>

            </div>

        </Container>


    :
    <Navigate to="/register" />
    }
        </>
    );
}
