import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import useUserDetails from "../hooks/useUserDetails";
import { ClipLoader } from "react-spinners";
import { clearCart } from "../store/slices/cartSlice";

const Checkout = () => {
  const [showPayPalButtons, setShowPayPalButtons] = useState(false);
  const totalPrice = useSelector((state) => state.cart.totalAmount);
  const selectedProducts = useSelector((state) => state.cart.cartItems);
  const { userDetails, loading, error } = useUserDetails();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  }).format(totalPrice);

  const initialOptions = {
    "client-id":
      "ASoL3yDsjHTdhXjmbdbw7hp3Ikxu9St5Yh8G31SVAOPhFmoSR_vhlER6mu07cNd1QztT6ndIuN3FaZo3",
    currency: "EUR",
    intent: "capture",
  };

  if (loading) {
    return (
      <div>
        <ClipLoader color="#000" loading={true} size={50} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userDetails) {
    return <div>No user details found. Please log in again.</div>;
  }

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div className="bg-yellow-100 p-4 rounded-md">
        <h2>CART SUMMARY</h2>
        <div className="flex justify-between my-4">
          <p className="text-lg">Subtotal</p>
          <p className="text-xl">{formattedPrice}</p>
        </div>
        <div className="flex items-center justify-center">
          {!showPayPalButtons ? (
            <button
              onClick={() => setShowPayPalButtons(true)}
              className="bg-blue-500 text-white w-full px-4 py-2 rounded-md"
            >
              Checkout
            </button>
          ) : (
            <div className="paypal-button-container">
              <PayPalButtons
                style={{
                  layout: "vertical",
                  color: "blue",
                  shape: "rect",
                  label: "checkout",
                  height: 55,
                }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: totalPrice.toFixed(2),
                          currency_code: "EUR",
                        },
                      },
                    ],
                    application_context: {
                      shipping_preference: "NO_SHIPPING",
                      user_action: "PAY_NOW",
                    },
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then((details) => {
                    const payerName = details.payer.name.given_name;
                    const transactionId = details.id;
                    const amount = details.purchase_units[0].amount.value;

                    fetch("/api/purchases/added", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        payerName,
                        transactionId,
                        amount,
                        products: selectedProducts,
                        userId: userDetails._id,
                      }),
                    });

                    dispatch(clearCart());

                    navigate("/payment-success", {
                      state: { payerName, transactionId, amount: `€${amount}` },
                    });
                  });
                }}
              />
            </div>
          )}
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default Checkout;
