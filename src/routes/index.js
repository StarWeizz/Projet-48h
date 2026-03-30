const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "Challenge 48H API",
        resources: [
            "/api/themes",
            "/api/challenges",
            "/api/players",
            "/api/players/leaderboard",
        ],
    });
});

router.use("/themes", require("./themeRoutes"));
router.use("/challenges", require("./challengeRoutes"));
router.use("/players", require("./playerRoutes"));

module.exports = router;
