'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center px-6 py-4 md:max-w-[1350px] mx-auto">

        {/* Logo */}
        <div className="text-2xl font-bold text-black">ToysStore</div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium text-black">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <Link href="/contact-us" className="hover:text-gray-600">Contact</Link>
          <Link href="/about-us" className="hover:text-gray-600">About</Link>
          <Link href="/auth" className="hover:text-gray-600">Sign Up</Link>
        </nav>

        {/* Icons (always visible) */}
        <div className="flex items-center space-x-4">
          <Link href="/cart">
            <ShoppingCart className="w-6 h-6 text-black" />
          </Link>

          {/* Mobile Menu Button (only visible on mobile) */}
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

      {/* Mobile Navigation (absolute to avoid pushing content) */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md px-6 py-4 space-y-2 text-sm font-medium text-black z-40">
          <Link href="/" className="block hover:text-gray-600" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link href="/contact-us" className="block hover:text-gray-600" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          <Link href="/about-us" className="block hover:text-gray-600" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link href="/auth" className="block hover:text-gray-600" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
