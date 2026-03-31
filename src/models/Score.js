const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema(
  {
    playerName: { type: String, required: true, trim: true, maxlength: 50 },
    challengeSlug: { type: String, required: true, trim: true },
    challengeName: { type: String, required: true, trim: true },
    score: { type: Number, required: true, min: 0 },
    maxScore: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Score', scoreSchema);
