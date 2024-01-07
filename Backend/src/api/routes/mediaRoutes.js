const express = require("express");
const router = express.Router();
const mediaController = require("../controllers/mediaController");
const authenticationToken = require("../middleware/authenticationToken");

router.post("/", mediaController.createMedia);

router.get("/", authenticationToken, mediaController.getAllMedia);

router.get("/:id", authenticationToken, mediaController.getOneMedia);

router.put("/:id", mediaController.updateMedia);

router.delete("/:id", mediaController.deleteMedia);

module.exports = router;
