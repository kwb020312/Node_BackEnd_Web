const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "111111",
  database: "tables_in_jsman",
});

connection.connect();

router.get("/list", (req, res) => {
  res.render("movie.ejs");
});

module.exports = router;
