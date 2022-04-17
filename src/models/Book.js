const uidGenerator = require("node-unique-id-generator");
const { Schema, model } = require("mongoose");
const bookSchema = new Schema({
  id: String,
  title: String,
  description: String,
  authors: String,
  favorite: String,
  fileCover: String,
  fileName: String,
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
