const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("main js loaded");
  const id = req.user;
  res.render("main.ejs", { id: id });
});

module.exports = router;
