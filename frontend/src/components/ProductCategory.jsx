import { useParams } from "react-router-dom";
import useGetProducts from "../hooks/useGetProduct";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import ProductCard from "./productCard";

const ProductCategory = () => {
  const { category } = useParams();
  const { products, loading } = useGetProducts("/api/products/getProducts/");

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <ClipLoader color="#000" loading={true} size={50} />
      </div>
    );
  }

  const filteredProducts = products.filter(
    (product) => product.category === category
  );

  return (
    <div>
      <h1 className="p-6 text-center">Products in {category}</h1>
      <div>
        {!loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-4">
            {filteredProducts.map((product) => (
              <Link
                key={product._id}
                to={`/shop/${product.category}/${product._id}`}
              >
                <ProductCard
                  img={product.img}
                  name={product.name}
                  brand={product.brand}
                  price={product.price}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCategory;
