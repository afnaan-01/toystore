"use client";

import { createContext, useContext, useState } from "react";


const CartContext = createContext();

const CartProvider = ({children})=>{

    const [cartItems, setCartItems] = useState([]);
    const [cartPrice, setCartPrice] = useState(0);

    const addToCart = (productId) =>{
        const existingItem = cartItems.find(item => item.id === productId);
        if (existingItem) {
            setCartItems(cartItems.map(item => 
                item.id === productId ? {...item, quantity: item.quantity + 1} : item
            ));
        } else {
            setCartItems([...cartItems, {id: productId, quantity: 1}]);
        }
    }

    return(
        <CartContext.Provider value={{cartItems, setCartItems, addToCart}} >
            {children}
        </CartContext.Provider>
    )
}

const useCart = () => useContext(CartContext);

export default useCart;

export { CartProvider, CartContext };