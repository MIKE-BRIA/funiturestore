import Purchase from "../models/PurchaseModel.js";
import mongoose from "mongoose";

export async function addPurchase(req, res) {
  try {
    const { payerName, transactionId, amount, products, userId } = req.body;

    if (!payerName || !products || !amount || !userId) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided." });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID." });
    }

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        error: "Products array must be provided and cannot be empty.",
      });
    }

    const invalidProducts = products.filter(
      (product) =>
        !product.id || !product.name || !product.quantity || !product.price
    );

    if (invalidProducts.length > 0) {
      return res.status(400).json({
        error: "Each product must have id, name, quantity, and price.",
      });
    }

    const productsArray = products.map((product) => ({
      productId: product.id,
      name: product.name,
      quantity: product.quantity,
      price: product.price,
      productImg: product.img,
    }));

    const newPurchase = await Purchase.create({
      user: new mongoose.Types.ObjectId(userId),
      products: productsArray,
      totalAmount: amount,
      paymentMethod: transactionId,
    });

    res.status(200).json({
      message: "Purchase completed successfully",
      purchase: newPurchase,
    });
  } catch (error) {
    console.error("Error in addPurchase:", error); // Log the full error stack
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getAllPurchase(req, res) {
  try {
    const purchases = await Purchase.find({});
    res.status(200).json(purchases);
  } catch (error) {
    console.log("Error in getAllPurchase", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function updatePurchases(req, res) {
  const { purchaseId } = req.params;
  const { orderStatus } = req.body;
  try {
    const validStatuses = ["pending", "shipped", "delivered", "canceled"];
    if (!validStatuses.includes(orderStatus)) {
      return res.status(400).json({ error: "Invalid order status" });
    }

    const updatedPurchase = await Purchase.findByIdAndUpdate(
      purchaseId,
      { $set: { orderStatus } },
      { new: true, runValidators: true }
    );

    if (!updatedPurchase) {
      return res.status(404).json({ error: "Purchase not found" });
    }

    res.status(200).json(updatedPurchase);
  } catch (error) {
    console.log("Error in updatePurchases", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
