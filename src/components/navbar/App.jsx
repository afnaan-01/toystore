'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import useCart from '@/allContext/cart'; // adjust path as needed

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const { cartItems } = useCart();

  // Get total quantity of items in the cart
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="border-b bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center px-6 py-4 md:max-w-[1350px] mx-auto">

        {/* Logo */}
        <div className="text-2xl font-bold text-black">KiddoToy</div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium text-black">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <Link href="/contact-us" className="hover:text-gray-600">Contact</Link>
          <Link href="/about-us" className="hover:text-gray-600">About</Link>
          {
            session ? (
              <Link href="/profile" className="hover:text-gray-600">Profile</Link>
            ) : (
              <Link href="/auth" className="hover:text-gray-600">Sign Up</Link>
            )
          }
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4 relative">
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-black" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden focus:outline-none"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-black" />
            ) : (
              <Menu className="w-6 h-6 text-black" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md px-6 py-4 space-y-2 text-sm font-medium text-black z-40">
          <Link href="/" className="block hover:text-gray-600" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link href="/contact-us" className="block hover:text-gray-600" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          <Link href="/about-us" className="block hover:text-gray-600" onClick={() => setMobileMenuOpen(false)}>About</Link>
          {
            session ? (
              <Link href="/profile" className="block hover:text-gray-600" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
            ) : (
              <Link href="/auth" className="block hover:text-gray-600" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
            )
          }
        </div>
      )}
    </header>
  );
};

export default Header;
