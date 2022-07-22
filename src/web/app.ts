#! /usr/bin/env node

// создаем объект приложенияconst

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import passport from "passport";
//import { Strategy } from "passport-local";
//const db = require("./db");

import path from "path";
import logger from "morgan"; // логгер
import cookieParser from "cookie-parser"; // расшифровка куки

//const counterRouter = require("./routes/counter");
import { default as mongoose } from "mongoose";

import livereload from "livereload";
import connectLiveReload from "connect-livereload";
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    console.log("reload");
    liveReloadServer.refresh("/");
  }, 100);
});

import { usersApiRouter } from "./routes";
import { booksApiRouter } from "./routes";
import { booksRouter } from "./routes";

const app = express();
app.use(connectLiveReload());

app.set("views", path.resolve("public/views"));
console.log(path.resolve("public/views"));
app.set("view engine", "ejs");

passport.serializeUser(function (_user: any, cb) {
  process.nextTick(function () {
    cb(null, { id: _user.id, username: _user.username });
  });
});

passport.deserializeUser(function (_user: any, cb) {
  process.nextTick(function () {
    return cb(null, _user);
  });
});

app.use(logger("dev")); // логгер
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
import bodyParser from "body-parser";
import session from "express-session";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.COOKIE_SECRET || "",
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

const connectDB = process.env.DB_CONNECT_STRING || "";

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
