var express = require("express");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var crypto = require("crypto");
const User = require("../../models/User.js");

const router = express.Router();
passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    console.log(username);
    user = await User.findOne({ user: username });
    if (user) {
      if (user.password === password) {
        return cb(null, username, password);
      }
    } else {
      return cb(null, false, {
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
  })
);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/books",
    failureRedirect: "login",
  })
);

router.post("/signup", async (req, res, next) => {
  const { username, password } = req.body;
  user = await User.find({ user: username });
  if (user.length == 0) {
    newUser = new User({
      user: username,
      password: password,
    });

    try {
      await newUser.save();
      res.redirect(/books/);
    } catch (e) {
      console.log("Fail Create", e);
    }
  } else {
    console.log("User already registered");
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

module.exports = router;
