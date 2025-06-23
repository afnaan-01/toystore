"use client";

import { use, useState } from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

export default function CheckoutPage() {
 const {data:session} = useSession()
 console.log(session)
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    phone: "",
    payment: "cod",
    coupon: "",
  });

  const [placingOrder, setPlacingOrder] = useState(false);

  const cartItems = [
    { id: 1, title: "RC Car", price: 1299, quantity: 1 },
    { id: 2, title: "Robot Kit", price: 2499, quantity: 2 },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const placeOrder = () => {
    setPlacingOrder(true);
    setTimeout(() => {
      alert("✅ Order placed successfully!");
      setPlacingOrder(false);
    }, 2000);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping Details */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

          <div className="space-y-4">
            <input name="name" onChange={handleChange} placeholder="Full Name" className="w-full border rounded p-2" required />
            <input name="email" onChange={handleChange} placeholder="Email" className="w-full border rounded p-2" required />
            <input name="address" onChange={handleChange} placeholder="Address" className="w-full border rounded p-2" required />
            <div className="flex gap-4">
              <input name="city" onChange={handleChange} placeholder="City" className="w-full border rounded p-2" required />
              <input name="zip" onChange={handleChange} placeholder="Postal Code" className="w-full border rounded p-2" required />
            </div>
            <input name="phone" onChange={handleChange} placeholder="Phone" className="w-full border rounded p-2" required />
          </div>

          {/* Payment Options */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-700 mb-2">Payment Method</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" value="cod" checked={form.payment === "cod"} onChange={handleChange} />
                Cash on Delivery (COD)
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" value="razorpay" checked={form.payment === "razorpay"} onChange={handleChange} />
                Razorpay (Online)
              </label>
            </div>
          </div>

          {/* Promo Code */}
          <div className="mt-6">
            <input
              type="text"
              name="coupon"
              value={form.coupon}
              onChange={handleChange}
              placeholder="Enter Promo Code"
              className="w-full border rounded p-2"
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-xl shadow h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <div key={item.id} className="py-3 flex justify-between text-sm">
                <span>{item.title} × {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="py-3 flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <button
            onClick={placeOrder}
            className="w-full bg-blue-600 text-white py-3 mt-6 rounded hover:bg-blue-700 transition-all text-sm disabled:opacity-50"
            disabled={placingOrder}
          >
            {placingOrder ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </section>
  );
}
