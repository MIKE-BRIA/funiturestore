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

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { userDetails } = useUserDetails();

  return (
    <div className="container mx-auto p-6">
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
          <FaUserEdit /> Overview
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`flex items-center gap-2 p-2 ${
            activeTab === "orders"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-600"
          }`}
        >
          <HiOutlineClipboardList /> Orders
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={`flex items-center gap-2 p-2 ${
            activeTab === "saved"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-600"
          }`}
        >
          <AiOutlineHeart /> Saved Items
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`flex items-center gap-2 p-2 ${
            activeTab === "settings"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-600"
          }`}
        >
          <CiSettings /> Settings
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
            <div className="grid grid-cols-4 gap-4">
              <div className="border p-4 rounded">
                <img
                  src="/product1.jpg"
                  alt="Product 1"
                  className="w-full h-40 object-cover mb-2"
                />
                <p className="font-semibold">Product Name 1</p>
                <p>$50.00</p>
              </div>
              <div className="border p-4 rounded">
                <img
                  src="/product2.jpg"
                  alt="Product 2"
                  className="w-full h-40 object-cover mb-2"
                />
                <p className="font-semibold">Product Name 2</p>
                <p>$30.00</p>
              </div>
            </div>
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
