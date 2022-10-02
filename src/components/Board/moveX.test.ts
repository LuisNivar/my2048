import { moveX } from ".";

test("Move tiles right", () => {
  const tiles = [
    [0, 2, 0],
    [2, 0, 0],
    [0, 0, 0],
  ];
  expect(moveX(tiles, "right")).toEqual([
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
  expect(moveX(tiles, "right")).toEqual(tiles);
});

test("Move tiles right with obstacles, and no merge possible", () => {
  const tiles = [
    [0, 0, 0],
    [2, 1, 0],
    [0, 0, 0],
  ];
  expect(moveX(tiles, "right")).toEqual([
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
  expect(moveX(tiles, "right")).toEqual([
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
  expect(moveX(tiles, "right")).toEqual([
    [0, 4, 1],
    [0, 0, 8],
    [1, 2, 1],
  ]);
});
