const express = require("express");
const app = express();
const router = require("./router/index");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const flash = require("connect-flash");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(router);

app.listen(3000, () => {
  console.log("Port 3000 Server Started!!");
});
