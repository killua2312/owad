const express = require("express");
const router = express.Router();
const authenticationToken = require("../middleware/authenticationToken");

router.get("/", authenticationToken, (req, res) => {
  res.status(200).json({ message: "User is authenticated", user: req.user });
});

module.exports = router;
