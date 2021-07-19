const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/main.html");
});

app.get("/main", (req, res) => {
  res.sendFile(__dirname + "/public/main.html");
});

app.post("/email_post", (req, res) => {
  res.send(`<h1>Welcome, ${req.body.email}</h1>`);
});

app.listen(3000, () => {
  console.log("Port 3000 Server Started!!");
});
