import cn from "classnames";
import { useState, KeyboardEvent, useRef, useEffect } from "react";
import Board from "../Board";
import MenuSection from "../MenuSection";
import ScoreBoard from "../ScoreBoard";
import styles from "./index.module.css";

//#region Types
type GameProps = {
  className?: string;
  score: number;
  bestScore: number;
  rows: number;
  cols: number;
};

type GeneratorOptions = {
  base?: number;
  /** When true it randomly places a number equal to the base */
  initial?: boolean;
};
//#endregion

//#region Constants
const Directions = {
  right: [1, 0],
  left: [-1, 0],
  down: [0, 1],
  up: [0, -1],
};

const EMPTY = 0;
//#endregion

//#region Utilities
function initializeTiles(rows: number, cols: number) {
  const tiles = Array<number[]>(rows);
  for (let i = 0; i < tiles.length; i++) {
    tiles[i] = Array<number>(cols).fill(EMPTY);
  }

  generateRandomTile(tiles, { initial: true });
  generateRandomTile(tiles, { initial: true });

  return tiles;
}

function generateRandomTile(tiles: number[][], options: GeneratorOptions = {}) {
  const { base = 2, initial } = options;
  const rowSize = tiles.length;
  const colSize = tiles[0]?.length ?? 0;

  const emptyTiles: [number, number][] = [];

  for (let i = 0; i < rowSize; i++) {
    for (let j = 0; j < colSize; j++) {
      if (tiles[i][j] === EMPTY) {
        emptyTiles.push([i, j]);
      }
    }
  }

  if (!emptyTiles) {
    return;
  }

  const [row, col] = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];

  if (initial) {
    // Make this tile equal to the base to make sure it can be merged
    tiles[row][col] = base;
  } else {
    // Randomly choose between base^1 and base^2 with preference to base ^1
    // The difficulty can be adjusted by changing the probability.
    tiles[row][col] = Math.random() > 0.8 ? Math.pow(base, 2) : base;
  }
}

function move(tiles: number[][], dir: keyof typeof Directions) {
  tiles = [...tiles];
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
      tiles[y][x] = EMPTY;

      // Can we merge the next tile?
      if (isInbounds(nextX, nextY) && tiles[nextY][nextX] === tile) {
        tiles[nextY][nextX] *= 2;
      } else {
        // Move tile to its new position
        tiles[previousY][previousX] = tile;
      }
    }
  }
  // Add a new tile every time the player makes a move
  generateRandomTile(tiles);

  return tiles;
}
//#endregion

function Game(props: GameProps) {
  const { className, score, bestScore, rows, cols } = props;
  const boardRef = useRef<HTMLDivElement | null>(null);

  const [tiles, setTiles] = useState(() => initializeTiles(rows, cols));

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

  useEffect(() => {
    // Focus container on mount, so that the user can navigate the game using the controls directly
    boardRef.current?.focus();
  }, [boardRef]);

  return (
    <div className={cn(className, styles.game)}>
      <MenuSection className={styles.menu} />
      <ScoreBoard
        className={styles.scoreBoard}
        score={score}
        bestScore={bestScore}
      />
      <Board
        className={styles.board}
        tiles={tiles}
        onKeyUp={handledKeyup}
        ref={boardRef}
      />
    </div>
  );
}

export default Game;
export { move };
