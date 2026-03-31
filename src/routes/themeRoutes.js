const express = require("express");

const themeController = require("../controllers/themeController");

const router = express.Router();

router.get("/", themeController.getThemes);
router.post("/", themeController.createTheme);
router.get("/:slug/challenges", themeController.getThemeChallenges);

module.exports = router;