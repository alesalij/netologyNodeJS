#! /usr/bin/env node

// создаем объект приложенияconst
const express = require("express");
const router = express.Router();
const { Book } = require("../models/Book.js");
const fileMiddleware = require("../middleware/file");

const isAutintificated = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    if (req.session) {
      req.session.returnTo = req.originalUrl || req.url;
    }
    return res.redirect("/api/user/login");
  }
  next();
};
const { container } = require("../container.js");

// определяем обработчик для маршрутов

// create book
router.post(
  "/create",
  isAutintificated,
  fileMiddleware.single("fileBook"),

  async (req, res) => {
    const {
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileBook,
    } = req.body;
    newBook = "";
    if (req.file) {
      newBook = new Book({
        title: title,
        description: description,
        authors: authors,
        favorite: favorite,
        fileCover: fileCover,
        fileName:
          fileName && fileName !== "" ? fileName : `${req.file?.originalname}`,
        fileBook: req.file.filename,
      });
    } else {
      newBook = new Book({
        title: title,
        description: description,
        authors: authors,
        favorite: favorite,
        fileCover: fileCover,
        fileName: fileName,
        fileBook: fileBook,
      });
    }
    try {
      const repo = container.get("BOOKS_REPOSITORY");
      await repo.createBook(newBook);

      res.redirect(/books/);
    } catch (e) {
      console.log("Fail Create", e);
    }
  }
);

router.get("/create", (req, res) => {
  const book = new Book({});
  keys = Object.keys(book.schema.obj);

  res.render("books/create", {
    title: "Create book",
    book: book,
    typeForm: "create",
  });
});
//get all books
router.get("/", isAutintificated, async (req, res) => {
  const repo = container.get("BOOKS_REPOSITORY");
  const books = await repo.getBooks();

  res.render("books", { title: "All books", books: books });
});

// get book by id
router.get("/:id", isAutintificated, async (req, res) => {
  const { id } = req.params;

  const repo = container.get("BOOKS_REPOSITORY");
  const book = await repo.getBook(id);

  if (book !== undefined) {
    // const cnt = await client.incr(id);

    res.render("books/view", {
      title: "View book",
      book: book,
    });
  } else {
    res.status(404);
    res.json("book not found");
  }
});
//update book
router.post(
  "/update/:id",
  isAutintificated,
  fileMiddleware.single("fileBook"),
  async (req, res) => {
    const { id } = req.params;
    const repo = container.get("BOOKS_REPOSITORY");

    const book = await repo.getBook(id);

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
      newBook = {
        title: title,
        description: description,
        authors: authors,
        favorite: favorite,
        fileCover: fileCover,
        fileName: fileName,
        fileBook: fileBook,
      };
      await repo.updateBook(id, newBook);

      //await Book.findByIdAndUpdate(id, newBook);

      // res.status(200);
      res.redirect("/books/");
    } else {
      res.status(404);
      res.json("book not found");
    }
  }
);

router.get("/update/:id", isAutintificated, async (req, res) => {
  const { id } = req.params;

  const repo = container.get("BOOKS_REPOSITORY");
  const book = await repo.getBook(id);

  if (book !== undefined) {
    res.render("books/update", {
      title: "Update book",
      book: book,
      typeForm: "update",
    });
  } else {
    res.status(404);
    res.json("book not found");
  }
});

router.get("/delete/:id", isAutintificated, async (req, res) => {
  const { id } = req.params;

  const repo = container.get("BOOKS_REPOSITORY");
  const book = await repo.getBook(id);

  if (book !== undefined) {
    result = await repo.deleteBook(id);

    res.redirect("/books/");
  } else {
    res.status(404);
    res.json("book not found");
  }
});

// начинаем прослушивать подключения на 3000 порту
module.exports = router;
