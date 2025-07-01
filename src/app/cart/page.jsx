"use client";


import React, { useEffect, useState } from 'react';
import useCart from '@/allContext/cart';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import axios from 'axios';
import { handleIncrement, handleDecrement } from '@/helper/productHelper';
import { Minus, Plus } from 'lucide-react';

const App = () => {
  const { cartItems, setCartItems, removeCart } = useCart();
  const [cartProducts, setCartProducts] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    async function fetchProduct() {
      try {
        console.log(cartItems);
        const response = await axios.post(`/api/fatch-multiple-product`, cartItems);
        console.log("Response", response.data);
        const mergedArray = response.data.products.map((product) => {
          const pr = cartItems.find(p => p.id == product._id);

          return product ? { ...product, quantity: pr.quantity } : null;
        })
        setCartProducts(mergedArray);
      } catch (error) {
        toast.error("Failed to load product");
        console.log("Error", error);
      } finally {
        setLoader(false);
      }
    }

    if (cartItems.length > 0) {
      fetchProduct();
    }

  }, [cartItems]);

  const router = useRouter();

  return (
    <>
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-8 text-center">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500">
            Your cart is empty.
            <Link href="/shop" className="text-blue-600 underline ml-2">
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-6">
              {cartProducts.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 bg-white rounded shadow-sm"
                >
                  <img
                    src={item?.images[0]}
                    alt={item?.productName}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item?.productName}</h3>
                    <p className="text-gray-500 text-sm mt-1">₹{item?.finalPrice}</p>

                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm text-gray-500">Qty:</span>
                      {/* Your quantity update logic here */}
                      <button
                        type="button"
                        onClick={() => handleDecrement(item._id, setCartItems)}
                        className="p-1 border rounded"
                      >
                        <Minus size={16} />
                      </button>
                      <input
                        type="number"
                        value={item?.quantity}
                        onChange={(e) => { }}
                        className="w-14 text-center border rounded appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                      />

                      <button
                        type="button"
                        onClick={() => handleIncrement(item._id, setCartItems)}
                        className="p-1 border rounded"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-700">
                      ₹{item?.quantity * item?.finalPrice}
                    </p>
                    <button
                      onClick={() => removeCart(item._id)}
                      className="text-red-500 text-sm hover:underline mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white p-6 rounded shadow-sm h-fit">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Order Summary
              </h2>
              <div className="flex justify-between text-sm mb-2">
                <span>Subtotal</span>
                <span>₹{cartProducts?.reduce((acc, item) => acc + Number(item.finalPrice) * Number(item.quantity), 0)}</span>
              </div>
              <div className="flex justify-between text-sm mb-4">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{cartProducts?.reduce((acc, item) => acc + item.finalPrice * item.quantity, 0)}</span>
              </div>

              <button
                onClick={() => router.push(`/checkout/cart/${cartProducts.length}`)}
                className="block w-full mt-6 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all text-center text-sm"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => router.push('/')}
                className="block mt-3 text-center text-blue-600 text-sm hover:underline w-full"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default App;