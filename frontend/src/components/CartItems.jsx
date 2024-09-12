import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaMinus } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import {
  removeItemFromCart,
  updateCartData,
  deleteitem,
} from "../store/slices/cartSlice";

const CartItems = () => {
  const dispatch = useDispatch();
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const formatCurrency = (amount, locale = "en-US", currency = "USD") => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const handleIncrement = (item) => {
    const newQuantity = item.quantity + 1;
    dispatch(updateCartData({ cartItemId: item._id, quantity: newQuantity }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      dispatch(updateCartData({ cartItemId: item._id, quantity: newQuantity }));
    } else {
      dispatch(removeItemFromCart(item._id));
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteitem(id));
    // window.location.reload();
  };

  return (
    <div className="bg-gray-300 p-6 rounded-md">
      <h2 className="mb-3">
        Cart<span className="ml-1">({cartQuantity})</span>
      </h2>
      {cartItems.length ? (
        cartItems.map((cart) => (
          <div
            key={cart._id}
            className="border-t border-gray-300 pt-2 py-6 flex justify-between"
          >
            <div className="flex flex-col gap-6">
              <div className="flex gap-3">
                <img
                  src={cart.img}
                  alt="product image"
                  className="w-20 h-20 object-cover"
                />
                <p className="text-sm md:text-lg">{cart.name}</p>
              </div>

              <div>
                <button
                  className="flex gap-3 items-center"
                  onClick={() => handleDelete(cart._id)}
                >
                  <FaTrash size={24} color="red" />
                  <p className="text-red-400">REMOVE</p>
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-sm md:text-xl">
                  {formatCurrency(Number(cart.totalPrice), "en-US", "EUR")}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-yellow-100 p-1 rounded-md"
                  onClick={() => handleDecrement(cart)}
                >
                  <FaMinus size={24} />
                </button>
                <p className="text-xl">{cart.quantity}</p>
                <button
                  className="bg-yellow-300 p-1 rounded-md"
                  onClick={() => handleIncrement(cart)}
                >
                  <IoMdAdd size={24} />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>
          <p className="text-xl mt-6 text-yellow-400">
            No items added to cart yet
          </p>
        </div>
      )}
    </div>
  );
};

export default CartItems;

// import { useDispatch, useSelector } from "react-redux";
// import { FaTrash } from "react-icons/fa";
// import { IoMdAdd } from "react-icons/io";
// import { FaMinus } from "react-icons/fa";
// import {
//   removeItemFromCart,
//   // updateCartItemQuantity,
//   // deleteItem,
//   updateCartData,
// } from "../store/slices/cartSlice";
// import { deleteitem } from "../store/slices/cartSlice";

// const CartItems = () => {
//   const dispatch = useDispatch();
//   const cartQuantity = useSelector((state) => state.cart.totalQuantity);
//   const cartItems = useSelector((state) => state.cart.cartItems);

//   const formatCurrency = (amount, locale = "en-US", currency = "USD") => {
//     return new Intl.NumberFormat(locale, {
//       style: "currency",
//       currency: currency,
//     }).format(amount);
//   };

//   // const handleIncrement = (item) => {
//   //   dispatch(
//   //     updateCartItemQuantity({ id: item.id, quantity: item.quantity + 1 })
//   //   );
//   // };

//   // const handleDecrement = (item) => {
//   //   if (item.quantity > 1) {
//   //     dispatch(
//   //       updateCartItemQuantity({ id: item.id, quantity: item.quantity - 1 })
//   //     );
//   //   } else {
//   //     dispatch(removeItemFromCart(item.id));
//   //   }
//   // };

//   const handleIncrement = (item) => {
//     const newQuantity = item.quantity + 1;
//     dispatch(updateCartData({ cartItemId: item._id, quantity: newQuantity }));
//   };

//   const handleDecrement = (item) => {
//     if (item.quantity > 1) {
//       const newQuantity = item.quantity - 1;
//       dispatch(updateCartData({ cartItemId: item._id, quantity: newQuantity }));
//     } else {
//       dispatch(removeItemFromCart(item._id));
//     }
//   };

//   const handleDelete = (id) => {
//     // console.log("Deleting item with ID:", id);
//     dispatch(deleteitem(id));
//     window.location.reload();
//   };

//   return (
//     <div className="bg-gray-300 p-6 rounded-md">
//       <h2 className="mb-3">
//         Cart<span className="ml-1">({cartQuantity})</span>
//       </h2>
//       {cartItems.length ? (
//         cartItems.map((cart) => (
//           <div
//             key={cart._id}
//             className="border-t border-gray-300 pt-2 py-6 flex justify-between"
//           >
//             <div className="flex flex-col gap-6">
//               <div className="flex gap-3">
//                 <img
//                   src={cart.img}
//                   alt="product image"
//                   className="w-20 h-20 object-cover"
//                 />
//                 <p>{cart.name}</p>
//               </div>

//               <div>
//                 <button
//                   className="flex gap-3 items-center"
//                   onClick={() => handleDelete(cart._id)}
//                 >
//                   <FaTrash size={24} color="red" />
//                   <p className="text-red-400">REMOVE</p>
//                 </button>
//               </div>
//             </div>
//             <div className="flex flex-col justify-between">
//               <div>
//                 <p className="text-xl">
//                   {formatCurrency(Number(cart.totalPrice), "en-US", "EUR")}
//                 </p>
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   className="bg-yellow-100 p-1 rounded-md"
//                   onClick={() => handleDecrement(cart)}
//                 >
//                   <FaMinus size={24} />
//                 </button>
//                 <p className="text-xl">{cart.quantity}</p>
//                 <button
//                   className="bg-yellow-300 p-1 rounded-md"
//                   onClick={() => handleIncrement(cart)}
//                 >
//                   <IoMdAdd size={24} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <div>
//           <p className="text-xl mt-6 text-yellow-400">
//             No items added to cart yet
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartItems;
