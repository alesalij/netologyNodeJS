const uidGenerator = require("node-unique-id-generator");
const { Schema, model } = require("mongoose");
const userSchema = new Schema({
  user: { type: String, default: "User" },
  password: { type: String, default: "Password" },
});

module.exports = model("User", userSchema);
