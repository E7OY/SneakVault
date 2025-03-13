import '../index.css';
import { useCart } from '../context/cartContext';
import { imageMap } from '../utils/imageMap';
import mastercad from '../assets/mastercard_icon.webp';
import visa from '../assets/visa_icon.webp';
import paypal from '../assets/paypal_icon.webp';
import { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import UserContext from '../context/userContext';
import { Container, Row, Col } from 'react-bootstrap';

interface CartProps {
    toggleCart: () => void;
}

export function Cart({ toggleCart }: CartProps) {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity, totalCart } = useCart();
    const userContext = useContext(UserContext);
    const user = userContext?.user;

    return (
        <>
            {user ? (
                <Container>
                    <Row className='p-5 m-5' onClick={toggleCart}>
                        <Col xs={12} md={8} className="cart-products">
                            <h3 className='fw-semibold'>Cesta ({cart.length})</h3>
                            <ul className='list-unstyled p-0'>
                                {cart.map((product) => (
                                    <li key={product.id} className='my-5'>
                                        <div>
                                            <div className="w-100 product-details d-flex flex-column flex-md-row justify-content-around align-items-center">
                                                <img src={imageMap[product.name]} width={200} alt={product.name} />
                                                <Link to={`/${product.categoria}/${product.marca}/${product.id}`} className='text-decoration-none'>
                                                    <h5 className='w-100 fw-light text-black text-decoration-none'>
                                                        {product.name}<br />
                                                        <span className='fw-light text-black-50'>{product.price}€</span>
                                                    </h5>
                                                </Link>
                                                <h6 className='w-auto fw-light text-black'>{product.marca}</h6>
                                                <h6 className='p-3 border border-1 fw-light border-black'>{product.quantity}</h6>
                                            </div>
                                            <div className='d-flex w-100 flex-row justify-content-end gap-1 align-items-center'>
                                                <button onClick={() => decreaseQuantity(product.id)} className='p-2 px-3 fw-regular border border-1 fw-light border-black bg-transparent'>-</button>
                                                <button onClick={() => increaseQuantity(product.id)} className='p-2 px-3 fw-regular border border-1 fw-light border-black bg-transparent'>+</button>
                                                <button onClick={() => removeFromCart(product.id)} className='p-2 px-3 fw-regular border border-1 fw-light border-black bg-negro text-white'>Eliminar</button>
                                            </div>
                                        </div>
                                        <hr />
                                    </li>
                                ))}
                            </ul>
                        </Col>

                        <Col className="cart-payment">
                            <h4 className='fw-light'>Resumen</h4>
                            <h5 className='fw-light'>
                                Subtotal
                                <span className='d-inline float-end text-black-50 fw-light'>€{totalCart()} EUR</span>
                            </h5>
                            <h5 className='fw-light'>
                                Entrega
                                <span className='d-inline float-end text-black-50 fw-light'>Gratis</span>
                            </h5>
                            <hr />
                            <h4 className='fw-semibold'>
                                Total
                                <span className='d-inline float-end text-black-50 fw-light'>€{totalCart()} EUR</span>
                            </h4>

                            <button className='p-3 px-5 my-3 w-auto fw-regular border border-1 fw-light border-black bg-negro text-white'>Comprar</button>
                            <div className='d-flex flex-row justify-content-start gap-1'>
                                <img src={mastercad} className='p-1 border-1 border border-black-50' width={50} alt="imagen logo mastercard" />
                                <img src={visa} className='p-1 border-1 border border-black-50' width={50} alt="imagen logo visa" />
                                <img src={paypal} className='p-1 border-1 border border-black-50' width={50} alt="imagen logo paypal" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            ) : (
                <Navigate to="/register" />
            )}
        </>
    );
}