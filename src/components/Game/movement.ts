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
  /** The tile that can be merged with the current one*/
  obstacle: ITile | null;
};

type GridIteratorCallback = (tile: ITile | null) => void;
//#endregion

export default function move(tiles: IGrid, direction: AllowedMovements) {
  tiles = [...tiles];
  let score = 0;
  let hasAnyTileMoved = false;

  forEachTile(tiles, direction, (tile) => {
    const { hasMoved, points } = moveToDirection(tiles, tile, direction);
    score += points;
    hasAnyTileMoved ||= hasMoved;
  });

  if (hasAnyTileMoved) {
    // Only add a new tile if a valid move was made
    insertRandomTile(tiles);
  }

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
      fn(tiles[y][x]);
    }
  }
}

function moveToDirection(
  tiles: IGrid,
  tile: ITile | null,
  direction: AllowedMovements
) {
  let hasMoved = false;
  let points = 0;

  if (!tile) {
    return { hasMoved, points };
  }
  const { x, y } = tile;
  const result = findNextObstacle(tiles, tile, direction);

  points = updateTilePosition(tiles, tile, result);
  hasMoved = result.emptySpot.x !== x || result.emptySpot.y !== y || points > 0;

  return { hasMoved, points };
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
    obstacle: isInbounds(tiles, next) ? tiles[next.y][next.x] : null,
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
  tile: ITile,
  movementResult: MovementResult
) {
  const { obstacle: nextTile, emptySpot } = movementResult;

  // Empty current tile since we are going to merge it or move it somewhere else
  tiles[tile.y][tile.x] = null;

  // Current tile has the same value as the next tile, so we merge them
  if (nextTile && nextTile.value === tile.value) {
    nextTile.value *= 2;
    return nextTile.value;
  }

  // Otherwise we just move the current tile to the empty spot
  tiles[emptySpot.y][emptySpot.x] = tile;
  tile.x = emptySpot.x;
  tile.y = emptySpot.y;
  return 0;
}
