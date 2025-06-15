import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-700 py-8 mt-16">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

                {/* Section 1: Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
                        <li><Link href="/shop" className="hover:text-blue-600">Shop</Link></li>
                        <li><Link href="/cart" className="hover:text-blue-600">Cart</Link></li>
                        <li><Link href="/contact" className="hover:text-blue-600">Contact</Link></li>
                    </ul>
                </div>

                {/* Section 2: Contact Info */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
                    <p>Email: support@toystore.com</p>
                    <p>Phone: +91 98765 43210</p>
                    <p>Address: Mumbai, India</p>
                </div>

                {/* Section 3: Social Media */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-blue-600">Facebook</a>
                        <a href="#" className="hover:text-pink-500">Instagram</a>
                        <a href="#" className="hover:text-sky-500">Twitter</a>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright */}
            <div className="text-center text-sm text-gray-500 mt-8">
                &copy; {new Date().getFullYear()} ToyStore. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
