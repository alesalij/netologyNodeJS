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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserService = void 0;
require("reflect-metadata");
const User_1 = require("../../mongo/User");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return User_1.User; } });
//import TYPES from "./types";
class UserService {
    // books: Book[];
    constructor() {
        console.log("makeUser");
    }
    // - создание User
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.find({ user: data.user });
            console.log("tut", user);
            if (user.length == 0) {
                const newUser = new User_1.User({
                    user: data.user,
                    password: data.password,
                });
                newUser.save();
            }
            else {
                console.log("User already registered");
            }
        });
    }
    getUser(username) {
        const user = User_1.User.findOne({ user: username });
        return user;
    }
}
exports.UserService = UserService;
