"use client";


import React from 'react';
import useCart from '@/allContext/cart';

const App = () => {
  const { cartItems } = useCart();

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is currently empty.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              Product ID: {item.id}, Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;