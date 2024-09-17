import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./productCard";
import { Link } from "react-router-dom";
import {
  clearAllFavourites,
  clearFavourites,
  deleteFavourites,
  removeItemFromFavourite,
} from "../store/slices/favouriteSlice";
import useUserDetails from "../hooks/useUserDetails";
const UserSaved = () => {
  const favouriteItems = useSelector((state) => state.favourite.favouriteItems);
  const dispatch = useDispatch();
  const { userDetails } = useUserDetails();
  const userId = userDetails?._id;

  function handleRemoveItem(productId) {
    dispatch(removeItemFromFavourite(productId));
    dispatch(deleteFavourites({ userId, productId }));
  }

  function deleteAll() {
    dispatch(clearFavourites());
    dispatch(clearAllFavourites(userId));
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-lg font-mono">Your Favourite Items</h2>
        <button
          onClick={deleteAll}
          className="text-lg bg-blue-300 p-2 rounded-md"
        >
          Clear Favourites
        </button>
      </div>
      {favouriteItems.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-4 mx-4">
          {favouriteItems.map((product) => (
            <div key={product._id} className="relative">
              <Link to={`/shop/${product.category}/${product.productId}`}>
                <ProductCard
                  img={product.img}
                  name={product.name}
                  brand={product.brand}
                  price={product.price}
                />
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleRemoveItem(product.productId);
                }}
                className=" bg-red-200 text-lg rounded mt-1 w-full cursor-pointer"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-96">
          <p className="text-lg md:text-2xl text-center">
            There are no products added to your favourites
          </p>
        </div>
      )}
    </div>
  );
};

export default UserSaved;
