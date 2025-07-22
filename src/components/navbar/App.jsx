
'use client';
import React from 'react';
import Link from "next/link";

const Header = () => {
  return (

    <header className="border border-b-1 bg-white">
      <div className='flex justify-between items-center px-6 py-4 md:max-w-[1350px] mx-auto'>

        {/* Logo */}
        <div className="text-2xl font-bold">ToysStore</div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <a href="/" className="hover:text-gray-600">Home</a>
          <a href="/contact-us" className="hover:text-gray-600">Contact</a>
          <a href="/about-us" className="hover:text-gray-600">About</a>
          <a href="/auth" className="hover:text-gray-600">Sign Up</a>
        </nav>

        {/* Search & Icons */}
        <div className="flex items-center space-x-4">

          {/* Icons */}
          <Link href="/cart">
          <span>
            <i className="ri-shopping-cart-line text-xl cursor-pointer"></i>
          </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
