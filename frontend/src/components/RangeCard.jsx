// import { useState, useEffect } from "react";
// import { Blurhash } from "react-blurhash";

// const RangeCard = ({ title, source }) => {
//   const [imageLoaded, setImageLoaded] = useState(false);

//   useEffect(() => {
//     const img = new Image();

//     img.onload = () => {
//       setImageLoaded(true);
//     };

//     img.src = source;
//   }, [source]);

//   return (
//     <div className="flex flex-col items-center w-full max-w-xs">
//       <div className="w-full h-60 sm:h-80 rounded-lg overflow-hidden shadow-md bg-white transform transition-transform hover:-translate-y-1">
//         {!imageLoaded && (
//           <Blurhash
//             hash="L9Kd}C-U00_NTx00DjIUD$%N%NIU"
//             width={100}
//             height={100}
//             resolutionX={32}
//             resolutionY={32}
//             punch={1}
//           />
//         )}
//         {imageLoaded && (
//           <img
//             className="w-full h-full object-cover"
//             src={source}
//             alt={title}
//           />
//         )}
//       </div>
//       <p className="mt-4 text-lg text-gray-800">{title}</p>
//     </div>
//   );
// };

// export default RangeCard;

import { useState, useEffect } from "react";
import { Blurhash } from "react-blurhash";

const RangeCard = ({ title, source }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      setImageLoaded(true);
    };

    img.src = source;

    // Cleanup to avoid memory leaks
    return () => {
      img.onload = null;
    };
  }, [source]);

  return (
    <div className="flex flex-col items-center w-full max-w-xs">
      {/* Container */}
      <div className="relative w-full h-60 sm:h-80 rounded-lg overflow-hidden shadow-md bg-white transform transition-transform hover:-translate-y-1">
        {/* Blurhash Placeholder */}
        {!imageLoaded && (
          <Blurhash
            hash="L9Kd}C-U00_NTx00DjIUD$%N%NIU"
            className="absolute inset-0 w-full h-60 object-cover"
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
        )}

        {/* Actual Image */}
        {imageLoaded && (
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={source}
            alt={title}
          />
        )}
      </div>

      {/* Title */}
      <p className="mt-4 text-lg text-gray-800">{title}</p>
    </div>
  );
};

export default RangeCard;
