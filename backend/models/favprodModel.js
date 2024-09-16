import mongoose from "mongoose";

const favSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    img: { type: String, default: "" },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

const Favourite = mongoose.model("Favourite", favSchema);
export default Favourite;
