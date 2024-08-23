import express from "express";
import {
  getUserProfile,
  loginUser,
  logoutUser,
  signupUser,
  updateUserProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:id", getUserProfile);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/updateUser/:id", updateUserProfile);

export default router;
