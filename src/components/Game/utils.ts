import { EMPTY_TILE } from "./constants";

export function getAvailableTiles(tiles: number[][]) {
  const emptyTiles: [number, number][] = [];
  for (let i = 0; i < tiles.length; i++) {
    for (let j = 0; j < tiles[0].length; j++) {
      if (tiles[i][j] === EMPTY_TILE) {
        emptyTiles.push([i, j]);
      }
    }
  }
  return emptyTiles;
}

export function isGameOver(tiles: number[][]) {
  const rows = tiles.length;
  const cols = tiles[0].length;

  // verify the rest of grid
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols - 1; j++) {
      const current = tiles[i][j];
      const rightTile = tiles[i][j + 1];

      const hasEmptyTiles = current === EMPTY_TILE || rightTile === EMPTY_TILE;
      const isLastRow = i === rows - 1;

      // Can we continue the game?
      if (
        hasEmptyTiles ||
        // We can merge to the right
        current === rightTile ||
        // We can merge down
        (!isLastRow && current === tiles[i + 1][j])
      ) {
        return false;
      }
    }
  }
  return true;
}

export function generateRandomTile(tiles: number[][], base = 2) {
  const emptyTiles = getAvailableTiles(tiles);

  if (emptyTiles) {
    const randomTile = Math.floor(Math.random() * emptyTiles.length);
    const [row, col] = emptyTiles[randomTile];

    // Randomly choose between base^1 and base^2 with preference to base ^1
    // The difficulty can be adjusted by changing the probability.
    tiles[row][col] = Math.random() >= 0.9 ? Math.pow(base, 2) : base;
  }
}
