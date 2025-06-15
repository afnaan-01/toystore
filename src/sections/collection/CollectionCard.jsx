import Link from "next/link";

const CollectionCard = ({ title, imageUrl, link }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300">
      <Link href={link}>
        <div className="relative w-full h-48 sm:h-60 md:h-72">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
      </Link>
    </div>
  );
};

export default CollectionCard;
