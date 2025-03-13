//contexto global para poder manejar el estado del carrito en toda la app

    import { createContext, useState, useContext, useEffect } from 'react';

    interface CartItem {
        id: string;
        name: string;
        price: number;
        image: string;
        quantity: number;
        stock: number;
        categoria: string;
        marca: string;
    }
    
    interface CartContextProps {
        cart: CartItem[];
        setCart: (cart: CartItem[]) => void;
        addToCart: (product: { id: string; name: string; price: number; image: string; stock: number; categoria: string; marca: string }) => void;
        removeFromCart: (productId: string) => boolean;
        increaseQuantity: (productId: string) => void;
        decreaseQuantity: (productId: string) => void;
        totalCart: () => number;
        clearCart: () => void;
    }
    
    const CartContext = createContext<CartContextProps | undefined>(undefined);
    
    export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
        const [cart, setCart] = useState<CartItem[]>(() => {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        });
    
        useEffect(() => {
            localStorage.setItem('cart', JSON.stringify(cart));
        }, [cart]);
    
    //AÑADIR PRODUCTO
    const addToCart = (product: { id: string; name: string; price: number; image: string; stock: number; categoria: string; marca: string }) => {
        //crear una copia del carrito
        const updatedCart = [...cart];
        //comprobar si el producto existe en el carro
        const productExists = updatedCart.find(item => item.id === product.id);

        if (productExists) {
            //si existe aumenta cantidad
            productExists.quantity += 1;
        } else {
            //si no, añadimos como nuevo 
            updatedCart.push({ ...product, quantity: 1 });
        }

        setCart(updatedCart);
    };
    
    //ELIMINAR PRODUCTO
    const removeFromCart = (productId: string) => {
        if (window.confirm("¿Seguro que quieres eliminar este producto del carrito?")) {
            //filtramos el carrito para que no incluya el producto que queremos eliminar
            const updatedCart = cart.filter(item => item.id !== productId);
            setCart(updatedCart);
            return true;
        }
        return false;
    };
    
    //AUMENTAR CANTIDAD DE PRODUCTO
    const increaseQuantity = (productId: string) => {
        //crear una copia del carrito
        const updatedCart = [...cart];
        //encontrar el producto que queremos modificar
        const productToUpdate = updatedCart.find(item => item.id === productId);
        //if encontramos el producto, aumentamos su cantidad
        if (productToUpdate) {
            productToUpdate.quantity += 1;
            setCart(updatedCart);
        }
    };
    
    //DISMINUIR CANTIDAD DE PRODUCTO
    const decreaseQuantity = (productId: string) => {
        //crear una copia del carrito
        const updatedCart = [...cart];
        //encontrar el producto que queremos modificar
        const productToUpdate = updatedCart.find(item => item.id === productId);
        //if encontramos el producto, reducimos cantidad, comprbando si es mayor a 1
        if (productToUpdate && productToUpdate.quantity > 1) {
            productToUpdate.quantity -= 1;
            setCart(updatedCart);
        }
    };
    
    //TOTAL DEL CARRITO
    const totalCart = () => {
        let total = 0;
        for (const item of cart) {
            const productTotal = item.price * item.quantity;
            total += productTotal;
        }
        //se puede hacer con .reduce que equivale a un for
        //return cart.reduce((total, item) => total + item.price * item.quantity, 0);
        return total;
    };
    
    //LIMPIAR CARRITO
    const clearCart = () => {
        setCart([]);
    };
    
    //provider que nos permite usar el contexto global con las funciones y el estado
        return (
            <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, totalCart, clearCart }}>
                {children}
            </CartContext.Provider>
        );
    };
    
    //el hook para poder user el contexto global
    export const useCart = () => useContext(CartContext);
    export default CartContext;