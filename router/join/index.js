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
  res.sendFile(path.join(__dirname, "../../public/join.html"));
});

router.post("/", (req, res) => {
  const body = req.body;
  const { email, name, password } = body;

  const query = connection.query(
    `insert into user (email,name,pw) values("${email}", "${name}","${password}");`,
    (err, rows) => {
      if (err) throw err;
      console.log("ok db insert");
    }
  );
});

module.exports = router;
