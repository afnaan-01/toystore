import Navbar from "@/components/navbar/App";
import 'remixicon/fonts/remixicon.css'
import { Button } from "@/components/ui/button";
import Products from "@/sections/products/App"; 
import Footer from "@/components/footer/App";


// Mock product data (replace with real fetch later)
const allProducts = [
  {
    id: "1",
    title: "Remote Control Car",
    imageUrl: "https://i.pinimg.com/736x/f6/1d/29/f61d29179830a773708020086ebd5cb3.jpg",
    price: 1299,
    description:
      "A high-speed remote control car perfect for racing. Durable build with rechargeable batteries and smooth controls.",
  },
  {
    id: "2",
    title: "Educational Robot Kit",
    imageUrl: "https://i.pinimg.com/736x/50/7c/10/507c10ff21bc4e50a73424b58d3bc223.jpg",
    price: 2499,
  },
  {
    id: "3",
    title: "Action Hero Set",
    imageUrl: "https://i.pinimg.com/736x/c5/2d/3f/c52d3f471c3ced1cc67be55a859a28bb.jpg",
    price: 899,
  },
];

const ProductPage = ({ params }) => {
  // Access product ID from URL
  const { id } = params;

  const products = allProducts.find((product) => product.id === id);

  return (

    <div>
      <Navbar />

      <section className="px-4 py-10 max-w-6xl mx-auto">

        <div>
          <h1 className="text-3xl sm:text-3xl font-bold text-gray-800">
            {products.title}
          </h1>

          <p className="mt-3 text-gray-600 text-lg sm:text-base leading-relaxed">
            {products.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-5">
          {/* Product Image */}
          <div className="w-full">
            <img
              src={products.imageUrl}
              alt={products.title}
              className="w-full h-auto rounded-lg object-cover"
            />

            {/* image changer */}
            <div className="w-full flex justify-center items-center gap-2 mt-4">
              <span className="text-4xl"><i class="ri-arrow-left-circle-line"></i></span>
              <span className="text-4xl"><i class="ri-arrow-right-circle-line"></i></span>
            </div>

          </div>

          {/* Product Details */}
          <div>

            {/* Product Pricing */}
            <div className="flex gap-1 items-center">
              <p className="text-blue-600 font-bold text-3xl">₹1200</p>
              <div className="flex gap-1">
                <p>M.R.P:</p>
                <p className="text-gray-600 line-through">₹3000</p>
              </div>
            </div>

            {/* Product Quantity Picker */}
            <div className="mt-4">
              <label htmlFor="quantity" className="block text-gray-700 mb-2">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                defaultValue="1"
                className="w-20 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              </div>

            <div className="border-b border-gray-400 pb-4">
              <Button variant={"addcart"}>
                Add to cart
              </Button>
              <Button variant={"buynow"}>
                Buy Now
              </Button>
            </div>

            <div className="mt-6 border-b border-gray-400 pb-4">
              <h2 className="text-xl">About This Product:</h2>
            </div>

          </div>
        </div>
      </section>

      <Products text={"Related Products"} />

      <Footer />
    </div>

  );
}

export default ProductPage;