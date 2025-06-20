"use client"

import Card from "@/components/card/App";
import { use, useEffect, useState } from "react";
import useAllProducts from "@/allContext/allproducts";

const App = ({ text, id }) => {

  const {allProducts} = useAllProducts();
  const [products, setProducts] = useState([]);

  const colorNames = [
   "slate", "gray", "zinc", "neutral", "stone",
  "red", "orange", "amber", "yellow", "lime",
  "green", "emerald", "teal", "cyan", "sky",
  "blue", "indigo", "violet", "purple", "fuchsia",
  "pink", "rose", "black", "white", "transparent", "current"
  ];

  const [bgColor, setBgColor] = useState();

  useEffect(() => {

    const colorIndex = Math.floor(Math.random() * colorNames.length);
    setBgColor(colorNames[colorIndex]);

  }, []);

  useEffect(()=>{
       const data = allProducts.filter((product) => product.collectionId === id);
       setProducts(data);
  },[allProducts]);

  return (
    <div className={`bg-${bgColor}-50`}>
      <section className="px-4 py-10 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
          {text}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product._id}
              id={product._id}
              title={product.productName}
              imageUrl={product.images[0]}
              price={product.finalPrice}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;