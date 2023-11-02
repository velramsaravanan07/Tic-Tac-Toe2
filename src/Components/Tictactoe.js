import React, { useState, useEffect } from "react";
import Board from "./Board";
import GamerOver from "./GamerOver";
import GameStates from "./GameState";
import Reset from "./Reset";

const PLAYER_X = "X";
const PLAYER_O = "O";

const WinningCombinations = [
  { combo: [0, 1, 2], strikeClass: "strike-row-1" },
  { combo: [3, 4, 5], strikeClass: "strike-row-2" },
  { combo: [6, 7, 8], strikeClass: "strike-row-3" },
  { combo: [0, 3, 6], strikeClass: "strike-column-1" },
  { combo: [1, 4, 7], strikeClass: "strike-column-2" },
  { combo: [2, 5, 8], strikeClass: "strike-column-3" },
  { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
  { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" },
];

function checkWinner(tiles, setStrikeClass, setGameState) {
  for (const { combo, strikeClass } of WinningCombinations) {
    const tilesValue1 = tiles[combo[0]];
    const tilesValue2 = tiles[combo[1]];
    const tilesValue3 = tiles[combo[2]];
    if (
      tilesValue1 !== null &&
      tilesValue1 === tilesValue2 &&
      tilesValue1 === tilesValue3
    ) {
      setStrikeClass(strikeClass);
      if (tilesValue1 === PLAYER_X) {
        setGameState(GameStates.playerXWins);
      } else {
        setGameState(GameStates.playerOWins);
      }
      return;
    }
  }
  const areAllTilesFilledIn = tiles.every((tile) => tile !== null);
  if (areAllTilesFilledIn) {
    setGameState(GameStates.draw);
  }
}

function TicTacToe() {
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
  const [strikeClass, setStrikeClass] = useState(null);
  const [gameState, setGameState] = useState(GameStates.inProgress);

  const HandleTileClick = (index) => {
    if (gameState !== GameStates.inProgress) {
      return;
    }

    if (tiles[index] !== null) {
      return;
    }

    const newTiles = [...tiles];
    newTiles[index] = playerTurn;
    setTiles(newTiles);
    if (playerTurn === PLAYER_X) {
      setPlayerTurn(PLAYER_O);
    } else {
      setPlayerTurn(PLAYER_X);
    }
  };

  const handleReset = () => {
    setGameState(GameStates.inProgess); // Fixed the typo here
    setTiles(Array(9).fill(null));
    setPlayerTurn(PLAYER_X);
    setStrikeClass(null);
  };

  useEffect(() => {
    checkWinner(tiles, setStrikeClass, setGameState);
  }, [tiles]);

  return (
    <div>
      <h1>TicTacToe</h1>
      <Board
        playerTurn={playerTurn}
        tiles={tiles}
        onTileClick={HandleTileClick}
        strikeClass={strikeClass}
      />
      <GamerOver gameState={gameState} />
      <Reset gameState={gameState} onReset={handleReset}/>
    </div>
  );
}

export default TicTacToe;
