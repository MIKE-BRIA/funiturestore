import express from "express";
import {
  addToCart,
  getCart,
  // getcartProduct,
  // removeCartProduct,
  updatecartdata,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/addtocart", addToCart);
router.get("/getCart/:userId", getCart);
router.put("/updatecart", updatecartdata);
// router.delete("/removecart/:cartId", removeCartProduct);
// router.get("/getProduct/:productId", getcartProduct);

export default router;
