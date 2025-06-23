"use client";

import { useState, useEffect, use } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function CheckoutPage({ params }) {

  const { id, quantity } = use(params);

  const { register, handleSubmit, reset } = useForm();
  const [orderProduct, setOrderProduct] = useState();

  const [placingOrder, setPlacingOrder] = useState(false);


  //Fetch Product
  useEffect(() => {

    const fetchProducts = async () => {
      try {
        console.log(id);
        const res = await axios.get(`/api/fatch-single-product/${id}`);
        console.log('Fetched data:', res.data.product);
        setOrderProduct(res.data.product || {});
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };
    fetchProducts();
  }, []);

  // const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const onSubmit = (data) => {
    setPlacingOrder(true);
    console.log("Form Data:", data);

    const order = {
      customer: data,
      product: orderProduct._id
    }

    setTimeout(() => {
      alert("✅ Order placed successfully!");
      setPlacingOrder(false);
      console.log("Order Data:", order);
    }, 2000);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping Details */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

          <div className="space-y-4">
            <input {...register("name", { required: true })} placeholder="Full Name" className="w-full border rounded p-2" required />
            <input type="email" {...register("email", { required: true })} placeholder="Email" className="w-full border rounded p-2" required />
            <input {...register("address", { required: true })} placeholder="Address" className="w-full border rounded p-2" required />
            <div className="flex gap-4">
              <input {...register("city", { required: true })} placeholder="City" className="w-full border rounded p-2" required />
              <input {...register("zip", { required: true })} placeholder="Postal Code" className="w-full border rounded p-2" required />
            </div>
            <input {...register("phone", { required: true })} placeholder="Phone" className="w-full border rounded p-2" required />
          </div>

          {/* Payment Options */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-700 mb-2">Payment Method</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="radio" value="cod" {...register("payment")} defaultChecked />
                Cash on Delivery (COD)
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="razorpay" {...register("payment")} />
                Razorpay (Online)
              </label>
            </div>
          </div>

          {/* Promo Code */}
          <div className="mt-6">
            <input
              type="text"
              placeholder="Enter Promo Code"
              {...register("coupon")}
              className="w-full border rounded p-2"
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-xl shadow h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          {orderProduct && (
            <div className="divide-y divide-gray-200">
              <div key={orderProduct.id} className="py-3 flex justify-between items-center text-sm">
                <span><img src={orderProduct.images[0]} alt={orderProduct.productName} className="h-10" /></span>
                <span>{orderProduct.productName} × {quantity}</span>
                <span>₹ {orderProduct.finalPrice * quantity}</span>
              </div>
              <div className="py-3 flex justify-between font-semibold">
                <span>Total</span>
                {/* <span>₹{total}</span> */}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 mt-6 rounded hover:bg-blue-700 transition-all text-sm disabled:opacity-50"
            disabled={placingOrder}
          >
            {placingOrder ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </form>
    </section>
  );
}