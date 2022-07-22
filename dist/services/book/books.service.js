"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = exports.BooksService = void 0;
//import { injectable, inject } from "inversify";
require("reflect-metadata");
const Book_1 = require("../../mongo/Book");
Object.defineProperty(exports, "Book", { enumerable: true, get: function () { return Book_1.Book; } });
//import TYPES from "./types";
class BooksService {
    // books: Book[];
    constructor() {
        console.log("makeBook");
    }
    // - создание книги
    createBook(data) {
        const book = new Book_1.Book(data);
        book.save();
        return book;
    }
    //* - получение книги по id
    getBook(id) {
        return Book_1.Book.findById(id);
    }
    //* - получение всех книг
    getBooks() {
        return Book_1.Book.find();
    }
    // - обновление книги
    updateBook(id, book) {
        return Book_1.Book.findByIdAndUpdate(id, book);
    }
    // - удаление книги
    deleteBook(id) {
        return Book_1.Book.findByIdAndDelete(id);
    }
}
exports.BooksService = BooksService;
