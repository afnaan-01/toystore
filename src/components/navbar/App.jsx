// "use client";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { RiMenuLine, RiCloseLine, RiShoppingCartLine, RiUserLine } from "react-icons/ri";
// import { useSession, signOut } from "next-auth/react";
// import { CircleUserRound, LogInIcon, LogOutIcon, ShoppingCart } from "lucide-react";


// const Navbar = ({ newCss }) => {

//   const [mobileOpen, setMobileOpen] = useState(false);
//   const { data: session } = useSession();

//   useEffect(() => {
//     if (mobileOpen) {
//       document.body.classList.add('overflow-hidden');
//     } else {
//       document.body.classList.remove('overflow-hidden');
//     }

//     // Cleanup when component unmounts
//     return () => {
//       document.body.classList.remove('overflow-hidden');
//     };
//   }, [mobileOpen]);

//   return (
//     <header className={`bg-green-400 sticky top-0 z-50 ${newCss}`}>
//       <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-4">
//         {/* Logo */}
//         <Link href="/" className="text-xl font-bold text-blue-600 font-quicksand">
//           ToyStore
//         </Link>

//         <div className="flex gap-3 md:text-2xl items-center">
//          <div className="flex gap-1 items-center">
//            <CircleUserRound/>
//            <span>Login</span>
//          </div>
//           <div>
//             <ShoppingCart />
//           </div>
//         </div>

//         {/* Nav Links - Desktop */}
//         <nav className="hidden md:hidden space-x-6 md:items-center">
//           <Link href="/" className="hover:text-blue-600 font-poppins">Home</Link>
//           <Link href="/collection/all-products" className="hover:text-blue-600 font-poppins">Shop</Link>
//           <Link href="/cart" className="hover:text-blue-600 flex items-center font-poppins">
//             <RiShoppingCartLine className="mr-1" /> Cart
//           </Link>
//           {session ? (
//             <Link href="/profile" className="hover:text-blue-600 flex items-center font-poppins">
//               <RiUserLine className="mr-1" /> Profile
//             </Link>
//           ) : (
//             <Link href="/auth" className="hover:text-blue-600 flex items-center font-poppins">
//               <LogInIcon className="mr-1 w-5" /> Login
//             </Link>
//           )
//           }
//         </nav>
//       </div>

//       {/* Mobile Nav Menu */}
//       {mobileOpen && (
//         <nav className="absolute w-full h-screen md:hidden bg-white px-4 pb-4 flex flex-col space-y-3">
//           <Link href="/" className="text-gray-700 hover:text-blue-600 font-poppins">Home</Link>
//           <Link href="/shop" className="text-gray-700 hover:text-blue-600 font-poppins">Shop</Link>
//           <Link href="/cart" className="text-gray-700 hover:text-blue-600 flex items-center font-poppins">
//             <RiShoppingCartLine className="mr-1" /> Cart
//           </Link>
//           <Link href="/auth" className="text-gray-700 hover:text-blue-600 flex items-center font-poppins">
//             <RiUserLine className="mr-1" /> Login
//           </Link>
//         </nav>
//       )}
//     </header>
//   );
// };

// export default Navbar;


'use client';
import React from 'react';
import Link from "next/link";

const Header = () => {
  return (

    <header className=" border border-b-1 bg-white">
      <div className='flex justify-between items-center px-6 py-4 md:max-w-[1350px] mx-auto'>

        {/* Logo */}
        <div className="text-2xl font-bold">ToysStore</div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <a href="/Home" className="border-b-2 border-black pb-1">Home</a>
          <a href="/contact" className="hover:text-gray-600">Contact</a>
          <a href="/about" className="hover:text-gray-600">About</a>
          <a href="/auth" className="hover:text-gray-600">Sign Up</a>
        </nav>

        {/* Search & Icons */}
        <div className="flex items-center space-x-4">
          {/* Search Box */}
          {/* <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-md">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="bg-transparent outline-none text-sm"
          />
          <i className="ri-search-line text-gray-500 ml-2"></i>
        </div> */}

          {/* Icons */}
          <i className="ri-heart-line text-xl cursor-pointer"></i>
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
