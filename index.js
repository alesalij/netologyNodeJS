#! /usr/bin/env node

// создаем объект приложенияconst
express = require("express");
const formData = require("express-form-data");
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

const app = express();

app.use(formData.parse());
app.use("/api/user", usersRouter);
app.use("/api/books", booksRouter);
// определяем обработчик для маршрутов
// app.post("/api/user/login", (req, res) => {
//   res.status(201);
//   res.json('id: 1, mail: "test@mail.ru"');
// });

// app.post("/api/books", (req, res) => {
//   // const { title, description } = req.body;
//   const { title, description, authors, favorite, fileCover, fileName } =
//     req.body;
//   const { books } = stor;
//   const newBook = new Book(
//     title,
//     description,
//     authors,
//     favorite,
//     fileCover,
//     fileName
//   );
//   books.push(newBook);
//   res.status(201);
//   res.json(newBook);
// });
// app.get("/api/books", (req, res) => {
//   const { books } = stor;
//   res.status(200);
//   res.json(books);
// });
// app.get("/api/books/:id", (req, res) => {
//   const { books } = stor;
//   const { id } = req.params;
//   const idx = books.findIndex((el) => el.id == id);
//   if (idx !== -1) {
//     res.status(200);
//     res.json(books[idx]);
//   } else {
//     res.status(404);
//     res.json("book not found");
//   }
// });

// app.put("/api/books/:id", (req, res) => {
//   const { books } = stor;
//   const { id } = req.params;
//   const idx = books.findIndex((el) => el.id == id);
//   if (idx !== -1) {
//     const { title, description, authors, favorite, fileCover, fileName } =
//       req.body;
//     const newBook = new Book(
//       title,
//       description,
//       authors,
//       favorite,
//       fileCover,
//       fileName,
//       id
//     );
//     books[idx] = newBook;

//     // res.status(200);
//     res.json("OK");
//   } else {
//     res.status(404);
//     res.json("book not found");
//   }
// });
// app.delete("/api/books/:id", (req, res) => {
//   const { books } = stor;
//   const { id } = req.params;
//   const idx = books.findIndex((el) => el.id == id);
//   if (idx !== -1) {
//     books.splice(idx, 1);
//     res.status(200);
//     res.json("OK");
//   } else {
//     res.status(404);
//     res.json("book not found");
//   }
// });

// начинаем прослушивать подключения на 3000 порту

const PORT = process.env.PORT || 3000;
app.listen(PORT);
