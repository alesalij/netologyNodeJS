"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = exports.BooksRepository = void 0;
require("reflect-metadata");
var Book_js_1 = require("./Book.js");
Object.defineProperty(exports, "Book", { enumerable: true, get: function () { return Book_js_1.Book; } });
//import TYPES from "./types";
// class Book {
//   id: string;
//   title: string;
//   description: string;
//   authors: string;
//   favorite: string;
//   fileCover: string;
//   fileName: string;
//   constructor(
//     id: string,
//     title: string,
//     description: string,
//     authors: string,
//     favorite: string,
//     fileCover: string,
//     fileName: string
//   ) {
//     this.id = id;
//     this.title = title;
//     this.description = description;
//     this.authors = authors;
//     this.favorite = favorite;
//     this.fileCover = fileCover;
//     this.fileName = fileName;
//   }
// }
var BooksRepository = /** @class */ (function () {
    // books: Book[];
    function BooksRepository() {
    }
    // - создание книги
    BooksRepository.prototype.createBook = function (book) {
        return book.save();
    };
    //* - получение книги по id
    BooksRepository.prototype.getBook = function (id) {
        return Book_js_1.Book.findById(id);
    };
    //* - получение всех книг
    BooksRepository.prototype.getBooks = function () {
        return Book_js_1.Book.find();
    };
    // - обновление книги
    BooksRepository.prototype.updateBook = function (id, book) {
        return Book_js_1.Book.findByIdAndUpdate(id, book);
    };
    // - удаление книги
    BooksRepository.prototype.deleteBook = function (id) {
        return Book_js_1.Book.findByIdAndDelete(id);
    };
    return BooksRepository;
}());
exports.BooksRepository = BooksRepository;
