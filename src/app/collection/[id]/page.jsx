"use client";
import { useEffect, useState } from "react";
import React from "react";
import ProductCard from "@/components/card/App"; 
import { collections } from "@/helper/data";
import Navbar from "@/components/navbar/App";
import Footer from "@/components/footer/App";
import axios from "axios";
import { Loader2 } from "lucide-react";

export default function CollectionPage({params}) {

 const [products, setProducts] = useState([]);
 const [loading, setLoading] = useState(true);
 const { id } = React.use(params);
 
 useEffect(() => {
    const fetchProducts = async () => {
      try {
         const res = await axios.post("/api/product-fatch-by-collection-id", {collectionId: parseInt(id),});
         setProducts(res.data.products || []);  
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);
  const collection = collections?.find((collection) => collection?.id === parseInt(id));
  const [sortOption, setSortOption] = useState("default");

  return (
    <div>

      <Navbar />
 {loading ? (
  <div className="flex justify-center items-center h-60">
    <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
  </div>
) : (
      <div className="px-4 py-8 max-w-7xl mx-auto">
        {/* Page Title & Sort */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{collection?.title || "Products"}</h1>

          <div>
            <select
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value="default">Sort by</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Grid & Sidebar (Future Filter Slot) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filter Sidebar (optional, can be added later) */}
          <div className="hidden md:block">
            <div className="bg-white p-4 shadow rounded">
              <h2 className="font-semibold text-gray-700 mb-3">Filters</h2>
              <p className="text-sm text-gray-500">Coming soon...</p>
            </div>
          </div>

          {/* Product Grid */}
          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                title={product.title}
                imageUrl={product.images[0]}
                price={product.price}
                finalPrice={product.finalPrice}
              />
            ))}
          </div>
        </div>
      </div>
)}
      <Footer />
    </div>
  );
}
