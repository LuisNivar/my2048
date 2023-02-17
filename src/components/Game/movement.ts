import { EMPTY_TILE } from "./constants";
import { insertRandomTile } from "./utils";

//#region Typings
type Vector = { x: number; y: number };

type ObstaclePosition = {
  current: Vector;
  next: Vector;
};
//#endregion

const Directions = {
  right: [1, 0],
  left: [-1, 0],
  down: [0, 1],
  up: [0, -1],
} as const;

export type AllowedMovements = keyof typeof Directions;

//#region Helpers
function isInbounds(tiles: number[][], col: number, row: number) {
  const rows = tiles.length;
  const cols = tiles[0].length ?? 0;

  return col >= 0 && col < cols && row >= 0 && row < rows;
}

function findNextObstacle(
  tiles: number[][],
  row: number,
  col: number,
  dir: AllowedMovements
): ObstaclePosition {
  const [dx, dy] = Directions[dir];

  // Find the farthest empty location
  let [previousX, previousY] = [col, row];
  let [nextX, nextY] = [previousX + dx, previousY + dy];
  // Keep looking until an obstacle is found
  while (isInbounds(tiles, nextX, nextY) && !tiles[nextY][nextX]) {
    [previousX, previousY] = [nextX, nextY];
    [nextX, nextY] = [nextX + dx, nextY + dy];
  }

  return {
    current: { x: previousX, y: previousY },
    next: { x: nextX, y: nextY },
  };
}

/**
 * @returns Resulting score after moving the tiles
 */
function updateTilePosition(
  tiles: number[][],
  currentValue: number,
  obstaclePosition: ObstaclePosition
) {
  const { next, current } = obstaclePosition;

  // Can this tile be merged?
  if (
    isInbounds(tiles, next.x, next.y) &&
    tiles[next.y][next.x] === currentValue
  ) {
    const newValue = tiles[next.y][next.x] * 2;
    tiles[next.y][next.x] = newValue;

    return newValue;
  }

  // There are no matching tiles, just move it to its new position
  tiles[current.y][current.x] = currentValue;
  return 0;
}
//#endregion

function move(tiles: number[][], dir: AllowedMovements) {
  tiles = [...tiles];
  const rows = tiles.length;
  const cols = tiles[0].length;

  let score = 0;

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

  for (let y = startRow; y >= 0 && y < rows; y += rowIncrement) {
    for (let x = startCol; x >= 0 && x < cols; x += colIncrement) {
      const tile = tiles[y][x];
      if (!tile) continue;

      const obstaclePosition = findNextObstacle(tiles, y, x, dir);
      // Empty current tile since we are going to merge it or move it somewhere else
      tiles[y][x] = EMPTY_TILE;

      score = updateTilePosition(tiles, tile, obstaclePosition);
    }
  }

  // Add a new tile every time the player makes a move
  insertRandomTile(tiles);

  return { tiles, score };
}

export default move;
