const ProductCard = ({ img, brand, price, name }) => {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  }).format(price);
  return (
    <div className="border border-gray-300 rounded-lg shadow-md overflow-hidden">
      <img src={img} alt={brand} className="w-full h-48 object-cover" />
      <div className="p-4">
        <p className="font-semibold">{name}</p>
        <p className="text-lg  mb-2">{brand}</p>
        <p className="text-xl font-bold text-gray-900">{formattedPrice}</p>
      </div>
    </div>
  );
};

export default ProductCard;
