"use client"

// pages/thank-you.tsx
import { useEffect, useState } from 'react';

 const  OrderDone = ()=> {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 100); // slight delay for animation trigger

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 px-4">
      <div
        className={`transition-all duration-700 ease-out transform ${
          showMessage ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        } bg-white text-gray-800 rounded-lg shadow-lg p-8 text-center max-w-md w-full`}
      >
        <h1 className="text-4xl font-extrabold mb-4 text-purple-700">Thank You!</h1>
        <p className="text-lg">We appreciate your order! It will be delivered to you very soon</p>

        <div className="mt-6">
          <a
            href="/"
            className="inline-block bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  );
}

export default OrderDone;