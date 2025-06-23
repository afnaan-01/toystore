"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import useCart from "@/allContext/cart";

const App = ({ id, title, imageUrl, price, finalPrice }) => {

    const { addToCart, cartItems } = useCart();

    const router = useRouter();

    return (
        <div className="relative bg-white rounded-lg shadow hover:shadow-lg overflow-hidden hover:bottom-1 transition-all group">
            <Link href={`/product/${id}`}>
                <div className="relative w-full aspect-auto overflow-hidden"> 
                     {/* h-56 sm:h-64 */}
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all"
                    />
                </div>
            </Link>

            <div className="p-4">
                <h3 className="text-md font-semibold text-gray-800 truncate">{title}</h3>
                <div className="flex gap-1 items-center">
                    <p className="text-blue-600 font-bold text-2xl">₹{finalPrice}</p>
                    <div className="flex gap-1">
                        <p>M.R.P: </p>
                        <p className="text-gray-600 line-through">₹{price}</p>
                    </div>
                </div>
                <Button variant={"addcart"} onClick={() => {
                    addToCart(id);
                    console.log(cartItems);
                    }}>
                    Add to cart
                </Button>
                <Button variant="buynow" onClick={() => router.push(`/checkout/${id}/1}`)}>
                    Buy Now
                </Button>
            </div>

        </div>
    );
};

export default App;
