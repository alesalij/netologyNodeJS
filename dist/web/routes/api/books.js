#! /usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
// создаем объект приложенияconst
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
//import { Book } from "../../../mongo/Book";
const file_1 = require("../../../middleware/file");
const container_1 = require("../../../services/container");
const isAutintificated = (req, res, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        if (req.session) {
            req.session.returnTo = req.originalUrl || req.url;
        }
        return res.redirect("/login");
    }
    next();
};
// определяем обработчик для маршрутов
exports.router.post("/", file_1.fileMiddleware.single("fileBook"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, description, authors, favorite, fileCover, fileName, fileBook, } = req.body;
    let newBook = "";
    if (req.file) {
        newBook = {
            title: title,
            description: description,
            authors: authors,
            favorite: favorite,
            fileCover: fileCover,
            fileName: fileName && fileName !== "" ? fileName : `${(_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname}`,
            fileBook: req.file.filename,
        };
    }
    else {
        newBook = {
            title: title,
            description: description,
            authors: authors,
            favorite: favorite,
            fileCover: fileCover,
            fileName: fileName,
            fileBook: fileBook,
        };
    }
    try {
        const service = container_1.container.get("BOOKS_SERVICE");
        yield service.createBook(newBook);
        res.status(201);
        res.json(newBook);
    }
    catch (e) {
        console.log("Fail Create", e);
    }
}));
exports.router.get("/", isAutintificated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const service = container_1.container.get("BOOKS_SERVICE");
    const books = yield service.getBooks();
    res.status(200);
    res.json(books);
}));
exports.router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const service = container_1.container.get("BOOKS_SERVICE");
    const book = yield service.getBook(id);
    if (book) {
        res.status(200);
        res.json(book);
    }
    else {
        res.status(404);
        res.json("book not found");
    }
}));
exports.router.put("/:id", file_1.fileMiddleware.single("fileBook"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const service = container_1.container.get("BOOKS_SERVICE");
    const book = yield service.getBook(id);
    if (book !== undefined) {
        const { title, description, authors, favorite, fileCover, fileName, fileBook, } = req.body;
        const newBook = {
            title: title,
            description: description,
            authors: authors,
            favorite: favorite,
            fileCover: fileCover,
            fileName: fileName,
            fileBook: fileBook,
        };
        yield service.updateBook(id, newBook);
        // res.status(200);
        res.json("OK");
    }
    else {
        res.status(404);
        res.json("book not found");
    }
}));
exports.router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const service = container_1.container.get("BOOKS_SERVICE");
    const book = yield service.getBook(id);
    if (book !== undefined) {
        const result = yield service.deleteBook(id);
        res.status(200);
        res.json("OK");
    }
    else {
        res.status(404);
        res.json("book not found");
    }
}));
exports.router.get("/:id/download", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const service = container_1.container.get("BOOKS_SERVICE");
    const books = yield service.getBooks();
    const { id } = req.params;
    const idx = books.findIndex((el) => el.id == id);
    if (idx !== -1) {
        res.status(200);
        res.download(__dirname + "/../public/books/" + books[idx].fileName, books[idx].fileName, (err) => {
            res.status(404).json();
        });
    }
    else {
        res.status(404);
        res.json("book not found");
    }
}));
// начинаем прослушивать подключения на 3000 порту
