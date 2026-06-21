import React, { useState, useEffect } from 'react';

function Game() {
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('playing'); // 'playing', 'gameOver'
  const [message, setMessage] = useState('과녁을 클릭해서 맞추세요!');
  const [targetPos, setTargetPos] = useState({ top: 50, left: 50 });

  // 난이도 조절: 과녁이 이동하는 속도 (밀리초)
  const speed = 1000; 

  // 과녁 무작위 이동 로직
  useEffect(() => {
    let interval;
    if (gameState === 'playing') {
      interval = setInterval(() => {
        moveTarget();
      }, speed);
    }
    // 컴포넌트 언마운트 시 인터벌 정리 (메모리 누수 방지)
    return () => clearInterval(interval);
  }, [gameState]);

  const moveTarget = () => {
    setTargetPos({
      // 화면 밖으로 나가지 않도록 10% ~ 90% 사이에서 랜덤 생성
      top: Math.floor(Math.random() * 80) + 10,
      left: Math.floor(Math.random() * 80) + 10,
    });
  };

  // 사격(과녁 클릭) 핸들러
  const handleHit = () => {
    if (gameState === 'playing') {
      setScore(prev => prev + 1);
      setMessage(`명중! 현재 점수: ${score + 1}`);
      moveTarget(); // 맞추면 즉시 다른 곳으로 이동
    }
  };

  // 빈 공간(허공) 클릭 시 감점 로직 (옵션)
  const handleMiss = (e) => {
    if (gameState === 'playing' && e.target.id === 'game-board') {
      setMessage('아깝네요! 허공을 쐈습니다.');
    }
  };

  const handleGameOver = async () => {
    setGameState('gameOver');
    setMessage(`게임 종료! 최종 점수: ${score}`);
    
    try {
      const response = await fetch('http://localhost:5000/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score })
      });
      const data = await response.json();
      console.log('서버 응답:', data.message);
    } catch (error) {
      console.error('점수 저장 실패:', error);
    }
  };

  const handlePlayAgain = () => {
    setScore(0);
    setGameState('playing');
    setMessage('과녁을 클릭해서 맞추세요!');
    moveTarget();
  };

  // === 스타일 정의 ===
  const boardStyle = {
    position: 'relative',
    width: '100%',
    height: '400px',
    backgroundColor: '#eef2f3',
    border: '2px solid #ccc',
    borderRadius: '8px',
    overflow: 'hidden',
    cursor: 'crosshair', // 마우스 커서를 조준점으로 변경
    marginTop: '20px'
  };

  const targetStyle = {
    position: 'absolute',
    top: `${targetPos.top}%`,
    left: `${targetPos.left}%`,
    width: '40px',
    height: '40px',
    backgroundColor: '#ff4757',
    borderRadius: '50%', // 동그란 과녁 모양
    transform: 'translate(-50%, -50%)',
    boxShadow: '0 0 10px rgba(255, 71, 87, 0.5)',
    transition: 'top 0.2s, left 0.2s', // 부드러운 이동 효과
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>현재 점수: {score}</h2>
        <button 
          onClick={handleGameOver}
          style={{ padding: '8px 16px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          게임 종료
        </button>
      </div>
      
      <p style={{ color: '#2f3542', fontWeight: 'bold', minHeight: '24px' }}>
        {message}
      </p>

      {/* 게임 보드 영역 */}
      <div id="game-board" style={boardStyle} onClick={handleMiss}>
        {gameState === 'playing' ? (
          // 움직이는 과녁
          <div style={targetStyle} onClick={(e) => {
            e.stopPropagation(); // 허공 클릭(handleMiss) 이벤트 방지
            handleHit();
          }}></div>
        ) : (
          // 게임 오버 화면
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'
          }}>
            <h1 style={{ color: '#ff4757' }}>GAME OVER</h1>
            <button 
              onClick={handlePlayAgain} 
              style={{ padding: '12px 24px', fontSize: '18px', cursor: 'pointer', borderRadius: '8px', border: 'none', backgroundColor: '#1e90ff', color: 'white' }}
            >
              다시 하기 🔄
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Game;