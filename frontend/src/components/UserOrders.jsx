import { useEffect, useCallback, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import useUserDetails from "../hooks/useUserDetails";
import { ClipLoader } from "react-spinners";

const UserOrders = () => {
  const { userDetails, loading } = useUserDetails();
  const [purchases, setPurchases] = useState([]);
  const showToast = useShowToast();

  const getOrders = useCallback(async () => {
    try {
      const res = await fetch(`/api/purchases/getPurchases`);
      const data = await res.json();
      //   console.log("all purchases", data);

      const userdata = data.filter((data) => data.user === userDetails?._id);
      console.log("user purchase", userdata);
      setPurchases(userdata.reverse());
    } catch (error) {
      showToast(error.message);
      console.log("error: ", error.message);
    }
  }, [showToast, userDetails?._id]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-200 text-green-800";
      case "canceled":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div>
      {loading ? (
        // <h1>User details still loading </h1>
        <div className="flex justify-center items-center h-96">
          <ClipLoader color="#000" loading={true} size={50} />
        </div>
      ) : (
        <div>
          {purchases.map((purchase) => (
            <div key={purchase._id} className="p-4 border border-cyan-400 my-2">
              <div className="flex gap-4">
                {/* <img
                  src={purchase.products.map((p) => p.productImg)}
                  alt=""
                  className="user-imgorder"
                /> */}
                {purchase.products.map((p) => (
                  <div key={p._id}>
                    <img src={p.productImg} alt="" className="user-imgorder" />
                    <p className="mt-3">{p.name}</p>
                  </div>
                ))}
                <div>
                  {/* <p>{purchase.products.map((p) => p.name)}</p> */}
                  <p>Order: {purchase.paymentMethod.slice(0, 10)}</p>
                  <p
                    className={`${getStatusColor(
                      purchase.orderStatus
                    )} p-1 inline-block rounded-md`}
                  >
                    {purchase.orderStatus}
                  </p>
                  <p>
                    Date of Purchase:{" "}
                    {new Date(purchase.purchaseDate).toLocaleDateString(
                      "en-GB"
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
