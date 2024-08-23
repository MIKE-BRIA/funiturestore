import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    img: { type: String, default: "" },
    quantity: { type: Number, default: 0 },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    brand: { type: String },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;

// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     category: { type: String, required: true },
//     productPic: { type: String, default: "" },
//     quantity: { type: Number, default: 0 },
//     price: { type: Number, required: true },
//     description: { type: String, required: true },
//     sku: { type: String, unique: true, required: true },
//     brand: { type: String, required: true },
//     tags: [String],
//     ratings: {
//       averageRating: { type: Number, default: 0 },
//       numberOfReviews: { type: Number, default: 0 }
//     },
//     discount: {
//       percentage: { type: Number, default: 0 },
//       discountedPrice: { type: Number }
//     },
//     dimensions: {
//       width: { type: Number },
//       height: { type: Number },
//       depth: { type: Number }
//     },
//     weight: { type: Number },
//     inStock: { type: Boolean, default: true },
//     releaseDate: { type: Date }
//   },
//   {
//     timestamps: true,
//   }
// );

// const Product = mongoose.model("Product", productSchema);
// export default Product;
