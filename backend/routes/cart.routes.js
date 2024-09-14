import express from "express";
import {
  addToCart,
  getCart,
  removeItemFromCart,
  // getcartProduct,
  updatecartdata,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/addtocart", addToCart);
router.get("/getCart/:userId", getCart);
router.put("/updatecart", updatecartdata);
router.delete("/removecart/:cartId", removeItemFromCart);
// router.get("/getProduct/:productId", getcartProduct);

export default router;
