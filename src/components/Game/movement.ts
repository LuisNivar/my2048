import { insertRandomTile } from "./utils";

const Directions = {
  right: [1, 0],
  left: [-1, 0],
  down: [0, 1],
  up: [0, -1],
} as const;

//#region Typings
export type AllowedMovements = keyof typeof Directions;

type MovementResult = {
  /** Position of the next empty tile */
  emptySpot: Vector;
  /** Position of the next non-empty tile*/
  obstaclePosition?: Vector;
};

type GridIteratorCallback = (
  row: number,
  col: number,
  tile: ITile | null
) => void;
//#endregion

function move(tiles: IGrid, direction: AllowedMovements) {
  tiles = [...tiles];
  let score = 0;

  forEachTile(tiles, direction, (row, col) => {
    const tilePosition = { x: col, y: row };
    score = moveToDirection(tiles, tilePosition, direction);
  });

  // Add a new tile every time the player makes a move
  insertRandomTile(tiles);

  return { tiles, score };
}

function forEachTile(
  tiles: IGrid,
  dir: AllowedMovements,
  fn: GridIteratorCallback
) {
  const rows = tiles.length;
  const cols = tiles[0].length;

  const { startRow, startCol, rowIncrement, colIncrement } =
    getLoopInitializers(rows, cols, dir);

  for (let y = startRow; y >= 0 && y < rows; y += rowIncrement) {
    for (let x = startCol; x >= 0 && x < cols; x += colIncrement) {
      const tile = tiles[y][x];
      fn(y, x, tile);
    }
  }
}

function moveToDirection(
  tiles: IGrid,
  tilePosition: Vector,
  direction: AllowedMovements
) {
  const { y: row, x: col } = tilePosition;
  const tile = tiles[row][col];
  if (!tile) {
    return 0;
  }
  const obstaclePosition = findNextObstacle(tiles, tilePosition, direction);
  // Empty current tile since we are going to merge it or move it somewhere else
  tiles[row][col] = null;

  return updateTilePosition(tiles, tile, obstaclePosition);
}

function getLoopInitializers(
  rows: number,
  cols: number,
  dir: AllowedMovements
) {
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

function findNextObstacle(
  tiles: IGrid,
  tilePosition: Vector,
  dir: AllowedMovements
): MovementResult {
  const [dx, dy] = Directions[dir];

  let previous;
  let next = tilePosition;
  // Find the farthest empty location
  do {
    previous = next;
    next = { x: next.x + dx, y: next.y + dy };
  } while (isInbounds(tiles, next) && isEmptyTile(tiles, next));

  return {
    emptySpot: previous,
    obstaclePosition: isInbounds(tiles, next) ? next : undefined,
  };
}

function isInbounds(tiles: IGrid, position: Vector) {
  const rows = tiles.length;
  const cols = tiles[0].length ?? 0;
  const { x: col, y: row } = position;

  return col >= 0 && col < cols && row >= 0 && row < rows;
}

function isEmptyTile(tiles: IGrid, position: Vector) {
  return !tiles[position.y][position.x];
}

/**
 * Updates the tile position based on the movement result
 *
 * @returns Score produced by the movement
 */
function updateTilePosition(
  tiles: IGrid,
  currentTile: ITile,
  movementResult: MovementResult
) {
  const { obstaclePosition: next, emptySpot } = movementResult;
  const obstacle = next && tiles[next.y][next.x];

  // Current tile has the same value as the next tile, so we merge them
  if (obstacle?.value === currentTile.value) {
    obstacle.value *= 2;
    return obstacle.value;
  }

  // Otherwise we just move the current tile to the empty spot
  tiles[emptySpot.y][emptySpot.x] = currentTile;
  return 0;
}

export default move;
