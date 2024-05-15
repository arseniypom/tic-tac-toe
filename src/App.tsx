import { useEffect, useState } from 'react';
import phone from './icons/phone.svg';
import watch from './icons/smartwatch.svg';
import rayloLogo from './icons/raylo.svg';
import './App.css';

function Square({ value, onSquareClick }) {
  const displayIcon = !!value;
  const icon = value === 'phone' ? phone : watch;
  return (
    <button data-testId="square" className="square" onClick={onSquareClick}>
      {displayIcon && <img src={icon} alt={value} />}
    </button>
  );
}

function Board({ phoneIsNext, squares, onPlay, winner }) {
  function handleClick(i) {
    const nextSquares = squares.slice();
    if (winner || nextSquares[i]) {
      return;
    }
    if (phoneIsNext) {
      nextSquares[i] = 'phone';
    } else {
      nextSquares[i] = 'watch';
    }
    onPlay(nextSquares);
  }

  const status = undefined;

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [currentMove, setCurrentMove] = useState(0);
  const phoneIsNext = currentMove % 2 === 0;
  const [currentSquares, setCurrentSquares] = useState(Array(9).fill(null));
  const [status, setStatus] = useState(null);

  useEffect(() => {
    function calculateWinner() {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
          currentSquares[a] &&
          currentSquares[a] === currentSquares[b] &&
          currentSquares[a] === currentSquares[c]
        ) {
          setStatus(currentSquares[a]);
        }
      }
    }
    function checkForDraw() {
      if (!currentSquares.includes(null)) {
        setStatus('draw');
      }
    }
    calculateWinner();
    checkForDraw();
  }, [currentSquares]);

  function handlePlay(nextSquares) {
    setCurrentSquares(nextSquares);
    setCurrentMove(currentMove + 1);
  }

  function startAgain() {
    setCurrentMove(0);
    setCurrentSquares(Array(9).fill(null));
    setStatus(null);
  }

  function getGameStatus() {
    if (!status) {
      return <p>Next turn: {phoneIsNext ? 'Phone' : 'Watch'}</p>;
    }
    if (status === 'draw') {
      return <p>Draw, please start again</p>;
    }
    return <p>Congrats, {status}! You've won!</p>;
  }

  return (
    <div>
      <div style={{ margin: 'auto', width: '200px' }}>
        <img src={rayloLogo} alt="Raylo logo" className="raylo-logo" />
        <h1>Tic tac toe</h1>
      </div>
      <div className="game">
        <div className="game-board">
          <Board
            phoneIsNext={phoneIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            winner={status}
          />
          {getGameStatus()}
          <button type="button" onClick={startAgain}>
            Start again
          </button>
        </div>
      </div>
    </div>
  );
}
