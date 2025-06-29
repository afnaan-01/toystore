"use client";
import React from "react";

const ShippingPolicy = () => {
    return (
        <div className="mx-auto px-4 py-10 text-gray-800">
            <h1 className="text-3xl text-center font-bold mb-6">Shipping & Delivery Policy</h1>

            <p className="mb-6  text-sm text-gray-500">Effective Date: June 29, 2025</p>

            <p className="mb-6">
                At <strong>ToyStore</strong>, we are dedicated to ensuring your favorite toys and products reach your doorstep quickly, safely, and efficiently. Our Shipping & Delivery Policy explains the methods, timelines, and conditions under which we fulfill and deliver your orders.
                We partner with leading logistics providers, including <strong>Shiprocket</strong>, to offer reliable delivery services across India. From the moment your order is placed to the time it reaches your hands, we strive to provide real-time tracking, careful packaging, and responsive customer support.
                Whether you’re shopping for a birthday, special event, or simply a new addition to your collection, we understand the importance of timely delivery. Please read the details below to know how we handle order processing, shipping timelines, delivery coverage, charges, and what to do if issues arise during shipment.
                By placing an order with us, you agree to the terms outlined in this Shipping & Delivery Policy. If you have any questions or concerns, feel free to reach out to our support team at <strong>kaastechnical@gmail.com</strong>.
            </p>

            <h2 className="text-xl font-semibold mb-2">2. Shipping Locations</h2>
            <ul className="list-disc pl-6 mb-4">
                <li>We currently ship across all serviceable pin codes in India.</li>
                <li>International shipping is not available at this time.</li>
            </ul>

            <h2 className="text-xl font-semibold mb-2">3. Order Processing Time</h2>
            <ul className="list-disc pl-6 mb-4">
                <li>Orders are typically processed within <strong>1–2 business days</strong>.</li>
                <li>Orders placed on weekends or holidays are processed the next business day.</li>
            </ul>

            <h2 className="text-xl font-semibold mb-2">4. Estimated Delivery Time</h2>
            <ul className="list-disc pl-6 mb-4">
                <li>Metro Cities: <strong>2–4 business days</strong></li>
                <li>Tier 2 & 3 Cities: <strong>4–7 business days</strong></li>
                <li>Remote/Rural Areas: <strong>7–10 business days</strong></li>
            </ul>
            <p className="mb-4">
                Delivery times may vary based on your location, order volume, or courier delays beyond our control.
            </p>

            <h2 className="text-xl font-semibold mb-2">5. Shipping Charges</h2>
            <ul className="list-disc pl-6 mb-4">
                <li><strong>Free Shipping</strong> on all orders above ₹[e.g., 999].</li>
                <li>A nominal shipping fee of ₹[e.g., 49] may apply on smaller orders.</li>
            </ul>

            <h2 className="text-xl font-semibold mb-2">6. Order Tracking</h2>
            <p className="mb-4">
                Once your order is shipped, you will receive an email or SMS with a tracking link powered by
                Shiprocket. You can use this link to monitor the status of your shipment in real-time.
            </p>

            <h2 className="text-xl font-semibold mb-2">7. Delivery Issues</h2>
            <ul className="list-disc pl-6 mb-4">
                <li>Please ensure your address and contact information are accurate while placing the order.</li>
                <li>If delivery fails due to incorrect address or unavailability, re-shipping may incur additional charges.</li>
                <li>In case of lost or undelivered packages, contact us at <strong>kaastechnical@gmail.com</strong> within 7 days of the estimated delivery date.</li>
            </ul>

           
        </div>
    );
};

export default ShippingPolicy;
