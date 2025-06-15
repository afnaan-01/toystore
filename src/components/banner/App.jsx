import Link from "next/link";

const Banner = () => {
  return (
    <section className="bg-gradient-to-br from-blue-100 to-pink-100 h-full">
     <img
      src="/images/banner.jpg"
      alt="Banner Image"
      className="w-full h-full object-cover mb-6"
      height={1000}
      width={1000}
      />
    </section>
  );
};

export default Banner;
