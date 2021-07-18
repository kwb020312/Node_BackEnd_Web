const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/main.html");
});

app.listen(3000, () => {
  console.log("Port 3000 Server Started!!");
});
