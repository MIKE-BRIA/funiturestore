import express from "express";
import {
  addPurchase,
  getAllPurchase,
  updatePurchases,
} from "../controllers/purchases.controller.js";

const router = express.Router();

router.post("/added", addPurchase);
router.get("/getPurchases", getAllPurchase);
router.patch("/updateStatus/:purchaseId", updatePurchases);

export default router;
