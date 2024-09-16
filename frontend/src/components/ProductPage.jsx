import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import useGetProductById from "../hooks/useGetProductByID";
import useGetProducts from "../hooks/useGetProduct";
import { Link } from "react-router-dom";
import ProductCard from "./productCard";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, saveCartItem } from "../store/slices/cartSlice";
import useShowToast from "../hooks/useShowToast";
import useUserDetails from "../hooks/useUserDetails";
import {
  addItemToFavourite,
  saveFavouriteItem,
} from "../store/slices/favouriteSlice";

const ProductPage = () => {
  const { category, id } = useParams();
  const dispatch = useDispatch();
  // const cartItems = useSelector((state) => state.cart.cartItems);
  const showToast = useShowToast();
  const favouriteItems = useSelector((state) => state.favourite.favouriteItems);

  const { product, loading, error } = useGetProductById(
    `/api/products/getProduct/${id}`
  );
  const { products, loading: loaded } = useGetProducts(
    `/api/products/getProducts/category/${category}`
  );
  const { userDetails } = useUserDetails();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <ClipLoader color="#000" loading={true} size={50} />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (!product) {
    return <p className="text-center">Product not found</p>;
  }

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  }).format(product.price);

  const displayedProducts = products.slice(0, 8);

  const handleAddToCart = () => {
    if (!userDetails) {
      showToast("Please login to add item to cart");
      return;
    }

    const userString = localStorage.getItem("user-threads");

    if (!userString) {
      showToast("please login to add item to cart");
    }

    const item = {
      productId: product._id,
      name: product.name,
      price: product.price,
      img: product.img,
      quantity: 1,
      user: userDetails._id,
    };

    dispatch(
      addItemToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        img: product.img,
      })
    );

    dispatch(saveCartItem(item));
    showToast("Item added to cart successfully");
  };

  const handleAddToFavourite = () => {
    const exist = favouriteItems.find((fav) => fav.productId === product._id);

    if (exist) {
      showToast("Item already exists in favourites");
      return;
    }

    const favouriteItem = {
      productId: product._id,
      name: product.name,
      price: product.price,
      img: product.img,
      category: product.category,
      user: userDetails._id,
    };

    dispatch(addItemToFavourite(favouriteItem));
    dispatch(saveFavouriteItem(favouriteItem)).then(() =>
      showToast("Item added to favourite successfully")
    );
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-6 h-full md:h-96 mb-12 w-full p-6 bg-gray-100 rounded-lg shadow-lg">
        <div className="flex-1">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2 pb-2 border-b-2 border-gray-300">
              {product.name}
            </h2>
            <br />
            <p className="text-xl  text-gray-800 mb-2">{formattedPrice}</p>
            <p className="text-base text-gray-600 mb-2">
              <span className="font-semibold text-gray-800">Brand:</span>{" "}
              {product.brand}
            </p>
            <p className="text-base text-gray-600">{product.description}</p>
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-8">
            <button
              onClick={handleAddToFavourite}
              className="mt-4 flex-1 bg-blue-400 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Add to favourite
            </button>
            <button
              onClick={handleAddToCart}
              className="mt-4 flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      {product.description ? (
        <div>
          <hr className="w-full  border-t border-gray-300 mx-4" />
          <div className="flex flex-col items-center text-center p-4">
            <h1 className="text-2xl font-bold mb-4">Description</h1>
            <p className="text-base text-gray-600">{product.description}</p>
          </div>
        </div>
      ) : (
        ""
      )}
      <hr className="w-full mb-6  border-t border-gray-300 mx-4" />
      <div>
        <h1 className="text-center mb-10">Related Products</h1>
        <div>
          {loaded && (
            <div className="flex justify-center items-center h-96">
              <ClipLoader color="#000" loading={true} size={50} />
            </div>
          )}
          {!loading && !error && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-4 mx-4">
              {displayedProducts.map((product) => (
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
          <div>
            <h2 className="text-center my-8">
              <Link
                to="/shop"
                className=" border border-1 border-blue-300 py-3 px-7 rounded-lg"
              >
                show more
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
