import React, { useState, useEffect } from 'react';
import Player from './Player';

type GameMode = 'userFirst' | 'aiFirst';
type Turn = 'User' | 'Ai';

function Game() {
  const [matches, setMatches] = useState(25);
  const [userMatches, setUserMatches] = useState(0);
  const [aiMatches, setAiMatches] = useState(0);
  const [gameMode, setGameMode] = useState<GameMode>('userFirst');
  const [turn, setTurn] = useState<Turn>('User');

  // Calculations
  const handleTakeMatches = (number: number) => {
    if (matches < number) {
      alert(`You cannot take ${number} matches as there are only ${matches} left.`);
    } else if (matches === number) {
      setMatches(matches - number);
      handleGameOver();
    } else if (matches - number > 0) {
      setMatches(matches - number);
      if (turn === 'User') {
        setUserMatches(userMatches + number);
        setTurn('Ai');
      } else if (turn === 'Ai') {
        setAiMatches(aiMatches + number);
        setTurn('User');
      }
    }
  };
  
  //AiTurn
   useEffect(() => {
    if (turn === 'Ai') {
      handleAIMove();
    }
  }, [turn]);

  const handleAIMove = (): void => {
    const aiMove = determineOptimalMove(matches); // Call the determineOptimalMove function to get the AI's move
    handleTakeMatches(aiMove); // Pass the AI's move to the handleTakeMatches function
  };

//OptiomalAiMove
function determineOptimalMove(matches: number) {
  // Determine the current parity
  const isEven = matches % 2 === 0;

  // Check the current parity and select the optimal move accordingly
  if (isEven) {
    if (matches <= 3) {
      return matches; // Take all the matches to force an odd parity on the opponent
    } else {
      return Math.floor(Math.random() * 3) + 1; // Take any number of matches between 1 and 3 to maintain even parity
    }
  } else {
    if (matches <= 3) {
      return matches; // Take all the matches to force an even parity on the opponent
    } else {
      // Find a move that leads to an even parity if possible
      for (let move = 1; move <= 3; move++) {
        if ((matches - move) % 2 === 0) {
          return move;
        }
      }

      return Math.floor(Math.random() * 3) + 1; // If an even parity move is not possible, take any number of matches between 1 and 3
    }
  }
}
  //GameOver
  const handleGameOver = ():void => {
    if (userMatches % 2 === 0) {
      alert(`Congratulations! Tou are the winner!`);
    } else {
      alert(`Game over! Ai wins!`);
    }

    setMatches(25);
    setUserMatches(0);
    setAiMatches(0);
    setGameMode('userFirst');
  };

  //Restart
  const handleRestart = (mode: GameMode): void => {
    setGameMode(mode);
    if (mode === 'aiFirst') {
      setTurn('Ai');
    } else if (mode === 'userFirst') {
      setTurn('User');
    }
    setMatches(25);
    setUserMatches(0);
    setAiMatches(0);
  };

  return (
    <div>
      <h2>Matches Remaining: {matches}</h2>
      
        <Player handleTakeMatches={handleTakeMatches} />
   
      <h2>User Matches: {userMatches}</h2>
      <h2>Ai Matches: {aiMatches}</h2>
      <div>
        <button onClick={() => handleRestart('userFirst')}>
          Play (User First)
        </button>
        <button onClick={() => handleRestart('aiFirst')}>
          Play (AI First)
        </button>
      </div>
    </div>
  );
}

export default Game;
