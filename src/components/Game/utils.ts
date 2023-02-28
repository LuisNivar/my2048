// incremental id for the tiles's key
let idMaster = -1;

export function getNewId() {
  idMaster++;
  return idMaster;
}

export function getAvailableTiles(tiles: IGrid) {
  const emptyTiles: [number, number][] = [];
  for (let i = 0; i < tiles.length; i++) {
    for (let j = 0; j < tiles[0].length; j++) {
      if (!tiles[i][j]) {
        emptyTiles.push([i, j]);
      }
    }
  }
  return emptyTiles;
}

export function isGameOver(tiles: IGrid) {
  const rows = tiles.length;
  const cols = tiles[0].length;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const current = tiles[i][j];

      if (!current) {
        return false;
      }

      const isLastRow = i === rows - 1;
      const isLastCol = j === cols - 1;

      if (
        // We can merge down
        (!isLastRow && current.value === tiles[i + 1][j]?.value) ||
        // We can merge right
        (!isLastCol && current.value === tiles[i][j + 1]?.value)
      ) {
        return false;
      }
    }
  }

  return true;
}

export function insertRandomTile(tiles: IGrid, base = 2) {
  const emptyTiles = getAvailableTiles(tiles);

  if (emptyTiles) {
    const randomTile = Math.floor(Math.random() * emptyTiles.length);
    const [row, col] = emptyTiles[randomTile];

    // Randomly choose between base^1 and base^2 with preference to base ^1
    // The difficulty can be adjusted by changing the probability.

    tiles[row][col] = {
      id: getNewId(),
      value: Math.random() >= 0.9 ? Math.pow(base, 2) : base,
    };
  }
}
