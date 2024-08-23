import InputArea from "./InputArea";
import { FcAddImage } from "react-icons/fc";
import useUserDetails from "../hooks/useUserDetails";
import { ClipLoader } from "react-spinners";
import usePreviewImg from "../hooks/usePreviewImg";
import { useRef, useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";

const UserSettings = ({ setActiveTab }) => {
  const { handleImageChange, imgUrl } = usePreviewImg();
  const { userDetails, loading } = useUserDetails();
  const imageRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const showToast = useShowToast();

  const id = userDetails?._id;

  const [formData, setFormData] = useState({
    name: userDetails?.name || "",
    email: userDetails?.email || "",
    residence: userDetails?.residence || "",
    number: userDetails?.number || "",
    profilePic: userDetails?.profilePic || "",
  });

  useEffect(() => {
    if (userDetails) {
      setFormData({
        name: userDetails.name || "",
        email: userDetails.email || "",
        residence: userDetails.residence || "",
        number: userDetails.number || "",
        profilePic: imgUrl || userDetails.profilePic || "",
      });
    }
  }, [userDetails, imgUrl]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <ClipLoader color="#000" loading={true} size={50} />
      </div>
    );
  }

  const handleAddImageClick = (e) => {
    e.preventDefault();
    imageRef.current.click();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`/api/users/updateUser/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      showToast("User Profile Updated successfully");
      setActiveTab("overview");
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setIsLoading(false); // End loading
    }
  }

  return (
    <>
      <div>
        <div className="flex p-4 gap-6">
          <div className="flex-1">
            <form onSubmit={handleSubmit}>
              <InputArea
                title={"UserName"}
                type={"text"}
                name="name"
                placeholder={"Enter your name"}
                value={formData.name} // Bind to formData
                onChange={handleChange}
              />
              <InputArea
                title={"User email"}
                type={"email"}
                name="email"
                placeholder={"Enter your email address"}
                value={formData.email} // Bind to formData
                onChange={handleChange}
              />
              <InputArea
                title={"Area of Residence"}
                type={"text"}
                name="residence"
                placeholder={"Enter your area of residence"}
                value={formData.residence} // Bind to formData
                onChange={handleChange}
              />
              <input
                type="file"
                hidden
                accept="image/*" // Ensure only image files can be selected
                onChange={handleImageChange}
                ref={imageRef}
              />

              <button
                onClick={handleAddImageClick}
                className="flex cursor-pointer gap-2 my-2 border border-1 border-blue-200 p-2 rounded-lg"
              >
                <FcAddImage size={24} />
                <label htmlFor="">Add Profile Picture</label>
              </button>
              <div className="flex gap-2">
                <InputArea
                  title={"Phone Number"}
                  type={"text"}
                  name="number"
                  placeholder={"Enter your Phone Number"}
                  className="flex-1"
                  value={formData.number} // Bind to formData
                  onChange={handleChange}
                />
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={() => setActiveTab("overview")}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                    isLoading
                      ? "bg-blue-300 text-blue-800 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                  type="submit"
                  disabled={isLoading}
                >
                  Update Account Settings
                </button>
              </div>
            </form>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <p className="mb-2 font-semibold text-gray-700">Image Preview</p>
            <div className="border border-gray-300 rounded-lg p-4 w-full h-full flex items-center justify-center bg-white">
              {imgUrl || formData.profilePic ? (
                <img
                  src={imgUrl || formData.profilePic}
                  alt="Preview"
                  value={formData.profilePic}
                  className="w-96 h-96 object-cover"
                />
              ) : (
                <span className="text-gray-500">No image selected</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSettings;
