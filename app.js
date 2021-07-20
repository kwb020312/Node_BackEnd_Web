const express = require("express");
const app = express();
const main = require("./router/main");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "111111",
  database: "tables_in_jsman",
});

connection.connect();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use("/main", main);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/main.html");
});

app.post("/email_post", (req, res) => {
  res.render("email.ejs", { email: req.body.email });
});

app.post("/ajax_send_email", (req, res) => {
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

app.listen(3000, () => {
  console.log("Port 3000 Server Started!!");
});
