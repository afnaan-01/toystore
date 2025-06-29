"use client";
import React from "react";

const ContactUs = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>

      <p className="mb-6 text-center">
        We’re here to help! Whether you have questions about our products, orders, or policies —
        feel free to reach out. Our support team is available Monday to Saturday, 10:00 AM to 6:00 PM.
      </p>

      <div className="space-y-4 text-lg">
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:support@yourtoystore.com" className="text-blue-600 underline">
            support@yourtoystore.com
          </a>
        </p>
        <p>
          <strong>Phone:</strong> +91-9876543210
        </p>
        <p>
          <strong>Address:</strong> 123 Toy Street, Happyville, Mumbai, Maharashtra – 400001
        </p>
        <p>
          <strong>Business Hours:</strong> Monday – Saturday, 10:00 AM – 6:00 PM
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
