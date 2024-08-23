import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: "String", required: true },
    email: { type: "String", required: true, unique: true },
    password: { type: "String", required: true, minLength: 6 },
    isAdmin: { type: "Boolean", default: false },
    profilePic: { type: "String", default: "" },
    residence: { type: "String", default: "" },
    number: { type: "String", default: "" },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
