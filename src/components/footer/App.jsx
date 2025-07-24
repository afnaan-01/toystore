import React from 'react';
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-100 text-blue-900 px-6 py-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {/* Contact */}
        <div>
          <h2 className="text-lg font-bold mb-2">Contact Us 📍</h2>
          <p>Nanded, Maharashtra</p>
          <p>India 431605</p>
          <p className="mt-2">📧 kaastechnical@gmail.com</p>
        </div>

        {/* My Account */}
        <div>
          <h2 className="text-lg font-bold mb-2">My Account 👤</h2>
          <ul className="space-y-1">
            <li><a href="/profile" className="hover:underline">My Account</a></li>
            <li><a href="/auth" className="hover:underline">Login / Register</a></li>
            <li><a href="/cart" className="hover:underline">Cart</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-bold mb-2">Quick Links 🔗</h2>
          <ul className="space-y-1">
            <li><a href="/about-us" className="hover:underline">About Us</a></li>
            <li><a href="/contact-us" className="hover:underline">Contact</a></li>
            <li><a href="/privacy-and-policy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/terms-and-conditions" className="hover:underline">Terms & Conditions</a></li>
            <li><a href="/shipping-and-delivery-policy" className="hover:underline">Shipping Policy</a></li>
            <li><a href="/cancellation-and-refund" className="hover:underline">Cancellation & Refund</a></li>
          </ul>
        </div>

      </div>

      <div className="border-t border-blue-300 mt-8 pt-4 text-center">
        <p>© 2025 ToyVerse. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="https://www.instagram.com" target="_blank" className="text-2xl hover:text-pink-600" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://www.facebook.com" target="_blank" className="text-2xl hover:text-blue-600" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://www.linkedin.com" target="_blank" className="text-2xl hover:text-blue-500" rel="noopener noreferrer"><FaLinkedinIn /></a>
          <a href="https://www.youtube.com" target="_blank" className="text-2xl hover:text-red-600" rel="noopener noreferrer"><FaYoutube /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
