import express from "express";
import {
  addToFavourite,
  deleteFavourites,
  getAllFavourites,
} from "../controllers/fav.controller.js";

const router = express.Router();

router.post("/addtofavourite", addToFavourite);
router.get("/getFavourites/:userId", getAllFavourites);
router.delete("/deleteFavourite/:userId", deleteFavourites);

export default router;
