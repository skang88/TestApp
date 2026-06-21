import React from 'react';
import Game from './Game';
import './App.css'; // 필요에 따라 스타일 시트 생성

function App() {
  return (
    <div className="App" style={{ textAlign: 'center', padding: '20px' }}>
      <header>
        <h1>Shooting Game Web</h1>
      </header>
      <main>
        <Game />
      </main>
    </div>
  );
}

export default App;