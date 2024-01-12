const express = require("express");
const router = express.Router();
const walletController = require("../controllers/walletController");
const authenticationToken = require("../middleware/authenticationToken");

router.get("/", authenticationToken, walletController.getWallet);

router.put("/", authenticationToken, walletController.updateWallet);

module.exports = router;
