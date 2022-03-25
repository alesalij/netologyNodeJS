#! /usr/bin/env node

// создаем объект приложенияconst
const express = require("express");
const router = express.Router();
const formData = require("express-form-data");
const Book = require("../models/Book.js");
const stor = {
  books: [],
};

// определяем обработчик для маршрутов

router.post("/", (req, res) => {
  // const { title, description } = req.body;
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;
  const { books } = stor;
  const newBook = new Book(
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName
  );
  books.push(newBook);
  res.status(201);
  res.json(newBook);
});
router.get("/", (req, res) => {
  const { books } = stor;
  res.status(200);
  res.json(books);
});
router.get("/:id", (req, res) => {
  const { books } = stor;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id == id);
  if (idx !== -1) {
    res.status(200);
    res.json(books[idx]);
  } else {
    res.status(404);
    res.json("book not found");
  }
});

router.put("/:id", (req, res) => {
  const { books } = stor;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id == id);
  if (idx !== -1) {
    const { title, description, authors, favorite, fileCover, fileName } =
      req.body;
    const newBook = new Book(
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      id
    );
    books[idx] = newBook;

    // res.status(200);
    res.json("OK");
  } else {
    res.status(404);
    res.json("book not found");
  }
});
router.delete("/:id", (req, res) => {
  const { books } = stor;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id == id);
  if (idx !== -1) {
    books.splice(idx, 1);
    res.status(200);
    res.json("OK");
  } else {
    res.status(404);
    res.json("book not found");
  }
});
// начинаем прослушивать подключения на 3000 порту
module.exports = router;
