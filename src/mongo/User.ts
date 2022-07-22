import { Schema, model } from "mongoose";
import mongoose from "mongoose";
const userSchema = new Schema({
  user: { type: String, default: "User" },
  password: { type: String, default: "Password" },
});
const User = mongoose.model("User", userSchema);

export { User };
