import '../index.css';
import { useCart } from '../context/cartContext';
import { imageMap } from '../utils/imageMap';
import mastercad from '../assets/mastercard_icon.jpg';
import visa from '../assets/visa_icon.png';
import paypal from '../assets/paypal_icon.png';


interface CartProps {
    toggleCart: () => void;
}

export function Cart({ toggleCart }: CartProps) {

    const { cart, removeFromCart, increaseQuantity, decreaseQuantity, totalCart } = useCart();

    return (
        <div className="cart-backdrop" onClick={toggleCart}>
            <aside className='cart' onClick={(e) => e.stopPropagation()}>
                <h4 className='fw-bold'>Cesta  ({cart.length})</h4>
                <ul className='list-unstyled p-0'>
                    {cart.map((product) => (
                        <li key={product.id} className='my-5'>
                            <div>
                                <div className="w-100 product-details d-flex flex-row justify-content-around align-items-center float-start">
                                    <img src={imageMap[product.name]} width={150} alt={product.name} />
                                    <h6 className='w-50'>{product.name}
                                    <h6 className='fw-light'>{product.price}€</h6></h6>
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

                <h4 className='fw-regular'>Total<h4 className='d-inline float-end'> €{totalCart()} EUR</h4>

                </h4>
                <button className='p-3 px-5 my-3 fw-regular border border-1 fw-light border-black bg-negro text-white'>Comprar</button>
                <div className='d-flex flex-row gap-1'>
                    <img src={mastercad} className='p-1 border-1 border border-black-50' width={50} alt="" />
                    <img src={visa} className='p-1 border-1 border border-black-50' width={50} alt="" />
                    <img src={paypal} className='p-1 border-1 border border-black-50' width={50} alt="" />
                </div>
            </aside>
        </div>
    );
}