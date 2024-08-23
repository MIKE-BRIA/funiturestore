import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    img: { type: String, default: "" },
    price: { type: Number, required: true },
    totalPrice: { type: Number },
    quantity: { type: Number, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
