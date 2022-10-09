import classNames from "classnames";
import { useState, KeyboardEvent } from "react";
import Board from "../Board";
import MenuSection from "../MenuSection";
import ScoreBoard from "../ScoreBoard";
import styles from "./index.module.css";

type GameProps = {
  className?: string;
  score: number;
  bestScore: number;
  rows: number;
  cols: number;
};

const Directions = {
  right: [1, 0],
  left: [-1, 0],
  down: [0, 1],
  up: [0, -1],
};

function cloneTiles(tiles: number[][]) {
  const newTiles = [...tiles];
  for (let i = 0; i < newTiles.length; i++) {
    newTiles[i] = [...tiles[i]];
  }
  return newTiles;
}

function move(tiles: number[][], dir: keyof typeof Directions) {
  const rows = tiles.length;
  const cols = tiles[0].length;

  const [dx, dy] = Directions[dir];
  let rowIncrement = 1;
  let colIncrement = 1;
  let startRow = 0;
  let startCol = 0;

  // We want to look ahead where we are going, so that means that
  // If we are moving towards the right we need to to start from the right,
  // Likewise if we are moving down, we need to start from the bottom
  if (dir === "right") {
    startCol = cols - 1;
    colIncrement = -1;
  } else if (dir === "down") {
    startRow = rows - 1;
    rowIncrement = -1;
  }

  const isInbounds = (col: number, row: number) =>
    col >= 0 && col < cols && row >= 0 && row < rows;

  for (let y = startRow; y >= 0 && y < rows; y += rowIncrement) {
    for (let x = startCol; x >= 0 && x < cols; x += colIncrement) {
      const tile = tiles[y][x];
      if (!tile) {
        continue;
      }

      // Find the farthest empty location
      let [previousX, previousY] = [x, y];
      let [nextX, nextY] = [previousX + dx, previousY + dy];
      // Keep looking until an obstacle is found
      while (isInbounds(nextX, nextY) && !tiles[nextY][nextX]) {
        [previousX, previousY] = [nextX, nextY];
        [nextX, nextY] = [nextX + dx, nextY + dy];
      }

      // Empty current tile since we are going to merge it or move it somewhere else
      tiles[y][x] = 0;

      // Can we merge the next tile?
      if (isInbounds(nextX, nextY) && tiles[nextY][nextX] === tile) {
        tiles[nextY][nextX] *= 2;
      } else {
        // Move tile to its new position
        tiles[previousY][previousX] = tile;
      }
    }
  }

  return cloneTiles(tiles);
}

function Game(props: GameProps) {
  const { score, bestScore, rows, cols } = props;

  const gameClass = classNames(props.className, styles.game);
  const [tiles, setTiles] = useState<number[][]>(() => {
    const tiles = Array<number[]>(rows);
    for (let i = 0; i < tiles.length; i++) {
      tiles[i] = Array<number>(cols).fill(0);
    }
    // TODO create 2 random tiles
    tiles[0][1] = 2;
    tiles[1][3] = 2;

    return tiles;
  });

  const handledKeyup = (e: KeyboardEvent) => {
    let nextTiles = tiles;
    switch (e.key) {
      case "ArrowUp":
        nextTiles = move(tiles, "up");
        break;
      case "ArrowDown":
        nextTiles = move(tiles, "down");
        break;
      case "ArrowRight":
        nextTiles = move(tiles, "right");
        break;
      case "ArrowLeft":
        nextTiles = move(tiles, "left");
        break;
    }

    setTiles(nextTiles);
  };

  return (
    <div className={gameClass}>
      <MenuSection className={styles.menu} />
      <ScoreBoard
        className={styles.scoreBoard}
        score={score}
        bestScore={bestScore}
      />
      <Board className={styles.board} tiles={tiles} onKeyUp={handledKeyup} />
    </div>
  );
}

export default Game;
export { move };
