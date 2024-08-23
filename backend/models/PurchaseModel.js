import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productId: { type: "String" },
  name: { type: "String", required: true },
  quantity: { type: "String", required: true },
  price: { type: Number, required: true },
  productImg: { type: "String" },
});

const purchaseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [productSchema],
  totalAmount: { type: "Number", required: true },
  purchaseDate: { type: "Date", required: true, default: Date.now() },
  paymentMethod: { type: "String" },
  orderStatus: {
    type: "String",
    enum: ["pending", "shipped", "delivered", "canceled"],
    default: "pending",
  },
  shippingAddress: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    country: { type: String },
  },
});

const Purchase = mongoose.model("Purchase", purchaseSchema);
export default Purchase;
