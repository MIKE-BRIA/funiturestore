import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CartItems from "../components/CartItems";
import Checkout from "../components/Checkout";
import { fetchCartItems } from "../store/slices/cartSlice";
import useUserDetails from "../hooks/useUserDetails";
import { ClipLoader } from "react-spinners";

const Cart = () => {
  const dispatch = useDispatch();
  const { userDetails, loading } = useUserDetails();
  // const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    if (userDetails) {
      const userId = userDetails._id;
      dispatch(fetchCartItems(userId));
    }
  }, [userDetails, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <ClipLoader color="#000" loading={true} size={50} />
      </div>
    );
  }
  if (!userDetails) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-2xl text-blue-300 text-center">
          Please Login to view cart
        </p>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="relative mb-4">
          <img
            src="images/dining.jpg"
            alt="dining table image"
            className="h-52 w-full object-cover opacity-40"
          />
          <p className="absolute font-bold inset-0 flex items-center justify-center text-2xl text-black">
            Finish Your Shopping By Checking out
          </p>
        </div>
        <div className="flex flex-col md:flex-row mt-4 gap-4 p-6 mx-1 md:mx-8">
          <div className="w-full md:w-3/5">
            <CartItems />
          </div>
          <div className="w-full md:w-2/5">
            <div className="w-full">
              <Checkout />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
