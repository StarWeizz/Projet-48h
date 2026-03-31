const express = require("express");

const playerController = require("../controllers/playerController");

const router = express.Router();

router.get("/", playerController.getPlayers);
router.get("/leaderboard", playerController.getLeaderboard);
router.post("/", playerController.createPlayer);
router.get("/:id", playerController.getPlayerById);
router.patch("/:id", playerController.updatePlayer);
router.post("/:id/complete-challenge", playerController.completeChallenge);

module.exports = router;