import { useEffect, useCallback, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { Link } from "react-router-dom";

const AdminOrders = () => {
  const showToast = useShowToast();
  const [purchases, setPurchases] = useState([]);
  const [checkedPurchases, setCheckedPurchases] = useState({});
  const [secondCheckedPurchases, setSecondCheckedPurchases] = useState({});
  const [filterStatus, setFilterStatus] = useState("All");

  const fetchPurchases = useCallback(async () => {
    try {
      const res = await fetch("/api/purchases/getPurchases");
      const data = await res.json();
      setPurchases(data.reverse());

      const checkedInitial = {};
      const secondCheckedInitial = {};

      data.forEach((purchase) => {
        if (purchase.orderStatus === "delivered") {
          checkedInitial[purchase._id] = true;
        }
        if (purchase.orderStatus === "canceled") {
          secondCheckedInitial[purchase._id] = true;
        }
      });

      setCheckedPurchases(checkedInitial);
      setSecondCheckedPurchases(secondCheckedInitial);
    } catch (error) {
      showToast("Error", "Error loading purchase orders", "error");
    }
  }, [showToast]);

  useEffect(() => {
    fetchPurchases();
  }, [fetchPurchases]);

  const updateOrderstatus = async (purchaseId, status) => {
    try {
      const res = await fetch(`/api/purchases/updateStatus/${purchaseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderStatus: status }),
      });

      if (!res.ok) throw new Error("Failed to update purchase status");

      const updatedPurchase = await res.json();

      setPurchases((prevPurchases) =>
        prevPurchases.map((purchase) =>
          purchase._id === updatedPurchase._id ? updatedPurchase : purchase
        )
      );
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  const handleFirstCheckboxChange = async (purchaseId) => {
    const newCheckedState = !checkedPurchases[purchaseId];
    setCheckedPurchases((prevState) => ({
      ...prevState,
      [purchaseId]: newCheckedState,
    }));

    // Ensure the second checkbox is unchecked when the first one is checked
    if (newCheckedState) {
      setSecondCheckedPurchases((prevState) => ({
        ...prevState,
        [purchaseId]: false,
      }));
    }

    // Send request to update status in the database
    if (newCheckedState) {
      await updateOrderstatus(purchaseId, "delivered");
    }
  };

  const handleSecondCheckboxChange = async (purchaseId) => {
    const newCheckedState = !secondCheckedPurchases[purchaseId];
    setSecondCheckedPurchases((prevState) => ({
      ...prevState,
      [purchaseId]: newCheckedState,
    }));

    // Ensure the first checkbox is unchecked when the second one is checked
    if (newCheckedState) {
      setCheckedPurchases((prevState) => ({
        ...prevState,
        [purchaseId]: false,
      }));
    }

    // Send request to update status in the database
    if (newCheckedState) {
      await updateOrderstatus(purchaseId, "canceled");
    }
  };

  const filteredPurchases = purchases.filter((purchase) => {
    if (filterStatus === "All") {
      return true;
    } else {
      return purchase.orderStatus === filterStatus;
    }
  });

  return (
    <>
      <div>
        <div className="flex justify-between">
          <div>
            <h1>Orders List</h1>
          </div>
          <div className="mb-4">
            <label htmlFor="statusFilter" className="mr-2 text-lg">
              Filter by status:
            </label>
            <select
              id="statusFilter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2 border rounded-xl"
            >
              <option value="All">All</option>
              <option value="pending">Pending</option>
              <option value="canceled">Cancelled</option>
              <option value="delivered">Fulfilled</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <table className="basic">
            <thead>
              <tr>
                <td>Delivered</td>
                <td>Canceled</td>
                <td>Purchase id</td>
                <td>Date</td>
                <td>Status</td>
                <td>Amount</td>
              </tr>
            </thead>
            <tbody>
              {filteredPurchases.map((purchase) => {
                return (
                  <tr key={purchase._id}>
                    <td>
                      <input
                        type="checkbox"
                        value="delivered"
                        checked={checkedPurchases[purchase._id] || false}
                        onChange={() => handleFirstCheckboxChange(purchase._id)}
                        className="text-blue-500 focus:ring-blue-500"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        value="canceled"
                        checked={secondCheckedPurchases[purchase._id] || false}
                        onChange={() =>
                          handleSecondCheckboxChange(purchase._id)
                        }
                        className="ml-2 bg-red-500 text-red-500 focus:ring-red-500"
                      />
                    </td>
                    <td>
                      <Link to={`${purchase._id}`}>{purchase._id}</Link>
                    </td>
                    <td>
                      {new Date(purchase.purchaseDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </td>

                    <td>{purchase.orderStatus}</td>
                    <td>{purchase.totalAmount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminOrders;
