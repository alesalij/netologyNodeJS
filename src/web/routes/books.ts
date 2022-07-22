#! /usr/bin/env node

// создаем объект приложенияconst
import express from "express";
import { Request, Response, NextFunction } from "express";
import {} from "express-session";

export const router = express.Router();
import { Book } from "../../mongo/Book.js";
import { fileMiddleware } from "../../middleware/file";

declare module "express-session" {
  interface Session {
    returnTo: string;
  }
}

const isAutintificated = (req: Request, res: Response, next: NextFunction) => {
  console.log(typeof next);
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    if (req.session) {
      req.session.returnTo = req.originalUrl || req.url;
    }
    return res.redirect("/api/user/login");
  }
  next();
};
import { container } from "../../services/container";
import { BooksService } from "../../services/book/books.service.js";
import { IBook } from "../../services/book/IBook.js";

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

    const newBook: IBook = {
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
      const service: BooksService = container.get("BOOKS_SERVICE");
      await service.createBook(newBook);

      res.redirect("/books/");
    } catch (e) {
      console.log("Fail Create", e);
    }
  }
);

router.get("/create", (req, res) => {
  const book = new Book({});
  //const keys: any = Object.keys(book.schema.obj);

  res.render("books/create", {
    title: "Create book",
    book: book,
    typeForm: "create",
  });
});
//get all books
router.get("/", isAutintificated, async (req, res) => {
  const service: BooksService = container.get("BOOKS_SERVICE");
  const books = await service.getBooks();

  res.render("books", { title: "All books", books: books });
});

// get book by id
router.get("/:id", isAutintificated, async (req, res) => {
  const { id } = req.params;

  const service: BooksService = container.get("BOOKS_SERVICE");
  const book = await service.getBook(id);

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

  const service: BooksService = container.get("BOOKS_SERVICE");
  const book = await service.getBook(id);

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

  const service: BooksService = container.get("BOOKS_SERVICE");
  const book = await service.getBook(id);

  if (book !== undefined) {
    //const result =
    await service.deleteBook(id);

    res.redirect("/books/");
  } else {
    res.status(404);
    res.json("book not found");
  }
});

// начинаем прослушивать подключения на 3000 порту
