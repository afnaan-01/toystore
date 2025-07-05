"use client";

import Link from "next/link";
import 'remixicon/fonts/remixicon.css'

const CollectionCard = ({ title, imageUrl, id }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 group">
      <Link href={`/collection/${id}`}>
        <div className="relative w-full aspect-square">
          {/* h-48 sm:h-60 md:h-72 */}
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-800">
            {title} 
            <i className="relative ri-arrow-right-long-line transition-all duration-500 group-hover:left-2"></i>
            </h3>
        </div>
      </Link>
    </div>
  );
};

export default CollectionCard;
