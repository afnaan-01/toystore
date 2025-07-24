"use client"

import Navbar from "@/components/navbar/App";
import 'remixicon/fonts/remixicon.css'
import { Button } from "@/components/ui/button";
import Products from "@/sections/products/App";
import Footer from "@/components/footer/App";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import useAllProducts from "@/allContext/allproducts";
import axios from "axios";
import Skeleton from "../Skeleton";
import { Minus, Plus } from "lucide-react";
import { handleSingleIncrement, handleSingleDecrement } from "@/helper/productHelper";
import RatingForm from "@/components/ratingForm/page"

const ProductPage = ({ params }) => {

  const { allProducts, setAllProducts } = useAllProducts();
  const [quantity, setQuantity] = useState(1);

  const router = useRouter();

  // Access product ID from URL
  const { id } = useParams(params);
  const [product, setProduct] = useState();

  useEffect(() => {

    const fetchProducts = async () => {
      try {
        const res = await axios.get(`/api/fatch-single-product/${id}`);
        setProduct(res.data.product || {});
      } catch (err) {
      
      } finally {
        // setLoading(false);
      }
    };
    setTimeout(() => {
      fetchProducts();
    },5000)
  }, []);


  return (

    <div>
      <Navbar />

      {
        // Check for product details 
        product ?

          <section className="px-4 py-14 max-w-6xl mx-auto">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-5">
              {/* Product Image */}
              <div className="w-full">

                <div className="w-full overflow-scroll flex scroll-smooth snap-x snap-mandatory">
                  {
                    product.images.map((image, ind) => {
                      return <img key={ind} src={image} alt={product.productName} className="w-full h-auto rounded-lg object-cover mb-4 snap-center" />
                    })
                  }
                </div>

                {/* image changer */}
                <div className="w-full flex justify-center items-center gap-2 mt-4">
                  <span className="text-4xl"><i className="ri-arrow-left-circle-line"></i></span>
                  <span className="text-4xl"><i className="ri-arrow-right-circle-line"></i></span>
                </div>

              </div>

              {/* Product Details */}
              <div className="flex flex-col gap-3">

                <div>
                  <h1 className="text-xl sm:text-3xl font-bold text-gray-800">
                    {product.productName}
                  </h1>
                </div>

                {/* Product Pricing */}
                <div className="flex gap-1 items-center">
                  <p className="text-blue-600 font-bold text-3xl">{product.price}</p>
                  <div className="flex gap-1">
                    <p>M.R.P:</p>
                    <p className="text-gray-600 line-through">{product.finalPrice}</p>
                  </div>
                </div>

                {/* Product Quantity Picker */}
                <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm text-gray-500">Qty:</span>
                      {/* Your quantity update logic here */}
                      <button
                        type="button"
                        onClick={() => handleSingleDecrement(setQuantity)}
                        className="p-1 border rounded"
                      >
                        <Minus size={16} />
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => { }}
                        className="w-14 text-center border rounded appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                      />

                      <button
                        type="button"
                        onClick={() => handleSingleIncrement(setQuantity)}
                        className="p-1 border rounded"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                <div className="border-b border-gray-400 pb-4">
                  <Button variant={"addcart"}>
                    Add to cart
                  </Button>
                  <Button variant={"buynow"} onClick={() => router.push(`/checkout/${id}/${quantity}`)}>
                    Buy Now
                  </Button>
                </div>

                <div className="mt-6 border-b border-gray-400 pb-4">
                  <h2 className="text-xl">About This Product: </h2>
                  <p className="mt-3 text-gray-600 text-lg sm:text-base leading-relaxed">
                    {product.description}
                  </p>
                </div>
         
              </div>

      {/* rating section */} 
 <div>
  <h1 className="text-2xl font-semibold mb-4">Product Reviews</h1>
  <div className="space-y-6">
    {Array.isArray(product?.reviews) && product.reviews.length > 0 ? (
      product.reviews.map((review, ind) => (
        <div
          key={ind}
          className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-medium text-gray-800">{review.customerName}</h2>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < review.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.24 3.808a1 1 0 00.95.69h4.004c.969 0 1.371 1.24.588 1.81l-3.24 2.355a1 1 0 00-.364 1.118l1.24 3.807c.3.922-.755 1.688-1.54 1.118L10 13.348l-3.24 2.355c-.784.57-1.838-.196-1.54-1.118l1.24-3.807a1 1 0 00-.364-1.118L2.856 9.235c-.783-.57-.38-1.81.588-1.81h4.004a1 1 0 00.95-.69l1.24-3.808z" />
                </svg>
              ))}
            </div>
          </div>
          <p className="text-gray-600">{review.comment}</p>
        </div>
      ))
    ) : (
      <p className="text-gray-500">No reviews yet.</p>
    )}
  </div>
</div>
  <RatingForm productId={id}/>

            </div>
          </section>
          :
          <Skeleton />
      }

      <Products text={"Related Products"} />

      <Footer />
    </div>

  );
}

export default ProductPage;