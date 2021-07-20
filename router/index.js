const express = require("express");
const router = express.Router();
const path = require("path");
const main = require("./main/main");
const email = require("./email/email");

router.get("/", (req, res) => {
  console.log("main js loaded");
  res.sendFile(path.join(__dirname, "../public/main.html"));
});

router.use("/main", main);
router.use("/email", email);

module.exports = router;
