const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "111111",
  database: "tables_in_jsman",
});

connection.connect();

router.get("/", (req, res) => {
  res.render("join.ejs");
});

passport.use(
  "local-join",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "passwd",
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      console.log("local-join callback called");
    }
  )
);

router.post(
  "/",
  passport.authenticate("local-join", {
    successRedirect: "/main",
    failureRedirect: "/join",
    failureFlash: true,
  })
);

// router.post("/", (req, res) => {
//   const body = req.body;
//   const { email, name, password } = body;

//   const sql = { email: email, name: name, pw: password };
//   const query = connection.query("insert into user set ?", sql, (err, rows) => {
//     if (err) throw err;
//     res.render("welcome.ejs", { email: email, id: rows.insertId });
//   });
// });

module.exports = router;
