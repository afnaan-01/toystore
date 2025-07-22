"use client";
import Header from "@/components/navbar/App";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div>
      <Header />

       <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-playful text-primary mb-4">
          Privacy Policy
        </h1>
        <p className="text-subtle mb-8">
          Your privacy matters to us. This policy explains how we handle your data.
        </p>

        {/* Sections */}
        <div className="space-y-8 text-dark">
          {/* 1. Introduction */}
          <section>
            <h2 className="text-xl font-bold text-primary mb-2">Introduction</h2>
            <p>
              At Kiddotoy, we value your privacy and are committed to protecting your personal information. 
              This policy outlines how we collect, use, and safeguard your data.
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section>
            <h2 className="text-xl font-bold text-primary mb-2">Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Name, email address, and phone number</li>
              <li>Shipping and billing addresses</li>
              <li>Payment information (handled securely via our payment partners)</li>
              <li>Cookies for analytics and site performance</li>
            </ul>
          </section>

          {/* 3. How We Use Your Information */}
          <section>
            <h2 className="text-xl font-bold text-primary mb-2">How We Use Your Information</h2>
            <p>
              We use your data to process orders, provide customer support, and improve our services. 
              With your consent, we may also send promotional offers and updates.
            </p>
          </section>

          {/* 4. Data Security */}
          <section>
            <h2 className="text-xl font-bold text-primary mb-2">Data Security</h2>
            <p>
              We implement strong security measures to protect your personal information, including encryption and secure payment processing.
            </p>
          </section>

          {/* 5. Contact */}
          <section>
            <h2 className="text-xl font-bold text-primary mb-2">Contact Us</h2>
            <p>
              If you have any questions about this policy, please contact us at 
              <span className="text-primary font-semibold"> <a href="mailto:kaastechnical@gmail.com">kaastechnical@gmail.com</a></span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
