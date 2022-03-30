#! /usr/bin/env node

// создаем объект приложенияconst
express = require("express");

const usersApiRouter = require("./routes/api/users");
const booksApiRouter = require("./routes/api/books");
const booksRouter = require("./routes/books");

const app = express();

app.set("view engine", "ejs");

// подключение роутов
app.use("/books", booksRouter);
app.use("/api/user", usersApiRouter);
app.use("/api/books", booksApiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
