const mongoose = require("mongoose");

const Player = require("../models/Player");
const Challenge = require("../models/Challenge");
const Theme = require("../models/Theme");
const normalizeAnswer = require("../utils/normalizeAnswer");

async function populatePlayer(playerId) {
    return Player.findById(playerId)
        .populate("unlockedThemes", "name slug order difficulty")
        .populate({
            path: "completedChallenges.challenge",
            select: "title slug points type difficulty theme",
            populate: {
                path: "theme",
                select: "name slug order difficulty",
            },
        });
}

exports.createPlayer = async (req, res, next) => {
    try {
        const firstTheme = await Theme.findOne({ isPublished: true }).sort({ order: 1, name: 1 });

        const player = await Player.create({
            username: req.body.username,
            avatar: req.body.avatar,
            unlockedThemes: firstTheme ? [firstTheme._id] : [],
        });

        const createdPlayer = await populatePlayer(player._id);
        res.status(201).json(createdPlayer);
    } catch (error) {
        next(error);
    }
};

exports.getPlayers = async (req, res, next) => {
    try {
        const players = await Player.find()
            .sort({ totalScore: -1, updatedAt: -1 })
            .populate("unlockedThemes", "name slug order difficulty");

        res.json(players);
    } catch (error) {
        next(error);
    }
};

exports.getLeaderboard = async (req, res, next) => {
    try {
        const leaderboard = await Player.find()
            .sort({ totalScore: -1, updatedAt: 1 })
            .select("username avatar totalScore currentLevel lastPlayedAt");

        res.json(leaderboard);
    } catch (error) {
        next(error);
    }
};

exports.getPlayerById = async (req, res, next) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Invalid player id." });
        }

        const player = await populatePlayer(req.params.id);

        if (!player) {
            return res.status(404).json({ message: "Player not found." });
        }

        return res.json(player);
    } catch (error) {
        return next(error);
    }
};

exports.updatePlayer = async (req, res, next) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Invalid player id." });
        }

        const payload = {};

        if (req.body.username !== undefined) {
            payload.username = req.body.username;
        }

        if (req.body.avatar !== undefined) {
            payload.avatar = req.body.avatar;
        }

        if (req.body.currentLevel !== undefined) {
            payload.currentLevel = req.body.currentLevel;
        }

        payload.lastPlayedAt = new Date();

        const player = await Player.findByIdAndUpdate(req.params.id, payload, {
            new: true,
            runValidators: true,
        });

        if (!player) {
            return res.status(404).json({ message: "Player not found." });
        }

        const updatedPlayer = await populatePlayer(player._id);
        return res.json(updatedPlayer);
    } catch (error) {
        return next(error);
    }
};

exports.completeChallenge = async (req, res, next) => {
    try {
        const playerId = req.params.id;
        const { challengeId, answer } = req.body;

        if (!mongoose.isValidObjectId(playerId) || !mongoose.isValidObjectId(challengeId)) {
            return res.status(400).json({ message: "A valid player id and challenge id are required." });
        }

        const player = await Player.findById(playerId);
        const challenge = await Challenge.findById(challengeId).populate("theme");

        if (!player) {
            return res.status(404).json({ message: "Player not found." });
        }

        if (!challenge || !challenge.isPublished) {
            return res.status(404).json({ message: "Challenge not found." });
        }

        if (!answer) {
            return res.status(400).json({ message: "An answer is required to complete a challenge." });
        }

        if (normalizeAnswer(answer) !== normalizeAnswer(challenge.expectedAnswer)) {
            return res.status(400).json({
                message: "Wrong answer.",
                isCorrect: false,
            });
        }

        if (player.unlockedThemes.length === 0) {
            const firstTheme = await Theme.findOne({ isPublished: true }).sort({ order: 1, name: 1 });

            if (firstTheme && firstTheme._id.toString() === challenge.theme._id.toString()) {
                player.unlockedThemes.push(firstTheme._id);
            }
        }

        const isThemeUnlocked = player.unlockedThemes.some(
            (themeId) => themeId.toString() === challenge.theme._id.toString()
        );

        if (!isThemeUnlocked) {
            return res.status(403).json({ message: "This theme is still locked for the player." });
        }

        const alreadyCompleted = player.completedChallenges.some(
            (entry) => entry.challenge.toString() === challenge._id.toString()
        );

        if (alreadyCompleted) {
            return res.status(409).json({ message: "Challenge already completed by this player." });
        }

        player.completedChallenges.push({
            challenge: challenge._id,
            completedAt: new Date(),
            earnedPoints: challenge.points,
        });
        player.totalScore += challenge.points;
        player.lastPlayedAt = new Date();

        const currentThemeChallenges = await Challenge.find({
            theme: challenge.theme._id,
            isPublished: true,
        }).select("_id");

        const completedIds = new Set(
            player.completedChallenges.map((entry) => entry.challenge.toString())
        );

        const themeFullyCompleted =
            currentThemeChallenges.length > 0 &&
            currentThemeChallenges.every((themeChallenge) =>
                completedIds.has(themeChallenge._id.toString())
            );

        let nextUnlockedTheme = null;

        if (themeFullyCompleted) {
            const nextTheme = await Theme.findOne({
                isPublished: true,
                order: { $gt: challenge.theme.order },
            }).sort({ order: 1, name: 1 });

            if (
                nextTheme &&
                !player.unlockedThemes.some((themeId) => themeId.toString() === nextTheme._id.toString())
            ) {
                player.unlockedThemes.push(nextTheme._id);
                nextUnlockedTheme = nextTheme;
            }

            const completedThemeCount = await Theme.countDocuments({
                isPublished: true,
                order: { $lte: challenge.theme.order },
            });

            player.currentLevel = Math.max(player.currentLevel, completedThemeCount);
        }

        await player.save();

        const updatedPlayer = await populatePlayer(player._id);

        res.json({
            message: nextUnlockedTheme
                ? `Challenge completed. Theme "${nextUnlockedTheme.name}" unlocked.`
                : "Challenge completed.",
            isCorrect: true,
            nextUnlockedTheme: nextUnlockedTheme
                ? {
                      id: nextUnlockedTheme._id,
                      name: nextUnlockedTheme.name,
                      slug: nextUnlockedTheme.slug,
                  }
                : null,
            player: updatedPlayer,
        });
    } catch (error) {
        next(error);
    }
};
