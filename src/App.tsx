import React from 'react';
import logo from './logo.svg';
import './App.css';

function Card({value}: { value: number }) {
  return <button className="card">{value}</button>
}

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
