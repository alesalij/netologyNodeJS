#! /usr/bin/env node

// создаем объект приложенияconst
const express = require("express");
const router = express.Router();
const Book = require("../models/book.js");
const fileMiddleware = require("../middleware/file");

// const redis = require("redis");

// const REDIS_URL = process.env.REDIS_URL || "redis://localhost";

// const client = redis.createClient({ url: REDIS_URL });
// (async () => {
//   await client.connect();
// })();

const stor = {
  books: [],
};

[1, 2, 3].map((el) => {
  const newBook = new Book({
    title: `book ${el}`,
    description: ` desc ${el}`,
    id: `idnumber${el}`,
  });
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

  if (req.file) {
    const newBook = new Book(
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName && fileName !== "" ? fileName : `${req.file?.originalname}`,
      req.file.filename
    );
    books.push(newBook);
  } else {
    const newBook = new Book(
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileBook
    );
    books.push(newBook);
  }

  res.redirect(/books/);
});
router.get("/create", (req, res) => {
  book = new Book();
  res.render("books/create", {
    title: "Create book",
    book: book,
    typeForm: "create",
  });
});
//get all books
router.get("/", (req, res) => {
  const { books } = stor;
  res.render("books", { title: "All books", books: books });
});

// get book by id
router.get("/:id", async (req, res) => {
  const { books } = stor;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id == id);

  if (idx !== -1) {
    const cnt = await client.incr(id);

    res.render("books/view", {
      title: "View book",
      book: books[idx],
      cnt: cnt,
    });
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
  if (idx !== -1) {
    const {
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileBook,
    } = req.body;

    books[idx].title = title ? title : books[idx].title;
    books[idx].description = description ? description : books[idx].description;
    books[idx].authors = authors ? authors : books[idx].authors;
    books[idx].favorite = favorite ? favorite : books[idx].favorite;
    books[idx].fileCover = fileCover ? fileCover : books[idx].fileCover;
    if (req.file) {
      books[idx].fileName = fileName ? fileName : `${req.file?.originalname}`;
      books[idx].fileBook = req.file?.filename;
    } else {
      books[idx].fileName = fileName ? fileName : books[idx].fileName;
      books[idx].fileBook = fileBook ? fileBook : books[idx].fileBook;
    }

    // res.status(200);
    res.redirect("/books/");
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
