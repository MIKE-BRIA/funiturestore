import { useNavigate, useParams } from "react-router-dom";
import InputArea from "./InputArea";
import { FcAddImage } from "react-icons/fc";
import { useRef, useState, useEffect } from "react";
import usePreviewImg from "../hooks/usePreviewImg";
import useShowToast from "../hooks/useShowToast";

const AddProduct = () => {
  const navigate = useNavigate();
  const imageRef = useRef();
  const showToast = useShowToast();
  const { handleImageChange, imgUrl } = usePreviewImg();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    img: "",
    quantity: "",
    price: "",
  });

  const { id } = useParams();

  useEffect(() => {
    async function fetchProductData() {
      try {
        const response = await fetch(`/api/products/getProduct/${id}`);
        const fetchedProductData = await response.json();

        // Set form data with fetched data
        setFormData({
          name: fetchedProductData.name || "",
          description: fetchedProductData.description || "",
          category: fetchedProductData.category || "",
          brand: fetchedProductData.brand || "",
          img: fetchedProductData.img || "",
          quantity: fetchedProductData.quantity || "",
          price: fetchedProductData.price || "",
        });
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }

    if (id) {
      fetchProductData();
    }
  }, [id]);

  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, img: imgUrl || "" }));
  }, [imgUrl]);

  const handleAddImageClick = (e) => {
    e.preventDefault();
    imageRef.current.click();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value || "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      let res;
      if (id) {
        res = await fetch(`/api/products/updateProduct/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        res = await fetch("/api/products/addProduct", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }

      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      showToast(
        id ? "Product Updated successfully" : "Product created successfully"
      );
      handleCancel();
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setLoading(false); // End loading
    }
  };

  function handleCancel() {
    navigate("/admin/products");
  }

  return (
    <>
      <section>
        <h1>{id ? "Edit Product" : "Add Product"}</h1>
        <div className="bg-slate-100 mt-4 rounded-lg">
          <div className="flex p-4 gap-6">
            <div className="flex-1">
              <form onSubmit={handleSubmit}>
                <InputArea
                  title={"Product Name"}
                  type={"text"}
                  name="name"
                  value={formData.name}
                  placeholder={"Type Product Name here"}
                  onChange={handleChange}
                />
                <div className="flex flex-col mb-4">
                  <label className="mb-2 text-gray-700 font-semibold">
                    Description
                  </label>
                  <textarea
                    name="description"
                    placeholder="Type description here"
                    value={formData.description}
                    onChange={handleChange}
                    className="px-4 py-2 bg-slate-50 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200"
                  />
                </div>

                <InputArea
                  title={"Category"}
                  type={"text"}
                  name="category"
                  value={formData.category}
                  placeholder={"Type Category here"}
                  onChange={handleChange}
                />
                <InputArea
                  title={"Brand Name"}
                  type={"text"}
                  name="brand"
                  value={formData.brand}
                  placeholder={"Type brand name here"}
                  onChange={handleChange}
                />
                <input
                  type="file"
                  hidden
                  ref={imageRef}
                  onChange={handleImageChange}
                  accept="image/*" // Ensure only image files can be selected
                />

                <button
                  className="flex cursor-pointer gap-2 my-2 border border-1 border-blue-200 p-2 rounded-lg"
                  onClick={handleAddImageClick} // Updated click handler
                >
                  <FcAddImage size={24} />
                  <label htmlFor=""> Add Product Image</label>
                </button>
                <div className="flex gap-2">
                  <InputArea
                    title={"Stock Quantity"}
                    type={"text"}
                    name="quantity"
                    value={formData.quantity}
                    placeholder={"Type stock quantity here"}
                    className="flex-1"
                    onChange={handleChange}
                  />
                  <InputArea
                    title={"Sale Price"}
                    type={"text"}
                    name="price"
                    value={formData.price}
                    placeholder={"Type sale price here"}
                    className="flex-1"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-end gap-4 mt-4">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                      loading
                        ? "bg-blue-300 text-blue-800 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    {id ? "Update Product" : "Add Product"}
                  </button>
                </div>
              </form>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <p className="mb-2 font-semibold text-gray-700">Image Preview</p>
              <div className="border border-gray-300 rounded-lg p-4 w-full h-full flex items-center justify-center bg-white">
                {imgUrl || formData.img ? (
                  <img
                    src={imgUrl || formData.img}
                    alt="Preview"
                    value={formData.img}
                    className="w-96 h-96 object-cover"
                  />
                ) : (
                  <span className="text-gray-500">No image selected</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddProduct;
