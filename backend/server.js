const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// 미들웨어 설정
app.use(cors()); 
app.use(express.json()); 

// 라우터 연결 (여기서 아까 만든 gameRoutes.js를 불러옵니다)
const gameRoutes = require('./routes/gameRoutes');
app.use('/api', gameRoutes);

// 기본 확인용 경로
app.get('/', (req, res) => {
  res.send('Shooting Game Backend is running!');
});

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});