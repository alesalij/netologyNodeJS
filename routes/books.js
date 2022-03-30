#! /usr/bin/env node

// создаем объект приложенияconst
const express = require("express");
const router = express.Router();
const Book = require("../models/Book.js");
const fileMiddleware = require("../middleware/file");
const formdata = require("express-form-data");
const stor = {
  books: [],
};

[1, 2, 3].map((el) => {
  const newBook = new Book(`book ${el}`, ` desc ${el}`, (id = `idnumber${el}`));
  stor.books.push(newBook);
});
// определяем обработчик для маршрутов

// create book
router.post("/create", fileMiddleware.single("fileBook"), (req, res) => {
  const {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook,
  } = req.body;
  const { books } = stor;

  const newBook = new Book(
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName ? fileName : `${req.file.originalname}`,
    req.file.filename
  );

  books.push(newBook);
  res.status(201);
  res.json(newBook);
});
router.get("/create", (req, res) => {
  const {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook,
  } = req.body;
  const { books } = stor;

  const newBook = new Book(
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName ? fileName : `${req.file.originalname}`,
    req.file.filename
  );

  books.push(newBook);
  res.status(201);
  res.json(newBook);
});
//get all books
router.get("/", (req, res) => {
  const { books } = stor;
  res.render("books", { title: "All books", books: books });
});

// get book by id
router.get("/:id", (req, res) => {
  const { books } = stor;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id == id);
  if (idx !== -1) {
    res.render("books/view", { title: "View book", book: books[idx] });
  } else {
    res.status(404);
    res.json("book not found");
  }
});
//update book
router.post("/update/:id", fileMiddleware.single("fileBook"), (req, res) => {
  const { books } = stor;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id == id);
  //console.log(req);
  console.log(req.body);
  if (idx !== -1) {
    res.json(`ОК`);
  } else {
    res.status(404);
    res.json("book not found");
  }
});
router.get("/update/:id", (req, res) => {
  const { books } = stor;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id == id);
  if (idx !== -1) {
    res.render("books/update", {
      title: "Update book",
      book: books[idx],
      typeForm: "update",
    });
  } else {
    res.status(404);
    res.json("book not found");
  }
});

// начинаем прослушивать подключения на 3000 порту
module.exports = router;
