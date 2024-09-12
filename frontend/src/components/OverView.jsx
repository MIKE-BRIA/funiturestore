import useUserDetails from "../hooks/useUserDetails";
import { IoPencilOutline } from "react-icons/io5";
import { FaWallet } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";

const OverView = ({ setActiveTab }) => {
  const { loading, userDetails } = useUserDetails();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <ClipLoader color="#000" loading={true} size={50} />
      </div>
    );
  }

  if (!userDetails) {
    return <p>No user details available.</p>;
  }

  return (
    <div className="flex flex-col md:grid grid-cols-2 gap-3 md:gap-4">
      <div className="bg-gray-300 border border-red-200">
        <h2 className="p-4 border border-b-red-200">ACCOUNT DETAILS</h2>
        <div className="p-4">
          <p className=" mb-2">{userDetails.name}</p>
          <p>{userDetails.email}</p>
        </div>
      </div>
      <div className="bg-gray-300 border border-red-200 ">
        <div className="flex justify-between p-4 border border-b-red-200">
          <h2>ADDRESS BOOK</h2>
          <IoPencilOutline
            color="yellow"
            size={24}
            className="cursor-pointer"
            onClick={() => setActiveTab("settings")}
          />
        </div>
        <div className="p-4">
          <h2 className=" mb-2">Your default shipping address</h2>
          <div>
            <p>{userDetails.name}</p>
            <p>{userDetails.email}</p>
            <p>
              {userDetails.residence ? (
                userDetails.residence
              ) : (
                <span className="text-red-500">
                  Please Enter your Address of residence
                </span>
              )}
            </p>
            <p>
              {userDetails.number ? (
                userDetails.number
              ) : (
                <span className="text-red-500">
                  Please Enter Your Phone Number
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-300 border border-red-200 h-48">
        <div className=" p-4 border border-b-red-200">
          <h2>FURNIRO STORE CREDIT</h2>
        </div>
        <div className="flex p-4 gap-4">
          <FaWallet size={24} color="blue" />
          <p className="text-blue-300">Furniro store credit balance: USD 0</p>
        </div>
      </div>
      <div className="bg-gray-300 border border-red-200 ">
        <div className=" p-4 border border-b-red-200">
          <h2>NEWSLETTER PREFERENCES</h2>
        </div>
        <div className="flex flex-col p-4 gap-4">
          <p className="mb-6">
            You are currently not subscribed to any of our newsletters
          </p>
          <p className="text-yellow-200 mt-auto">EDIT NEWSLETTER PREFERENCES</p>
        </div>
      </div>
    </div>
  );
};

export default OverView;
