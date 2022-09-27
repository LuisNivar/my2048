import { moveY } from ".";

test("Move tiles up by one position", () => {
  const tiles = [
    0, 0, 0, 
    0, 2, 0, 
    0, 0, 0
  ];
  // Hacer el movimiento
  expect(moveY(tiles, 3, 3, "up")).toEqual([
    0, 2, 0,
    0, 0, 0,
    0, 0, 0
  ]);
});

test("Move tiles down by one position", () => {
  const tiles = [
    0, 0, 0, 
    0, 2, 0, 
    0, 0, 0
  ];
  // Hacer el movimiento
  expect(moveY(tiles, 3, 3, "down")).toEqual([
    0, 0, 0,
    0, 0, 0,
    0, 2, 0
  ]);
});

test("Move up doesn't cause number to be out of bounds", () => {
  const tiles = [
    0, 2, 0, 
    0, 0, 0, 
    0, 0, 0
  ];

  expect(moveY(tiles, 3, 3, "up")).toEqual(tiles);
});

test("Move up causes tiles to move through the entire board when there are empty tiles on the way", () => {
  const tiles = [
    0, 0, 0,
    0, 0, 0,
    0, 2, 0
  ];
  expect(moveY(tiles, 3, 3, "up")).toEqual([
    0, 2, 0,
    0, 0, 0,
    0, 0, 0
  ]);
});

// Test merging UP when tiles have the same value and they are not empty "0"

export {};

