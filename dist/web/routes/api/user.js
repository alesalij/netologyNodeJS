"use strict";
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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
//import crypto from "crypto";
//import { User } from "../../../mongo/User";
const container_1 = require("../../../services/container");
exports.router = express_1.default.Router();
// const strategy = new LocalStrategy(async function verify(
//   username: any,
//   password: any,
//   cb: any
// ) {
//   const service: UserService = container.get("USERS_SERVICE");
//   const user = await service.getUser(username);
//   // const user = await User.findOne({ user: username });
//   if (user) {
//     if (user.password === password) {
//       return cb(null, username, password);
//     }
//   } else {
//     return cb(null, false, {
//       message: "Incorrect username or password.",
//     });
//   }
const strategy = new passport_local_1.Strategy(function verify(username, password, done) {
    return __awaiter(this, void 0, void 0, function* () {
        const service = container_1.container.get("USERS_SERVICE");
        const user = yield service.getUser(username);
        console.log(user);
        if (user) {
            if (user.password === password) {
                return done(null, true);
            }
        }
        else {
            return done(null, false, {
                message: "Incorrect username or password.",
            });
        }
        // db.get(
        //   "SELECT * FROM users WHERE username = ?",
        //   [username],
        //   function (err, row) {
        //     if (err) {
        //       return cb(err);
        //     }
        //     if (!row) {
        //       return cb(null, false, {
        //         message: "Incorrect username or password.",
        //       });
        //     }
        //     crypto.pbkdf2(
        //       password,
        //       row.salt,
        //       310000,
        //       32,
        //       "sha256",
        //       function (err, hashedPassword) {
        //         if (err) {
        //           return cb(err);
        //         }
        //         if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
        //           return cb(null, false, {
        //             message: "Incorrect username or password.",
        //           });
        //         }
        //         return cb(null, row);
        //       }
        //     );
        //   }
        // );
    });
});
passport_1.default.use(strategy);
exports.router.post("/login", passport_1.default.authenticate("local", {
    successRedirect: "/books",
    failureRedirect: "login",
}));
exports.router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const service = container_1.container.get("USERS_SERVICE");
    const newUser = {
        user: username,
        password: password,
    };
    yield service.createUser(newUser);
    try {
        res.redirect("/books/");
    }
    catch (e) {
        console.log("Fail Create", e);
    }
}));
exports.router.get("/login", (req, res) => {
    res.status(200);
    res.render("user/login");
});
exports.router.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
    });
    res.redirect("login");
});
exports.router.get("/signup", (req, res) => {
    res.status(200);
    res.render("user/signup");
});
exports.router.get("/me", (req, res) => {
    res.status(201);
    res.json('id: 1, mail: "test@mail.ru"');
});
