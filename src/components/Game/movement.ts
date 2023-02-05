import { EMPTY_TILE } from "./constants";
import { generateRandomTile } from "./utils";

const Directions = {
  right: [1, 0],
  left: [-1, 0],
  down: [0, 1],
  up: [0, -1],
} as const;

export type AllowedMovements = keyof typeof Directions;

function move(tiles: number[][], dir: AllowedMovements) {
  tiles = [...tiles];
  const rows = tiles.length;
  const cols = tiles[0].length;
  const [dx, dy] = Directions[dir];

  let points = 0;

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
      tiles[y][x] = EMPTY_TILE;

      // Can we merge the next tile?
      if (isInbounds(nextX, nextY) && tiles[nextY][nextX] === tile) {
        const newValue = tiles[nextY][nextX] * 2;
        tiles[nextY][nextX] = newValue;
        points += newValue;
      } else {
        // Move tile to its new position
        tiles[previousY][previousX] = tile;
      }
    }
  }
  // Add a new tile every time the player makes a move
  generateRandomTile(tiles);

  return { tiles, points };
}

export default move;
