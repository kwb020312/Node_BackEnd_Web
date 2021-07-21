const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "111111",
  database: "tables_in_jsman",
});

connection.connect();

router.get("/", (req, res) => {
  let msg;
  const errMsg = req.flash("error");
  if (errMsg) msg = errMsg;
  res.render("login.ejs");
});

passport.serializeUser((user, done) => {
  console.log(`passport session save : ${user.id}`);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log(`passport session get id: ${id}`);
  done(null, id);
});

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      console.log(email, password);
      const query = connection.query(
        `select * from user where email=?`,
        [email],
        (err, rows) => {
          if (err) return done(err);

          if (rows.length) {
            return done(null, { email: email, id: rows[0].UID });
          } else {
            return done(null, false, {
              message: "your Login info is not found >.<",
            });
          }
        }
      );
    }
  )
);

router.post("/", (req, res, next) => {
  passport.authenticate("local-login", (err, user, info) => {
    if (err) res.status(500).json(err);
    if (!user) return res.status(401).json(info.message);

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json(user);
    });
  })(req, res, next);
});

module.exports = router;
