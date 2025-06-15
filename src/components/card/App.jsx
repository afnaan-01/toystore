import Link from "next/link";
import { Button } from "../ui/button";

const App = ({ id, title, imageUrl, price }) => {
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

                <div className="p-4">
                    <h3 className="text-md font-semibold text-gray-800 truncate">{title}</h3>
                    <div className="flex gap-1 items-center">
                        <p className="text-blue-600 font-bold text-2xl">₹{price}</p>
                        <div className="flex gap-1">
                            <p>M.R.P:</p>
                            <p className="text-gray-600 line-through">₹3000</p>
                        </div>
                    </div>
                    <Button variant={"addcart"}>
                        Add to cart
                    </Button>
                    <Button variant="buynow">
                        Buy Now
                    </Button>
                </div>
            </Link>
        </div>
    );
};

export default App;
