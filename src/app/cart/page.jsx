"use client";


import React from 'react';
import useCart from '@/allContext/cart';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const App = () => {
  const { cartItems } = useCart();

  const router = useRouter();

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
          <Button variant={"buynow"} onClick={()=> router.push(`/checkout/cart/0`)}>Buy Now</Button>
        </ul>
      )}
    </div>
  );
};

export default App;