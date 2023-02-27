import { EMPTY_TILE } from "./constants";
import { getNewId, insertRandomTile } from "./utils";

//#region Typings
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
function isInbounds(tiles: IGrid, col: number, row: number) {
  const rows = tiles.length;
  const cols = tiles[0].length ?? 0;

  return col >= 0 && col < cols && row >= 0 && row < rows;
}

// TODO: START MENU
// start screen / Clasic | Custom
// number of rows, columns and base
// Animation when merging, spawning, sliding

function findNextObstacle(
  tiles: IGrid,
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
  tiles: IGrid,
  currentTile: ITile,
  obstaclePosition: ObstaclePosition
) {
  const { next, current } = obstaclePosition;

  const nextTile = getNextTile(tiles, next);

  // If the next tile is the same as the current tile, merge them
  const canMerge = nextTile && nextTile.value === currentTile?.value;

  if (canMerge) {
    return mergeTile(nextTile, currentTile);
  }

  // There are no matching tiles, just move it to its new position
  tiles[current.y][current.x] = currentTile;
  return 0;
}

function getNextTile(tiles: IGrid, next: Vector) {
  if (isInbounds(tiles, next.x, next.y)) {
    return tiles[next.y][next.x];
  }
  return null;
}

function mergeTile(nextTile: ITile, currentTile: ITile) {
  const newValue = nextTile.value * 2;
  nextTile.value = newValue;
  nextTile.id = currentTile.id;
  return newValue;
}

function getTraversals(dir: AllowedMovements, cols: number, rows: number) {
  let move = {
    rowIncrement: 1,
    colIncrement: 1,
    startRow: 0,
    startCol: 0,
  };

  // We want to look ahead where we are going, so that means that
  // If we are moving towards the right we need to to start from the right,
  // Likewise if we are moving down, we need to start from the bottom
  if (dir === "right") {
    move.startCol = cols - 1;
    move.colIncrement = -1;
  } else if (dir === "down") {
    move.startRow = rows - 1;
    move.rowIncrement = -1;
  }

  return move;
}
//#endregion

function move(tiles: IGrid, dir: AllowedMovements) {
  tiles = [...tiles];
  const rows = tiles.length;
  const cols = tiles[0].length;

  let score = 0;

  const { startRow, startCol, rowIncrement, colIncrement } = getTraversals(
    dir,
    cols,
    rows
  );

  for (let y = startRow; y >= 0 && y < rows; y += rowIncrement) {
    for (let x = startCol; x >= 0 && x < cols; x += colIncrement) {
      const tile = tiles[y][x];
      if (!tile) continue;

      const obstaclePosition = findNextObstacle(tiles, y, x, dir);
      // Empty current tile since we are going to merge it or move it somewhere else
      tiles[y][x] = null;
      score = updateTilePosition(tiles, tile, obstaclePosition);
    }
  }

  // Add a new tile every time the player makes a move
  insertRandomTile(tiles);

  return { tiles, score };
}

export default move;
