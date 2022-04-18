#! /usr/bin/env node

// создаем объект приложенияconst
const express = require("express");
const router = express.Router();
const Book = require("../models/Book.js");
const fileMiddleware = require("../middleware/file");
const uidGenerator = require("node-unique-id-generator");
const book = require("../models/Book.js");

// const redis = require("redis");

// const REDIS_URL = process.env.REDIS_URL || "redis://localhost";

// const client = redis.createClient({ url: REDIS_URL });
// (async () => {
//   await client.connect();
// })();

// определяем обработчик для маршрутов

// create book
router.post("/create", fileMiddleware.single("fileBook"), async (req, res) => {
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
    res.redirect(/books/);
  } catch (e) {
    console.log("Fail Create", e);
  }
});
router.get("/create", (req, res) => {
  const book = new Book({});
  keys = Object.keys(book.schema.obj);

  console.log(keys);
  res.render("books/create", {
    title: "Create book",
    book: book,
    typeForm: "create",
  });
});
//get all books
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.render("books", { title: "All books", books: books });
});

// get book by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);

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
  fileMiddleware.single("fileBook"),
  async (req, res) => {
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
      res.redirect("/books/");
    } else {
      res.status(404);
      res.json("book not found");
    }
  }
);
router.get("/update/:id", async (req, res) => {
  const { id } = req.params;

  const book = await Book.findById(id);

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
router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;

  const book = await Book.findById(id);

  if (book !== undefined) {
    result = await Book.findByIdAndDelete(id);
    console.log(result);

    res.redirect("/books/");
  } else {
    res.status(404);
    res.json("book not found");
  }
});

// начинаем прослушивать подключения на 3000 порту
module.exports = router;
