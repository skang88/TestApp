import React, { useState } from 'react';

function Game() {
  // 게임 상태를 관리하기 위한 기본 상태 설정
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('playing'); // 'playing', 'paused', 'gameOver'

  // 예시: 점수를 증가시키는 함수 (실제 게임 로직은 추후 추가)
  const handleShoot = () => {
    if (gameState === 'playing') {
      setScore(prevScore => prevScore + 1);
    }
  };

  // 게임 오버 시 처리
  const handleGameOver = () => {
    setGameState('gameOver');
  };

  return (
    <div className="game-container">
      <h2>Shooting Game</h2>
      
      {/* 점수 표시 영역 */}
      <div className="score-board">
        Current Score: {score}
      </div>

      {/* 게임 플레이 영역 */}
      <div className="game-area">
        {gameState === 'playing' ? (
          <>
            <p>Click anywhere to shoot!</p>
            {/* 실제 게임 요소(플레이어, 타겟 등)가 여기에 렌더링될 예정입니다. */}
            <button onClick={handleShoot}>Shoot</button>
          </>
        ) : gameState === 'gameOver' ? (
          <>
            <h2>Game Over!</h2>
            <p>Final Score: {score}</p>
            <button onClick={() => setGameState('playing')}>Play Again</button>
          </>
        ) : (
          <p>Game is Paused</p>
        )}
      </div>

    </div>
  );
}

export default Game;
