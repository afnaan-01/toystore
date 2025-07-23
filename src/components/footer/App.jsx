import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";

const Footer = ()=> {
  return (
    <footer className="bg-sky-100 text-sky-900 px-6 md:px-20 py-12 font-poppins">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Brand & Subscribe */}
        <div>
          <h2 className="text-xl font-bold mb-2">ToyStore</h2>
          <p className="text-sm mb-4">Subscribe & get 10% off your first order</p>
          <form className="flex items-center border border-gray-600 rounded-md overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent px-3 py-2 text-sm w-full focus:outline-none"
            />
            <button type="submit" className=" px-3 py-2">
              <RiSendPlaneFill size={18} />
            </button>
          </form>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <p className="text-sm mb-1">Nanded, Maharashtra India 431605</p>
          <p className="text-sm mb-1">kaastechnical@gmail.com</p>
         
        </div>

        {/* Account */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Account</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/profile">My Account</a></li>
            <li><a href="/auth">Login / Register</a></li>
            <li><a href="/cart">Cart</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/about-us">About Us</a></li>
            <li><a href="/contact-us">Contact</a></li>
            <li><a href="/privacy-and-policy">Privacy Policy</a></li>
            <li><a href="/terms-and-conditions">Terms and Conditions</a></li>
            <li><a href="/shipping-and-delivery-policy">Shipping Policy</a></li>
            <li><a href="/cancellation-and-refund">Cancellation & Refund</a></li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} ToyVerse. All rights reserved.
      </div>
    </footer>
  );
}


export default Footer;