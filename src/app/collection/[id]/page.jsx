"use client";
import { useState } from "react";
import ProductCard from "@/components/card/App"; // Use the card you already built
import { allProducts } from "@/helper/data";
import { collections } from "@/helper/data";
import { useParams } from "next/navigation";
import Navbar from "@/components/navbar/App";
import Footer from "@/components/footer/App";

export default function ShopPage() {

  const { id } = useParams();
  console.log("CollectionId:" + id);
  console.log("Product collectionId:" + allProducts[1].collectionId);
  const filteredProducts = allProducts.filter((product) => product.collectionId === parseInt(id));
  console.log("All Products:", allProducts);
  console.log("Filtered Products:", filteredProducts);
  const collection = collections.find((collection) => collection.id === parseInt(id));

  const [sortOption, setSortOption] = useState("default");

  // const sortedProducts = [...filteredProducts].sort((a, b) => {
  //   if (sortOption === "low-to-high") return a.price - b.price;
  //   if (sortOption === "high-to-low") return b.price - a.price;
  //   return 0;
  // });

  const sortedProducts = [...filteredProducts, ...filteredProducts, ...filteredProducts, ...filteredProducts, ...filteredProducts, ...filteredProducts];

  return (
    <div>

      <Navbar />

      <div className="px-4 py-8 max-w-7xl mx-auto">
        {/* Page Title & Sort */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{collection.title}</h1>

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
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                imageUrl={product.imageUrl}
                price={product.price}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
