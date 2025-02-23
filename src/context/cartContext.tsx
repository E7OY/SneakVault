//contexto global para poder manejar el estado del carrito en toda la app

import { createContext, useState, useContext } from 'react';

interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartContextProps {
    cart: CartItem[];
    addToCart: (product: { id: string; name: string; price: number; image: string }) => void;
    removeFromCart: (productId: string) => void;
    increaseQuantity: (productId: string) => void;
    decreaseQuantity: (productId: string) => void;
    totalCart: () => number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    //añadir producto
    const addToCart = (product: { id: string; name: string; price: number; image: string }) => {
        const existingProductIndex = cart.findIndex((item) => item.id === product.id);
        //si el producto ya existe en el carrito, aumentar la cantidad
        if (existingProductIndex !== -1) {
            const newCart = [...cart];
            newCart[existingProductIndex].quantity += 1;
            setCart(newCart);
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    //elimiar producto
    const removeFromCart = (productId: string) => {
        //filtrar el producto a eliminar del carrito por su id y actualizar el carrito
        const newCart = cart.filter((item) => item.id !== productId);
        setCart(newCart);
    };

    //aimentar cantidad de producto
    const increaseQuantity = (productId: string) => {
        const newCart = cart.map((item) =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(newCart);
    };

    //disminuir cantidad de producto
    const decreaseQuantity = (productId: string) => {
        //mapeamos el carrito y disminuimos la cantidad del producto si es mayor a 1
        const newCart = cart.map((item) =>
            item.id === productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
        );
        setCart(newCart);
    };

    //calculo total producto
    const totalCart = () => {
        //.reduce funciona como un iterador que recorre el carrito y va sumando el precio de cada producto
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    //provider que nos permite usar el contexto global con las funciones y el estado
    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, totalCart }}>
            {children}
        </CartContext.Provider>
    );
};

//el hook para poder user el contexto global
export const useCart = () => {
    const context = useContext(CartContext);
    return context;
};