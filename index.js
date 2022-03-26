#! /usr/bin/env node

// создаем объект приложенияconst
express = require("express");

const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

const app = express();

// подключение роутов
app.use("/api/user", usersRouter);
app.use("/api/books", booksRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
