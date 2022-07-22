"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersApiRouter = exports.booksApiRouter = exports.booksRouter = void 0;
const books_1 = require("./books");
Object.defineProperty(exports, "booksRouter", { enumerable: true, get: function () { return books_1.router; } });
const books_2 = require("./api/books");
Object.defineProperty(exports, "booksApiRouter", { enumerable: true, get: function () { return books_2.router; } });
const user_1 = require("./api/user");
Object.defineProperty(exports, "usersApiRouter", { enumerable: true, get: function () { return user_1.router; } });
