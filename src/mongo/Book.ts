import { Schema, model } from "mongoose";
import mongoose from "mongoose";
const bookSchema = new Schema({
  title: { type: String, default: "Title" },
  description: { type: String, default: "Description" },
  authors: { type: String, default: "Authors" },
  favorite: { type: String, default: "Favorite" },
  fileCover: { type: String, default: "FileCover" },
  fileName: { type: String, default: "FileName" },
});
const Book = mongoose.model("Book", bookSchema);

export { Book };
