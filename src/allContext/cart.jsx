"use client";

import { createContext, useContext, useEffect, useState } from "react";


const CartContext = createContext();

const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);
    const [cartPrice, setCartPrice] = useState(0);

    useEffect(() => {

        const localData = localStorage.getItem('cartItems');

        if (localData) {
            setCartItems(JSON.parse(localData));
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (productId) => {
        const existingItem = cartItems.find(item => item.id === productId);
        if (existingItem) {
            setCartItems(cartItems.map(item =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCartItems([...cartItems, { id: productId, quantity: 1 }]);
        }
    }
    const removeCart = (productId) => {
            setCartItems(cartItems.filter(item => item.id !== productId ));
    }

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, addToCart, removeCart }} >
            {children}
        </CartContext.Provider>
    )
}

const useCart = () => useContext(CartContext);

export default useCart;

export { CartProvider, CartContext };