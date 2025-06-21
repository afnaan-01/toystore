import Link from "next/link";

const Banner = ({imageUrl}) => {
  return (
    <section className="bg-gradient-to-br from-blue-100 to-pink-100 aspect-video">
     <img
      src={imageUrl}
      alt="Banner Image"
      className="w-full h-full object-cover mb-6"
      height={1000}
      width={1000}
      />
    </section>
  );
};

export default Banner;
