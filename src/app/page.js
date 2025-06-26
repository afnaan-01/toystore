"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar/App";
import Banner from "@/components/banner/App";
import Collection from "@/sections/collection/App";
import Products from "@/sections/products/App";
import Footer from "@/components/footer/App";
import ImageSlider from "@/components/banner/ImageSlider";

export default function Home() {
  return (
    <div className="h-full">
      <div className="h-screen w-">
        <Navbar />
        {/* <Banner imageUrl={"/images/banner.jpg"} /> */}
        <ImageSlider />

        <Collection />
        <Products text={"Popular Toys"} id={4} />

        <Banner imageUrl={"https://i.pinimg.com/736x/58/2a/cd/582acdd89636b709a78c27a2d6440700.jpg"} />
        <Products text={"Best Selling Puzzles"} id={2} />

        <Banner imageUrl={"https://i.pinimg.com/736x/7a/c5/5b/7ac55b1082aef62f34f793b024273008.jpg"} />
        <Products text={"Best Selling Cars"} id={3} />

        <Banner imageUrl={"https://i.pinimg.com/736x/15/50/97/155097f5c076620b76d28f964052aac6.jpg"} />
        <Products text={"Best Selling Action Heroes"} id={1} />

        <Footer />
      </div>
    </div>
  );
}
