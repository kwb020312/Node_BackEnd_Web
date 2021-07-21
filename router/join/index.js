const express = require("express");
const router = express.Router();
const path = require("path");
const mysql = require("mysql");

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

router.post("/", (req, res) => {
  const body = req.body;
  const { email, name, password } = body;

  const sql = { email: email, name: name, pw: password };
  const query = connection.query("insert into user set ?", sql, (err, rows) => {
    if (err) throw err;
    res.render("welcome.ejs", { email: email, id: rows.insertId });
  });
});

module.exports = router;
