import { insertRandomTile } from "./utils";

const Directions = {
  right: [1, 0],
  left: [-1, 0],
  down: [0, 1],
  up: [0, -1],
} as const;

//#region Typings
export type AllowedMovements = keyof typeof Directions;

type ObstaclePosition = {
  current: Vector;
  next: Vector;
};

type Score = number;

type TileCallback = (row: number, col: number, tile: ITile | null) => void;
//#endregion

function move(tiles: IGrid, direction: AllowedMovements) {
  tiles = [...tiles];
  let score = 0;

  forEachTile(tiles, direction, (row, col) => {
    score = moveToDirection(tiles, row, col, direction);
  });

  // Add a new tile every time the player makes a move
  insertRandomTile(tiles);

  return { tiles, score };
}

function forEachTile(tiles: IGrid, dir: AllowedMovements, fn: TileCallback) {
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
  row: number,
  col: number,
  direction: AllowedMovements
) {
  const tile = tiles[row][col];
  if (!tile) {
    return 0;
  }
  const obstaclePosition = findNextObstacle(tiles, row, col, direction);
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

function isInbounds(tiles: IGrid, col: number, row: number) {
  const rows = tiles.length;
  const cols = tiles[0].length ?? 0;

  return col >= 0 && col < cols && row >= 0 && row < rows;
}

function updateTilePosition(
  tiles: IGrid,
  currentTile: ITile,
  obstaclePosition: ObstaclePosition
): Score {
  const { next, current } = obstaclePosition;
  const nextTile = getNextTile(tiles, next);

  // Only Adjacent tiles with the same value can be merged
  const canMerge = nextTile && nextTile.value === currentTile?.value;

  if (canMerge) {
    mergeTiles(currentTile, nextTile);
    return nextTile.value;
  }

  placeTileAtLocation(tiles, currentTile, current);
  return 0;
}

function getNextTile(tiles: IGrid, next: Vector) {
  if (isInbounds(tiles, next.x, next.y)) {
    return tiles[next.y][next.x];
  }
  return null;
}

function mergeTiles(currentTile: ITile, nextTile: ITile, base = 2) {
  nextTile.value *= base;
  nextTile.id = currentTile.id;
}

function placeTileAtLocation(tiles: IGrid, tile: ITile, location: Vector) {
  tiles[location.y][location.x] = tile;
}

export default move;
