// ImageSlider.jsx
import React, { useEffect, useState } from 'react';

const images = [
  'https://i.pinimg.com/736x/58/2a/cd/582acdd89636b709a78c27a2d6440700.jpg',
  'https://i.pinimg.com/736x/7a/c5/5b/7ac55b1082aef62f34f793b024273008.jpg',
  'https://i.pinimg.com/736x/15/50/97/155097f5c076620b76d28f964052aac6.jpg',
  // Add more images as needed
];

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // 5 seconds

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Slide ${index}`}
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        />
      ))}
    </div>
  );
};

export default ImageSlider;
