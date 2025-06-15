import Image from "next/image";
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar/App";
import Banner from "@/components/banner/App";

export default function Home() {
  return (
   <div className="h-full">
    <div className="h-screen w-">
      <Navbar />
      <Banner />
    </div>
   </div>
  );
}
