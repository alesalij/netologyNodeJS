const uidGenerator = require("node-unique-id-generator");
class Book {
  constructor(
    title = "",
    description = "",
    authors = "",
    favorite = "",
    fileCover = "",
    fileName = "",
    id = uidGenerator.generateUniqueId()
  ) {
    this.id = id;
    this.description = description;
    this.title = title;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
  }
}
module.exports = Book;
