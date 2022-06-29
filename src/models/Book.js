const uidGenerator = require("node-unique-id-generator");
const { Schema, model } = require("mongoose");
const bookSchema = new Schema({
  title: { type: String, default: "Title" },
  description: { type: String, default: "Description" },
  authors: { type: String, default: "Authors" },
  favorite: { type: String, default: "Favorite" },
  fileCover: { type: String, default: "FileCover" },
  fileName: { type: String, default: "FileName" },
});

module.exports = model("Book", bookSchema);
