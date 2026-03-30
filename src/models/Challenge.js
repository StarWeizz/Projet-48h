const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema(
    {
        theme: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Theme",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        order: {
            type: Number,
            required: true,
            min: 1,
        },
        type: {
            type: String,
            enum: ["logic", "algorithm", "crypto", "quiz", "interaction", "observation"],
            default: "logic",
        },
        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
            default: "easy",
        },
        statement: {
            type: String,
            required: true,
            trim: true,
        },
        hint: {
            type: String,
            trim: true,
        },
        successMessage: {
            type: String,
            trim: true,
        },
        expectedAnswer: {
            type: String,
            required: true,
            trim: true,
        },
        points: {
            type: Number,
            default: 100,
            min: 0,
        },
        isPublished: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

challengeSchema.index({ theme: 1, order: 1 }, { unique: true });

module.exports = mongoose.model("Challenge", challengeSchema);
