"use client";
import Link from "next/link";
import { useState } from "react";
import { RiMenuLine, RiCloseLine, RiShoppingCartLine, RiUserLine } from "react-icons/ri";
import { useSession, signOut } from "next-auth/react";
import { LogOutIcon } from "lucide-react";


const Navbar = ({ newCss }) => {

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={`bg-white shadow-md sticky top-0 z-50 ${newCss}`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          ToyStore
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-2xl text-gray-700"
        >
          {mobileOpen ? <RiCloseLine /> : <RiMenuLine />}
        </button>

        {/* Nav Links - Desktop */}
        <nav className="hidden md:flex space-x-6 md:items-center">
          <Link href="/" className="text-gray-600 hover:text-blue-600 font-bold">Home</Link>
          <Link href="/collection/all-products" className="text-gray-600 hover:text-blue-600 font-bold">Shop</Link>
          <Link href="/cart" className="text-gray-600 hover:text-blue-600 flex items-center font-bold">
            <RiShoppingCartLine className="mr-1" /> Cart
          </Link>
          {session ? (
            <p className="text-gray-600 hover:text-blue-600 flex flex-col items-center font-bold">
              <button onClick={() => { signOut() }}><LogOutIcon className="mr-1" /> <span>Logout </span></button>
            </p>
          ) : (
            <Link href="/auth" className="text-gray-600 hover:text-blue-600 flex items-center font-bold">
              <RiUserLine className="mr-1" /> Login
            </Link>
          )
          }
        </nav>
      </div>

      {/* Mobile Nav Menu */}
      {mobileOpen && (
        <nav className="md:hidden bg-white px-4 pb-4 flex flex-col space-y-3">
          <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link href="/shop" className="text-gray-700 hover:text-blue-600">Shop</Link>
          <Link href="/cart" className="text-gray-700 hover:text-blue-600 flex items-center">
            <RiShoppingCartLine className="mr-1" /> Cart
          </Link>
          <Link href="/auth" className="text-gray-700 hover:text-blue-600 flex items-center">
            <RiUserLine className="mr-1" /> Login
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
