#! /usr/bin/env node

// создаем объект приложенияconst
import express from "express";
export const router = express.Router();
//import { Book } from "../../../mongo/Book";
import { fileMiddleware } from "../../../middleware/file";
import { container } from "../../../services/container";
import { BooksService } from "../../../services/book/books.service.js";

const isAutintificated = (req: any, res: any, next: any) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    if (req.session) {
      req.session.returnTo = req.originalUrl || req.url;
    }
    return res.redirect("/login");
  }
  next();
};
// определяем обработчик для маршрутов

router.post("/", fileMiddleware.single("fileBook"), async (req, res) => {
  const {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook,
  } = req.body;
  let newBook: any = "";
  if (req.file) {
    newBook = {
      title: title,
      description: description,
      authors: authors,
      favorite: favorite,
      fileCover: fileCover,
      fileName:
        fileName && fileName !== "" ? fileName : `${req.file?.originalname}`,
      fileBook: req.file.filename,
    };
  } else {
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
    const service: BooksService = container.get("BOOKS_SERVICE");
    await service.createBook(newBook);
    res.status(201);
    res.json(newBook);
  } catch (e) {
    console.log("Fail Create", e);
  }
});

router.get("/", isAutintificated, async (req, res) => {
  const service: BooksService = container.get("BOOKS_SERVICE");
  const books = await service.getBooks();

  res.status(200);
  res.json(books);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const service: BooksService = container.get("BOOKS_SERVICE");
  const book = await service.getBook(id);
  if (book) {
    res.status(200);
    res.json(book);
  } else {
    res.status(404);
    res.json("book not found");
  }
});

router.put("/:id", fileMiddleware.single("fileBook"), async (req, res) => {
  const { id } = req.params;
  const service: BooksService = container.get("BOOKS_SERVICE");

  const book = await service.getBook(id);

  if (book !== undefined) {
    const {
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileBook,
    } = req.body;
    const newBook = {
      title: title,
      description: description,
      authors: authors,
      favorite: favorite,
      fileCover: fileCover,
      fileName: fileName,
      fileBook: fileBook,
    };
    await service.updateBook(id, newBook);

    // res.status(200);
    res.json("OK");
  } else {
    res.status(404);
    res.json("book not found");
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const service: BooksService = container.get("BOOKS_SERVICE");
  const book = await service.getBook(id);
  if (book !== undefined) {
    const result = await service.deleteBook(id);
    res.status(200);
    res.json("OK");
  } else {
    res.status(404);
    res.json("book not found");
  }
});

router.get("/:id/download", async (req, res) => {
  const service: BooksService = container.get("BOOKS_SERVICE");
  const books = await service.getBooks();

  const { id } = req.params;
  const idx = books.findIndex((el: any) => el.id == id);
  if (idx !== -1) {
    res.status(200);
    res.download(
      __dirname + "/../public/books/" + books[idx].fileName,
      books[idx].fileName,
      (err) => {
        res.status(404).json();
      }
    );
  } else {
    res.status(404);
    res.json("book not found");
  }
});
// начинаем прослушивать подключения на 3000 порту
