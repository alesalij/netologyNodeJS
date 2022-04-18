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

// class Book {
//   constructor(
//     title = "",
//     description = "",
//     authors = "",
//     favorite = "",
//     fileCover = "",
//     fileName = "",
//     fileBook = "",
//     id = uidGenerator.generateUniqueId()
//   ) {
//     this.id = id;
//     this.description = description;
//     this.title = title;
//     this.authors = authors;
//     this.favorite = favorite;
//     this.fileCover = fileCover;
//     this.fileName = fileName;
//     this.fileBook = fileBook;
//   }
// }
module.exports = model("Book", bookSchema);
