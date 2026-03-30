const mongoose = require("mongoose");

const Challenge = require("../models/Challenge");
const Theme = require("../models/Theme");
const slugify = require("../utils/slugify");

exports.createChallenge = async (req, res, next) => {
    try {
        if (!mongoose.isValidObjectId(req.body.theme)) {
            return res.status(400).json({ message: "A valid theme id is required." });
        }

        const theme = await Theme.findById(req.body.theme);

        if (!theme) {
            return res.status(404).json({ message: "Theme not found for this challenge." });
        }

        const challenge = await Challenge.create({
            theme: req.body.theme,
            title: req.body.title,
            slug: req.body.slug || slugify(req.body.title || ""),
            order: req.body.order,
            type: req.body.type,
            difficulty: req.body.difficulty,
            statement: req.body.statement,
            hint: req.body.hint,
            successMessage: req.body.successMessage,
            expectedAnswer: req.body.expectedAnswer,
            points: req.body.points,
            isPublished: req.body.isPublished,
        });

        const createdChallenge = await Challenge.findById(challenge._id)
            .populate("theme", "name slug order difficulty")
            .select("-expectedAnswer");

        res.status(201).json(createdChallenge);
    } catch (error) {
        next(error);
    }
};

exports.getChallenges = async (req, res, next) => {
    try {
        const filters = {};

        if (req.query.themeId) {
            if (!mongoose.isValidObjectId(req.query.themeId)) {
                return res.status(400).json({ message: "themeId must be a valid MongoDB id." });
            }

            filters.theme = req.query.themeId;
        }

        if (req.query.themeSlug) {
            const theme = await Theme.findOne({ slug: req.query.themeSlug });

            if (!theme) {
                return res.status(404).json({ message: "Theme not found." });
            }

            filters.theme = theme._id;
        }

        if (req.query.type) {
            filters.type = req.query.type;
        }

        if (req.query.difficulty) {
            filters.difficulty = req.query.difficulty;
        }

        if (req.query.includeUnpublished !== "true") {
            filters.isPublished = true;
        }

        const challenges = await Challenge.find(filters)
            .populate("theme", "name slug order difficulty")
            .sort({ order: 1, title: 1 })
            .select("-expectedAnswer");

        res.json(challenges);
    } catch (error) {
        next(error);
    }
};

exports.getChallengeById = async (req, res, next) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Invalid challenge id." });
        }

        const challenge = await Challenge.findById(req.params.id)
            .populate("theme", "name slug order difficulty")
            .select("-expectedAnswer");

        if (!challenge) {
            return res.status(404).json({ message: "Challenge not found." });
        }

        return res.json(challenge);
    } catch (error) {
        return next(error);
    }
};
