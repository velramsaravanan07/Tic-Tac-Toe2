import React from 'react';
import GameStates from './GameState';

export default function GamerOver({ gameState }) {
  switch (gameState) {
    case GameStates.inProgess:
      return <></>;
    case GameStates.playerOWins:
      return <div className="game-over">O Wins</div>;
    case GameStates.playerXWins:
      return <div className="game-over">X Wins</div>;
    case GameStates.draw:
      return <div className="game-over">Draw</div>;
    default:
      return <></>;
  }
}
