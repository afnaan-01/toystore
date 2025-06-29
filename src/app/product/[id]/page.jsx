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


const ProductPage = ({ params }) => {

  const { allProducts, setAllProducts } = useAllProducts();


  const qtyRef = useRef(null);
  const router = useRouter();

  // Access product ID from URL
  const { id } = useParams(params);
  const [product, setProduct] = useState();

  useEffect(() => {

    const fetchProducts = async () => {
      try {
        console.log(id);
        const res = await axios.get(`/api/fatch-single-product/${id}`);
        console.log('Fetched data:', res.data.product);
        setProduct(res.data.product || {});
      } catch (err) {
        console.error('Error fetching product:', err);
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

          <section className="px-4 py-7 max-w-6xl mx-auto">

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
                    ref={qtyRef}
                  />
                </div>

                <div className="border-b border-gray-400 pb-4">
                  <Button variant={"addcart"}>
                    Add to cart
                  </Button>
                  <Button variant={"buynow"} onClick={() => router.push(`/checkout/${id}/${qtyRef.current.value}`)}>
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