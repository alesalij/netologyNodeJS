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
const Book_js_1 = require("../../mongo/Book.js");
const file_1 = require("../../middleware/file");
const isAutintificated = (req, res, next) => {
    console.log(typeof next);
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        if (req.session) {
            req.session.returnTo = req.originalUrl || req.url;
        }
        return res.redirect("/api/user/login");
    }
    next();
};
const container_1 = require("../../services/container");
// определяем обработчик для маршрутов
// create book
exports.router.post("/create", isAutintificated, file_1.fileMiddleware.single("fileBook"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, authors, favorite, fileCover, fileName, fileBook, } = req.body;
    const newBook = {
        title: title,
        description: description,
        authors: authors,
        favorite: favorite,
        fileCover: fileCover,
        fileName: req.file
            ? fileName && fileName !== ""
                ? fileName
                : `${req.file.originalname}`
            : fileName,
        fileBook: fileBook,
    };
    try {
        console.log(newBook);
        const service = container_1.container.get("BOOKS_SERVICE");
        yield service.createBook(newBook);
        res.redirect("/books/");
    }
    catch (e) {
        console.log("Fail Create", e);
    }
}));
exports.router.get("/create", (req, res) => {
    const book = new Book_js_1.Book({});
    //const keys: any = Object.keys(book.schema.obj);
    res.render("books/create", {
        title: "Create book",
        book: book,
        typeForm: "create",
    });
});
//get all books
exports.router.get("/", isAutintificated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const service = container_1.container.get("BOOKS_SERVICE");
    const books = yield service.getBooks();
    res.render("books", { title: "All books", books: books });
}));
// get book by id
exports.router.get("/:id", isAutintificated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const service = container_1.container.get("BOOKS_SERVICE");
    const book = yield service.getBook(id);
    if (book !== undefined) {
        // const cnt = await client.incr(id);
        res.render("books/view", {
            title: "View book",
            book: book,
        });
    }
    else {
        res.status(404);
        res.json("book not found");
    }
}));
//update book
exports.router.post("/update/:id", isAutintificated, file_1.fileMiddleware.single("fileBook"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        //await Book.findByIdAndUpdate(id, newBook);
        // res.status(200);
        res.redirect("/books/");
    }
    else {
        res.status(404);
        res.json("book not found");
    }
}));
exports.router.get("/update/:id", isAutintificated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const service = container_1.container.get("BOOKS_SERVICE");
    const book = yield service.getBook(id);
    if (book !== undefined) {
        res.render("books/update", {
            title: "Update book",
            book: book,
            typeForm: "update",
        });
    }
    else {
        res.status(404);
        res.json("book not found");
    }
}));
exports.router.get("/delete/:id", isAutintificated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const service = container_1.container.get("BOOKS_SERVICE");
    const book = yield service.getBook(id);
    if (book !== undefined) {
        //const result =
        yield service.deleteBook(id);
        res.redirect("/books/");
    }
    else {
        res.status(404);
        res.json("book not found");
    }
}));
// начинаем прослушивать подключения на 3000 порту
