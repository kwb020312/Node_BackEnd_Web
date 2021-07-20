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

router.post("/form", (req, res) => {
  res.render("email.ejs", { email: req.body.email });
});

router.post("/ajax", (req, res) => {
  const email = req.body.email;
  let responseData = {};
  const query = connection.query(
    `select name from user where email="${email}";`,
    (err, rows) => {
      if (err) throw err;
      if (rows[0]) {
        responseData.result = "ok";
        responseData.name = rows[0].name;
      } else {
        responseData.result = "none";
        responseData.name = "";
      }
      res.json(responseData);
    }
  );
});

module.exports = router;
