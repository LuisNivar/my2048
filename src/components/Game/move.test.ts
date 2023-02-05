import move from "./movement";

test("Move tiles right", () => {
  const tiles = [
    [0, 2, 0],
    [2, 0, 0],
    [0, 0, 0],
  ];
  expect(move(tiles, "right")).toEqual([
    [0, 0, 2],
    [0, 0, 2],
    [0, 0, 0],
  ]);
});

test("Moving right doesn't change anything if tile is at the last position", () => {
  const tiles = [
    [0, 0, 0],
    [0, 0, 2],
    [0, 0, 0],
  ];
  expect(move(tiles, "right")).toEqual(tiles);
});

test("Move tiles right with obstacles, and no merge possible", () => {
  const tiles = [
    [0, 0, 0],
    [2, 1, 0],
    [0, 0, 0],
  ];
  expect(move(tiles, "right")).toEqual([
    [0, 0, 0],
    [0, 2, 1],
    [0, 0, 0],
  ]);
});

test("Move tiles right with merge at middle", () => {
  const tiles = [
    [0, 0, 0],
    [2, 2, 0],
    [0, 0, 0],
  ];
  expect(move(tiles, "right")).toEqual([
    [0, 0, 0],
    [0, 0, 4],
    [0, 0, 0],
  ]);
});

test("Move tiles right with multiple merges", () => {
  const tiles = [
    [2, 2, 1],
    [0, 4, 4],
    [1, 2, 1],
  ];
  expect(move(tiles, "right")).toEqual([
    [0, 4, 1],
    [0, 0, 8],
    [1, 2, 1],
  ]);
});

test("Move tiles left", () => {
  const tiles = [
    [0, 2, 0],
    [2, 0, 0],
    [0, 0, 0],
  ];
  expect(move(tiles, "left")).toEqual([
    [2, 0, 0],
    [2, 0, 0],
    [0, 0, 0],
  ]);
});

test("Merge tiles left", () => {
  const tiles = [
    [2, 2, 0],
    [2, 0, 0],
    [0, 0, 0],
  ];
  expect(move(tiles, "left")).toEqual([
    [4, 0, 0],
    [2, 0, 0],
    [0, 0, 0],
  ]);
});

test("Move tiles down", () => {
  const tiles = [
    [1, 2, 0],
    [2, 0, 0],
    [0, 0, 0],
  ];
  expect(move(tiles, "down")).toEqual([
    [0, 0, 0],
    [1, 0, 0],
    [2, 2, 0],
  ]);
});

test("Merge tiles down", () => {
  const tiles = [
    [1, 2, 0],
    [2, 2, 0],
    [0, 0, 0],
  ];
  expect(move(tiles, "down")).toEqual([
    [0, 0, 0],
    [1, 0, 0],
    [2, 4, 0],
  ]);
});

test("Move tiles up", () => {
  const tiles = [
    [0, 0, 0],
    [0, 4, 0],
    [0, 0, 0],
  ];
  expect(move(tiles, "up")).toEqual([
    [0, 4, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
});

test("Merges tiles up", () => {
  const tiles = [
    [2, 2, 8],
    [0, 4, 2],
    [2, 4, 4],
  ];
  expect(move(tiles, "up")).toEqual([
    [4, 2, 8],
    [0, 8, 2],
    [0, 0, 4],
  ]);
});

test("Only one tile is merged at a time when moving right", () => {
  const tiles = [
    [2, 2, 4],
    [0, 0, 0],
    [0, 0, 0],
  ];
  expect(move(tiles, "right")).toEqual([
    [0, 4, 4],
    [0, 0, 0],
    [0, 0, 0],
  ]);
});

test("Only one tile is merged at a time when moving down", () => {
  const tiles = [
    [2, 2, 0],
    [2, 2, 0],
    [4, 2, 0],
  ];
  expect(move(tiles, "down")).toEqual([
    [0, 0, 0],
    [4, 2, 0],
    [4, 4, 0],
  ]);
});
