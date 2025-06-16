"use client"

import Card from "@/components/card/App";

const App = ({text}) => {
  const products = [
    {
      id: "1",
      title: "Remote Control Car",
      imageUrl: "https://i.pinimg.com/736x/f6/1d/29/f61d29179830a773708020086ebd5cb3.jpg",
      price: 1299,
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

  return (
    <section className="px-4 py-10 max-w-7xl mx-auto ">
      <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
        {text}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            title={product.title}
            imageUrl={product.imageUrl}
            price={product.price}
          />
        ))}
      </div>
    </section>
  );
}

export default App;