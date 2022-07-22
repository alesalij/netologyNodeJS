import express from "express";
import passport from "passport";
import { IVerifyOptions, Strategy as LocalStrategy } from "passport-local";
//import crypto from "crypto";
//import { User } from "../../../mongo/User";
import { container } from "../../../services/container";
import { IUser } from "../../../services/user/IUser";
import { UserService } from "../../../services/user/user.service";

export const router = express.Router();
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

const strategy = new LocalStrategy(async function verify(
  username: string,
  password: string,
  done: (error: any, user?: any, options?: IVerifyOptions) => void
) {
  const service: UserService = container.get("USERS_SERVICE");
  const user = await service.getUser(username);
  console.log(user);
  if (user) {
    if (user.password === password) {
      return done(null, true);
    }
  } else {
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
passport.use(strategy);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/books",
    failureRedirect: "login",
  })
);

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const service: UserService = container.get("USERS_SERVICE");
  const newUser: IUser = {
    user: username,
    password: password,
  };
  await service.createUser(newUser);

  try {
    res.redirect("/books/");
  } catch (e) {
    console.log("Fail Create", e);
  }
});
router.get("/login", (req, res) => {
  res.status(200);
  res.render("user/login");
});
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  res.redirect("login");
});
router.get("/signup", (req, res) => {
  res.status(200);
  res.render("user/signup");
});
router.get("/me", (req, res) => {
  res.status(201);
  res.json('id: 1, mail: "test@mail.ru"');
});
