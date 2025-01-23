import { useState } from "react";

const ProductCard = ({ img, brand, price, name }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  }).format(price);

  return (
    <div className="border border-gray-300 rounded-lg shadow-md overflow-hidden">
      {/* Image wrapper to position skeleton and image */}
      <div className="relative w-full h-48 bg-gray-200">
        {/* Skeleton loader */}
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
        )}
        {/* Actual image */}
        <img
          src={img}
          alt={brand}
          className={`w-full h-48 object-cover transition-opacity duration-500 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setIsImageLoaded(true)} // Mark image as loaded
        />
      </div>
      <div className="p-4">
        <p className="font-semibold">{name}</p>
        <p className="text-lg mb-2">{brand}</p>
        <p className="text-xl font-bold text-gray-900">{formattedPrice}</p>
      </div>
    </div>
  );
};

export default ProductCard;
