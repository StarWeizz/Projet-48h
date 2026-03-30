const mongoose = require("mongoose");

const completedChallengeSchema = new mongoose.Schema(
    {
        challenge: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Challenge",
            required: true,
        },
        completedAt: {
            type: Date,
            default: Date.now,
        },
        earnedPoints: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    {
        _id: false,
    }
);

const playerSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        avatar: {
            type: String,
            trim: true,
        },
        totalScore: {
            type: Number,
            default: 0,
            min: 0,
        },
        currentLevel: {
            type: Number,
            default: 1,
            min: 1,
        },
        unlockedThemes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Theme",
            },
        ],
        completedChallenges: [completedChallengeSchema],
        lastPlayedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
        collection: "Players",
    }
);

module.exports = mongoose.model("Player", playerSchema);
