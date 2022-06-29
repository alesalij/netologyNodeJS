#! /usr/bin/env node

// создаем объект приложенияconst
require("dotenv").config();
express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
//const db = require("./db");

path = require("path");
const logger = require("morgan"); // логгер
const cookieParser = require("cookie-parser"); // расшифровка куки

//const counterRouter = require("./routes/counter");
const { default: mongoose } = require("mongoose");

const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    console.log("reload");
    liveReloadServer.refresh("/");
  }, 100);
});

const usersApiRouter = require("./routes/api/user");
const booksApiRouter = require("./routes/api/books");
const booksRouter = require("./routes/books");

const app = express();
app.use(connectLiveReload());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

app.use(logger("dev")); // логгер
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require("body-parser").urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  require("express-session")({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.authenticate("session"));

// подключение роутов
app.use("/api/user", usersApiRouter);
app.use("/books", booksRouter);
app.use("/api/books", booksApiRouter);

app.get("/", (req, res) => {
  res.redirect("/books");
});
const PORT = process.env.PORT || 3000;

const connectDB = process.env.DB_CONNECT_STRING;

async function start() {
  try {
    await mongoose.connect(connectDB);
    app.listen(PORT, () => {
      console.log(`=== start server PORT ${PORT} ===`);
    });
  } catch {
    console.error("mongoose Fail");
  }
}
start();
