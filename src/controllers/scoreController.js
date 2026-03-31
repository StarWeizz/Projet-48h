const Score = require('../models/Score');

exports.submitScore = async (req, res, next) => {
  try {
    const { playerName, challengeSlug, challengeName, score, maxScore } = req.body;
    const entry = await Score.create({ playerName, challengeSlug, challengeName, score, maxScore });
    res.status(201).json({ success: true, data: entry });
  } catch (err) {
    next(err);
  }
};

exports.getScoresByChallenge = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const scores = await Score.find({ challengeSlug: slug })
      .sort({ score: -1, createdAt: -1 })
      .limit(10)
      .select('playerName score maxScore createdAt');
    res.json({ scores });
  } catch (err) {
    next(err);
  }
};

exports.getAllScores = async (req, res, next) => {
  try {
    const scores = await Score.find()
      .sort({ score: -1, createdAt: -1 })
      .limit(100)
      .select('playerName challengeSlug challengeName score maxScore createdAt');
    res.json({ scores });
  } catch (err) {
    next(err);
  }
};
