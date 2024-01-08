const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/signup", userController.createUser);

router.post("/login", userController.getUser);

router.delete("/deleteuser/:id", userController.deleteUser);

module.exports = router;
