// app/cancellation-and-refund/page.jsx or pages/cancellation-and-refund.jsx

"use client";
import React from "react";

const CancellationAndRefund = () => {
  return (
    <div className=" mx-auto px-4 py-10 text-gray-800">
     <h1 className="text-3xl font-bold mb-6 text-center">Cancellation & Refund Policy</h1>

<p className="mb-4 text-sm text-gray-500">Effective Date: June 29, 2025</p>

 <p>
  At <strong>ToyStore</strong>, we believe in delivering joy—not just through our toys,
  but also through a smooth and worry-free shopping experience. We understand that sometimes
  plans change or an item might 
  not meet expectations. That's why we’ve created a clear and simple cancellation and refund policy to make sure you feel confident while shopping with us.
  This policy explains the process and conditions under which you can cancel your order, request a refund, or initiate a return. Whether it's a last-minute change of mind, a mistaken order, or an issue with a delivered product, we’re here to help resolve it quickly and fairly. 
  Please read the following details carefully so you’re aware of your rights and options. If you have any questions, feel free to contact our customer support team—we’re happy to assist!
</p>

      <h2 className="text-2xl font-semibold mb-2 mt-4"> Order Cancellation</h2>
      <h3 className="font-semibold mt-4">✅ Before Shipment:</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>You may cancel your order within <strong>[12 hours]</strong> of placing it or before the product is shipped.</li>
        <li>To cancel, contact us at <strong>kaastechnical@gmail.com</strong> .</li>
        <li>If approved, a full refund will be issued.</li>
      </ul>

      <h3 className="font-semibold">❌ After Shipment:</h3>
      <ul className="list-disc pl-6 mb-6">
        <li>Once shipped, the order cannot be canceled.</li>
        <li>However, you may be eligible for return/refund as explained below.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2 mt-4">Refunds</h2>
      <h3 className="font-semibold mt-4">🛠️ Eligibility for Refund:</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>Product was damaged during shipping</li>
        <li>Incorrect item received</li>
        <li>Product is defective or non-functional</li>
        <li>Order was canceled before shipment</li>
      </ul>

      <p className="mb-4 font-semibold">Refunds are not eligible for:</p>
      <ul className="list-disc pl-6 mb-6">
        <li>Items without original packaging/accessories</li>
        <li>Used or customer-damaged items</li>
        <li>Digital goods unless faulty</li>
      </ul>

      <h3 className="font-semibold">🔄 Refund Process:</h3>
      <ul className="list-disc pl-6 mb-6">
        <li>You’ll be notified once your return is received and inspected.</li>
        <li>If approved, refund will be processed within <strong>7–10 business days</strong>.</li>
        <li>Amount will be credited to your original payment method.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">Exchange Policy</h2>
      <p className="mb-6">
        If you received a defective or damaged product, we offer replacements instead of refunds. Request
        must be raised within <strong>[3 days]</strong> of delivery.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Return Shipping</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>If we shipped the wrong/damaged item, we arrange free reverse pickup.</li>
        <li>For other reasons, return shipping cost is borne by the customer.</li>
      </ul>

     
    </div>
  );
};

export default CancellationAndRefund;
