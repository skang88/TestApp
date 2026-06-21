import React, { useState } from 'react';

function Game() {
  // 게임 상태를 관리하기 위한 기본 상태 설정
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('playing'); // 'playing', 'paused', 'gameOver'
  const [message, setMessage] = useState('');

  // 예시: 점수를 증가시키는 함수 (실제 게임 로직은 추후 추가)
  const handleShoot = () => {
    if (gameState === 'playing') {
      setScore(prevScore => prevScore + 1);
      setMessage(`Score increased! Current Score: ${score}`);
    }
  };

  // 게임 오버 시 처리
  const handleGameOver = () => {
    setGameState('gameOver');
    setMessage(`Game Over! Final Score: ${score}`);
  };

  // 게임 재시작 시 상태 초기화
  const handlePlayAgain = () => {
    setScore(0);
    setGameState('playing');
    setMessage('');
  };

  // 메시지 표시를 위한 효과적인 렌더링 로직
  const renderGameArea = () => {
    if (gameState === 'playing') {
      return (
        <>
          <p>Click anywhere to shoot!</p>
          <button onClick={handleShoot}>Shoot</button>
        </>
      );
    } else if (gameState === 'gameOver') {
      return (
        <>
          <h2>Game Over!</h2>
          <p>{message}</p>
          <button onClick={handlePlayAgain}>Play Again</button>
        </>
      );
    } else if (gameState === 'paused') {
      return <p>Game is Paused</p>;
    }
    return null;
  };

  return (
    <div className="game-container">
      <h2 className="title">Shooting Game</h2>
      
      {/* 점수 표시 영역 */}
      <div className="score-board">
        Current Score: {score}
      </div>

      {/* 게임 플레이 영역 */}
      <div className="game-area">
        {renderGameArea()}
      </div>

    </div>
  );
}

export default Game;
