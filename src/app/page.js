import Image from "next/image";
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar/App";
import Banner from "@/components/banner/App";
import Collection from "@/sections/collection/App";
import Products from "@/sections/products/App";

export default function Home() {
  return (
   <div className="h-full">
    <div className="h-screen w-">
      <Navbar />
      <Banner imageUrl={"/images/banner.jpg"} />
      <Collection />
      <Products/>
      <Banner imageUrl={"https://i.pinimg.com/736x/58/2a/cd/582acdd89636b709a78c27a2d6440700.jpg"}  />
      <Products />
    </div>
   </div>
  );
}
