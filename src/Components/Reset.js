import React from 'react';
import GameState from './GameState';

export default function Reset({ gameState, onReset }) {
  if (gameState === GameState.inProgess) {
    return ;
  }

  return (
    <button onClick={onReset} className="reset-button">
      Reset Game
    </button>
  );
}
