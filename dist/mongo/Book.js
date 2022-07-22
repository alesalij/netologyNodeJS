"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const bookSchema = new mongoose_1.Schema({
    title: { type: String, default: "Title" },
    description: { type: String, default: "Description" },
    authors: { type: String, default: "Authors" },
    favorite: { type: String, default: "Favorite" },
    fileCover: { type: String, default: "FileCover" },
    fileName: { type: String, default: "FileName" },
});
const Book = mongoose_2.default.model("Book", bookSchema);
exports.Book = Book;
