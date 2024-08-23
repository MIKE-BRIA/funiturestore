import express from "express";
import {
  addToCart,
  getCart,
  updatecartdata,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/addtocart", addToCart);
router.get("/getCart/:userId", getCart);
router.put("/updatecart", updatecartdata);

export default router;
