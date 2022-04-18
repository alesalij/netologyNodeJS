#! /usr/bin/env node

// создаем объект приложенияconst
const express = require("express");
const router = express.Router();
const Book = require("../../models/Book.js");
const fileMiddleware = require("../../middleware/file");

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
    await newBook.save();
    res.status(201);
    res.json(newBook);
  } catch (e) {
    console.log("Fail Create", e);
  }
});

router.get("/", async (req, res) => {
  const books = await Book.find();
  res.status(200);
  res.json(books);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
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
  const book = await Book.findById(id);

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
    await Book.findByIdAndUpdate(id, newBook);

    // res.status(200);
    res.json("OK");
  } else {
    res.status(404);
    res.json("book not found");
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  result = await Book.findByIdAndDelete(id);
  if (result) {
    books.splice(idx, 1);
    res.status(200);
    res.json("OK");
  } else {
    res.status(404);
    res.json("book not found");
  }
});
router.get("/:id/download", (req, res) => {
  const { books } = stor;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id == id);
  if (idx !== -1) {
    res.status(200);
    res.download(
      __dirname + "/../public/books/" + books[idx].fileBook,
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
module.exports = router;
