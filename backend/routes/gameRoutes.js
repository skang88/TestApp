const express = require('express');
const router = express.Router();

// 게임 시작 엔드포인트
router.post('/start', (req, res) => {
  res.status(200).json({ message: 'Game started successfully!' });
});

// 점수 저장 엔드포인트
router.post('/score', (req, res) => {
  const { score } = req.body;
  res.status(200).json({ message: `Score ${score} saved successfully!` });
});

module.exports = router;