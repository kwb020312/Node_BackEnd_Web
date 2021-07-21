const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  console.log("main js loaded");
  const id = req.user;
  res.render("main.ejs", { id: id });
});

module.exports = router;
