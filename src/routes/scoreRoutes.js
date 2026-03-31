const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/scoreController');

router.get('/', ctrl.getAllScores);
router.post('/', ctrl.submitScore);
router.get('/:slug', ctrl.getScoresByChallenge);

module.exports = router;
