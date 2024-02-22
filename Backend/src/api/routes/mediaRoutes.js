const express = require("express");
const router = express.Router();
const mediaController = require("../controllers/mediaController");
const authenticationToken = require("../middleware/authenticationToken");
const isAdmin = require("../middleware/isAdmin");

router.post("/", isAdmin, mediaController.createMedia);

router.get("/", authenticationToken, mediaController.getAllMedia);

router.get("/:id", authenticationToken, mediaController.getOneMedia);

router.put("/:id", isAdmin, mediaController.updateMedia);

router.delete("/:id", isAdmin, mediaController.deleteMedia);

module.exports = router;
