"use client";
import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-center text-3xl font-bold mb-6">Terms & Conditions</h1>

      <p className="mb-6">
        Welcome to <strong>ToyStore</strong>! These Terms & Conditions ("Terms") govern your use of our website located at <strong>[www.yourtoystore.com]</strong> and any related services we provide. By browsing, accessing, or making a purchase from our website, you agree to comply with and be bound by these Terms. This includes any applicable laws, policies, and regulations. Please read them carefully before using our services. These Terms cover important topics such as eligibility to use the site, pricing, payments, cancellations, intellectual property, user conduct, limitations of liability, and dispute resolution. If you do not agree with any part of these Terms, you should not use this website. We reserve the right to modify these Terms at any time without prior notice, and your continued use of the site will constitute acceptance of those changes.
      </p>

      <h2 className="text-xl font-semibold mb-2">1. Use of Website</h2>
      <p className="mb-4">
        You must be at least 18 years old or using the website under the supervision of a parent or
        guardian. By using our site, you agree to provide accurate and complete information.
      </p>

      <h2 className="text-xl font-semibold mb-2">2. Product Information</h2>
      <p className="mb-4">
        We strive to provide accurate descriptions and images of toys. However, colors, packaging, or
        designs may vary slightly from images displayed. Prices and availability are subject to change
        without notice.
      </p>

      <h2 className="text-xl font-semibold mb-2">3. Orders & Payments</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>All orders are subject to acceptance and availability.</li>
        <li>We reserve the right to cancel or refuse any order at our discretion.</li>
        <li>Payments are processed securely via trusted third-party gateways (e.g., Razorpay, Stripe, etc.).</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">4. Shipping & Delivery</h2>
      <p className="mb-4">
        Delivery times are estimates and may vary. We are not liable for delays caused by courier
        companies or external circumstances.
      </p>

      <h2 className="text-xl font-semibold mb-2">5. Returns & Refunds</h2>
      <p className="mb-4">
        Please refer to our <a href="/cancellation-and-refund" className="text-blue-600 underline">Cancellation & Refund Policy</a> for details on returns, cancellations, and refunds.
      </p>

      <h2 className="text-xl font-semibold mb-2">6. Intellectual Property</h2>
      <p className="mb-4">
        All content, logos, images, and designs on this website are owned by <strong>[Your Toy Store Name]</strong>
        and are protected by copyright laws. Unauthorized use is prohibited.
      </p>

      <h2 className="text-xl font-semibold mb-2">7. Limitation of Liability</h2>
      <p className="mb-4">
        We are not liable for any damages arising from the use of our products or website. Toys must be
        used under adult supervision as recommended by the manufacturer.
      </p>

      <h2 className="text-xl font-semibold mb-2">8. Privacy</h2>
      <p className="mb-4">
        Your privacy is important to us. Please review our{" "}
        <a href="/privacy-and-policy" className="text-blue-600 underline">Privacy Policy</a> to understand how we collect and use your information.
      </p>

      <h2 className="text-xl font-semibold mb-2">9. Governing Law</h2>
      <p className="mb-4">
        These terms are governed by the laws of India. Any disputes shall be resolved in the courts of
        [Your City/State].
      </p>

      <h2 className="text-xl font-semibold mb-2">10. Changes to Terms</h2>
      <p className="mb-6">
        We may update these Terms and Conditions at any time. Continued use of the website constitutes
        acceptance of any changes.
      </p>

       
    </div>
  );
};

export default TermsAndConditions;
