"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar/App";
import Banner from "@/components/banner/App";
import Collection from "@/sections/collection/App";
import Products from "@/sections/products/App";
import Footer from "@/components/footer/App";
import ImageSlider from "@/components/banner/ImageSlider";
import Trending from "@/sections/trending/App";
import Tagline from "@/sections/tagline/App";
import LandingSlider from "@/components/banner/LandingSlider"
import SquareBanner from "@/components/banner/SquareBanner";
import Badges from "@/components/servicefeatures/Badges";

export default function Home() {
  return (
    <div className="h-full bg-accent">
      {/* <Navbar />
        <Tagline /> */}
      {/* <Banner imageUrl={"/images/banner.jpg"} /> */}
      {/* <ImageSlider />
        <Trending />

        <Collection />
        <Products text={"Popular Toys"} id={4} />

        <Banner imageUrl={"https://i.pinimg.com/736x/58/2a/cd/582acdd89636b709a78c27a2d6440700.jpg"} />
        <Products text={"Best Selling Puzzles"} id={2} />

        <Banner imageUrl={"https://i.pinimg.com/736x/7a/c5/5b/7ac55b1082aef62f34f793b024273008.jpg"} />
        <Products text={"Best Selling Cars"} id={3} />

        <Banner imageUrl={"https://i.pinimg.com/736x/15/50/97/155097f5c076620b76d28f964052aac6.jpg"} />
        <Products text={"Best Selling Action Heroes"} id={1} />

        <Footer /> */}

      <div className="h-screen flex flex-col">
        <Navbar />
        <LandingSlider />
      </div>

      <Collection />

      <div className="my-10 max-w-[1350px] mx-auto flex flex-col md:flex-row p-2 justify-between bg-white rounded-2xl">
        <Trending />
        <SquareBanner />
      </div>

      <Products text={"Best Selling Cars"} id={3} />

      {/*Featured Products Banners here */}
      <div className="max-w-[1350px] mx-auto">

      </div>

      {/* Trust Badges */}
      <div>
        <Badges />
      </div>

      {/* Social Media Photos/Videos */}
      <div>

      </div>

      <Footer />

    </div>
  );
}
