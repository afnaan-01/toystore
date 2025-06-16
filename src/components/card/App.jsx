"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const App = ({ id, title, imageUrl, price }) => {

    const router = useRouter();

    return (
        <div className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden transition-all">
            <Link href={`/product/${id}`}>
                <div className="relative w-full h-56 sm:h-64">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </Link>

            <div className="p-4">
                <h3 className="text-md font-semibold text-gray-800 truncate">{title}</h3>
                <div className="flex gap-1 items-center">
                    <p className="text-blue-600 font-bold text-2xl">₹{price}</p>
                    <div className="flex gap-1">
                        <p>M.R.P: </p>
                        <p className="text-gray-600 line-through">₹3000</p>
                    </div>
                </div>
                <Button variant={"addcart"}>
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
