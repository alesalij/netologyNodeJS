#! /usr/bin/env node

// создаем объект приложенияconst
express = require("express");
path = require("path");
const usersApiRouter = require("./routes/api/users");
const booksApiRouter = require("./routes/api/books");
const booksRouter = require("./routes/books");
const counterRouter = require("./routes/counter");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
// подключение роутов
app.use("/books", booksRouter);
app.use("/counter", counterRouter);
app.use("/api/user", usersApiRouter);
app.use("/api/books", booksApiRouter);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`=== start server PORT ${PORT} ===`);
});
