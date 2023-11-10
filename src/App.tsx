import React from 'react';
import './App.css';
import Card from './components/Card'

function Board() {
  return (
    <>
      <div className="board-row">
        <Card value={1} />
        <Card value={2} />
        <Card value={3} />
      </div>
    </>
  )
}

function App() {
  return (
    <div className="App">
      <Board />
    </div>
  );
}

export default App;
