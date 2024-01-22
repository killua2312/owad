const express = require("express");
const router = express.Router();
const mediaController = require("../controllers/mediaController");
const authenticationToken = require("../middleware/authenticationToken");
const upmediaAuthentication = require("../middleware/upmediaAuthentication");

router.post("/", upmediaAuthentication, mediaController.createMedia);

router.get("/", authenticationToken, mediaController.getAllMedia);

router.get("/:id", authenticationToken, mediaController.getOneMedia);

router.put("/:id", upmediaAuthentication, mediaController.updateMedia);

router.delete("/:id", upmediaAuthentication, mediaController.deleteMedia);

module.exports = router;
