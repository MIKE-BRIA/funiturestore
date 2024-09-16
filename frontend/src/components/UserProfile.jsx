import { useState } from "react";
// import { Link } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { HiOutlineClipboardList } from "react-icons/hi";
import { AiOutlineHeart } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import OverView from "./OverView";
import UserSettings from "./UserSettings";
import useUserDetails from "../hooks/useUserDetails";
import UserOrders from "./UserOrders";
import UserSaved from "./UserSaved";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFavourites } from "../store/slices/favouriteSlice";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { userDetails } = useUserDetails();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userDetails) {
      const userId = userDetails._id;
      dispatch(getFavourites(userId));
    }
  }, [userDetails, dispatch]);

  return (
    <div className="container mx-auto p-3 md:p-6">
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={userDetails?.profilePic || "images/dining.jpg"}
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 object-cover border-gray-300"
        />
        <div>
          <h1 className="text-3xl font-semibold">{userDetails?.name}</h1>
          <button
            className="mt-2 flex items-center text-blue-500"
            onClick={() => setActiveTab("settings")}
          >
            <FaUserEdit className="mr-1" /> Edit Profile
          </button>
        </div>
      </div>

      {/* Tabs for Navigation */}

      <div className="flex justify-between mb-6">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex items-center gap-2 p-2 ${
            activeTab === "overview"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-600"
          }`}
        >
          <FaUserEdit className="text-sm sm:text-base" /> Overview
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`flex items-center gap-2 p-2 ${
            activeTab === "orders"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-600"
          }`}
        >
          <HiOutlineClipboardList className="text-sm sm:text-base" /> Orders
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={`flex items-center gap-2 p-2 ${
            activeTab === "saved"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-600"
          }`}
        >
          <AiOutlineHeart className="text-sm sm:text-base" /> Saved
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`flex items-center gap-2 p-2 ${
            activeTab === "settings"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-600"
          }`}
        >
          <CiSettings className="text-sm sm:text-base" /> Settings
        </button>
      </div>

      {/* Content Sections */}
      <div>
        {activeTab === "overview" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Account Overview</h2>
            <OverView setActiveTab={setActiveTab} />
          </div>
        )}

        {activeTab === "orders" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>

            <div>
              <UserOrders />
            </div>
          </div>
        )}

        {activeTab === "saved" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Saved Items</h2>
            <UserSaved />
          </div>
        )}

        {activeTab === "settings" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Settings</h2>
            <UserSettings setActiveTab={setActiveTab} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
