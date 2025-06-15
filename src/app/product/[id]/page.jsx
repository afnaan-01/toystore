import Navbar from "@/components/navbar/App";
import 'remixicon/fonts/remixicon.css'


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

            <p className="text-blue-600 text-xl font-semibold mt-2">
              ₹{products.price}
            </p>

            <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-all text-sm">
              Add to Cart
            </button>
          </div>
        </div>
      </section>
    </div>

  );
}

export default ProductPage;