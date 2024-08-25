import express from "express";
import mongooseConnect from "./db/connectDB.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import UserRoutes from "./routes/user.routes.js";
import ProductRoutes from "./routes/product.routes.js";
import PurchasesRoutes from "./routes/purchases.routes.js";
import CartRoutes from "./routes/cart.routes.js";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongooseConnect();

const app = express();
const port = process.env.PORT || 3000;

// Use import.meta.url to get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to Cloudinary for image upload
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/users", UserRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/purchases", PurchasesRoutes);
app.use("/api/cart", CartRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// import express from "express";
// import mongooseConnect from "./db/connectDB.js";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import UserRoutes from "./routes/user.routes.js";
// import ProductRoutes from "./routes/product.routes.js";
// import PurchasesRoutes from "./routes/purchases.routes.js";
// import CartRoutes from "./routes/cart.routes.js";
// import { v2 as cloudinary } from "cloudinary";
// import path from "path";

// dotenv.config();

// mongooseConnect();

// const app = express();
// const port = 3000;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// //!connecting to cloudiary for image Upload
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// //!middlewares
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));
// app.use(cookieParser());

// //!Routes
// app.use("/api/users", UserRoutes);
// app.use("/api/products", ProductRoutes);
// app.use("/api/purchases", PurchasesRoutes);
// app.use("/api/cart", CartRoutes);

// let PORT = process.env.PORT || 3000;

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
//   });
// }

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
