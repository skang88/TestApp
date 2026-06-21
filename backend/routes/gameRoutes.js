const express = require('express');
const router = express.Router();

router.post('/start', (req, res) => {
  // 게임 시작 로직
  res.send('Game started!');
});

router.post('/score', (req, res) => {
  // 점수 저장 로직
  res.send('Score saved!');
});

module.exports = router;
