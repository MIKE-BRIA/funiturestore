import { useLocation } from "react-router-dom";
import useGetProducts from "../hooks/useGetProduct";
import ProductCard from "../components/productCard";
import { Link } from "react-router-dom";

const SkeletonProductCard = () => (
  <div className="border border-gray-300 rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-gray-300"></div>
    <div className="p-4">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-6 bg-gray-300 rounded w-1/3"></div>
    </div>
  </div>
);

const Shop = () => {
  const { products, loading, error } = useGetProducts(
    "/api/products/getProducts"
  );
  const location = useLocation();

  // Get the search query from the URL
  const query = new URLSearchParams(location.search).get("search");

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query ? query.toLowerCase() : "")
  );

  return (
    <div>
      <div className="relative mb-4">
        <img
          src="images/dining.jpg"
          alt="dining table image"
          className="h-52 w-full object-cover opacity-40"
        />
        <p className="absolute font-bold inset-0 flex items-center justify-center text-2xl text-black">
          Shop with us
        </p>
      </div>

      <div>
        {/* Display skeleton loaders when loading */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-4 mx-4">
            {Array.from({ length: 12 }).map((_, index) => (
              <SkeletonProductCard key={index} />
            ))}
          </div>
        )}

        {/* Display error if any */}
        {error && <p className="text-center text-red-500">Error: {error}</p>}

        {/* Display actual products when not loading or in error state */}
        {!loading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-4 mx-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`${product.category}/${product._id}`}
                >
                  <ProductCard
                    img={product.img}
                    name={product.name}
                    brand={product.brand}
                    price={product.price}
                  />
                </Link>
              ))
            ) : (
              <p className="col-span-4 flex justify-center items-center h-[calc(100vh-200px)] text-center text-3xl">
                No products found matching your search.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
