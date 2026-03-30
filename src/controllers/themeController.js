const Theme = require("../models/Theme");
const Challenge = require("../models/Challenge");
const slugify = require("../utils/slugify");

exports.createTheme = async (req, res, next) => {
    try {
        const theme = await Theme.create({
            name: req.body.name,
            slug: req.body.slug || slugify(req.body.name || ""),
            description: req.body.description,
            order: req.body.order,
            coverImage: req.body.coverImage,
            difficulty: req.body.difficulty,
            isPublished: req.body.isPublished,
        });

        res.status(201).json(theme);
    } catch (error) {
        next(error);
    }
};

exports.getThemes = async (req, res, next) => {
    try {
        const filters = {};

        if (req.query.includeUnpublished !== "true") {
            filters.isPublished = true;
        }

        const themes = await Theme.find(filters).sort({ order: 1, name: 1 });
        res.json(themes);
    } catch (error) {
        next(error);
    }
};

exports.getThemeChallenges = async (req, res, next) => {
    try {
        const theme = await Theme.findOne({ slug: req.params.slug });

        if (!theme) {
            return res.status(404).json({ message: "Theme not found." });
        }

        const filters = { theme: theme._id };

        if (req.query.includeUnpublished !== "true") {
            filters.isPublished = true;
        }

        const challenges = await Challenge.find(filters)
            .sort({ order: 1, title: 1 })
            .select("-expectedAnswer");

        return res.json({ theme, challenges });
    } catch (error) {
        return next(error);
    }
};
