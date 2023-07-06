import React from 'react';

type PlayerProps = {
  handleTakeMatches: (num: number) => void;
};

function Player({ handleTakeMatches }: PlayerProps) {

  return (
    <div>
      <h3>Your Turn</h3>
      <button onClick={() => handleTakeMatches(1)}>Take 1</button>
      <button onClick={() => handleTakeMatches(2)}>Take 2</button>
      <button onClick={() => handleTakeMatches(3)}>Take 3</button>
    </div>
  );
}

export default Player;
