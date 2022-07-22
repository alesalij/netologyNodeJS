#! /usr/bin/env node
"use strict";
// создаем объект приложенияconst
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
//import { Strategy } from "passport-local";
//const db = require("./db");
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan")); // логгер
const cookie_parser_1 = __importDefault(require("cookie-parser")); // расшифровка куки
//const counterRouter = require("./routes/counter");
const mongoose_1 = __importDefault(require("mongoose"));
const livereload_1 = __importDefault(require("livereload"));
const connect_livereload_1 = __importDefault(require("connect-livereload"));
const liveReloadServer = livereload_1.default.createServer();
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        console.log("reload");
        liveReloadServer.refresh("/");
    }, 100);
});
const routes_1 = require("./routes");
const routes_2 = require("./routes");
const routes_3 = require("./routes");
const app = (0, express_1.default)();
app.use((0, connect_livereload_1.default)());
app.set("views", path_1.default.resolve("public/views"));
console.log(path_1.default.resolve("public/views"));
app.set("view engine", "ejs");
passport_1.default.serializeUser(function (_user, cb) {
    process.nextTick(function () {
        cb(null, { id: _user.id, username: _user.username });
    });
});
passport_1.default.deserializeUser(function (_user, cb) {
    process.nextTick(function () {
        return cb(null, _user);
    });
});
app.use((0, morgan_1.default)("dev")); // логгер
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: process.env.COOKIE_SECRET || "",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport_1.default.authenticate("session"));
// подключение роутов
app.use("/api/user", routes_1.usersApiRouter);
app.use("/books", routes_3.booksRouter);
app.use("/api/books", routes_2.booksApiRouter);
app.get("/", (req, res) => {
    res.redirect("/books");
});
const PORT = process.env.PORT || 3000;
const connectDB = process.env.DB_CONNECT_STRING || "";
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(connectDB);
            app.listen(PORT, () => {
                console.log(`=== start server PORT ${PORT} ===`);
            });
        }
        catch (_a) {
            console.error("mongoose Fail");
        }
    });
}
start();
