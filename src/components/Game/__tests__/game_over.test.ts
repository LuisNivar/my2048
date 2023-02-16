import { isGameOver } from "../utils";

test("Merge tile in the top", () => {
  const tiles = [
    [1, 4, 3],
    [2, 4, 7],
    [1, 3, 2],
  ];
  expect(isGameOver(tiles)).toBeFalsy();
});

test("Merge tile in the bottom", () => {
  const tiles = [
    [1, 2, 3],
    [2, 3, 4],
    [1, 3, 2],
  ];
  expect(isGameOver(tiles)).toBeFalsy();
});

test("Merge tile in the right", () => {
  const tiles = [
    [1, 2, 4],
    [2, 3, 3],
    [1, 4, 2],
  ];
  expect(isGameOver(tiles)).toBeFalsy();
});

test("Merge tile in the left", () => {
  const tiles = [
    [1, 2, 3],
    [3, 3, 4],
    [1, 4, 2],
  ];
  expect(isGameOver(tiles)).toBeFalsy();
});

test("Merge tile in the up right corner", () => {
  const tiles = [
    [1, 2, 4],
    [2, 3, 4],
    [4, 4, 2],
  ];
  expect(isGameOver(tiles)).toBeFalsy();
});

test("Merge tile in the up left corner", () => {
  const tiles = [
    [2, 1, 2],
    [2, 3, 4],
    [4, 1, 2],
  ];
  expect(isGameOver(tiles)).toBeFalsy();
});

test("Merge tile in the down left corner", () => {
  const tiles = [
    [1, 2, 1],
    [2, 3, 4],
    [4, 4, 2],
  ];
  expect(isGameOver(tiles)).toBeFalsy();
});

test("Merge tile in the down right corner", () => {
  const tiles = [
    [1, 2, 1],
    [2, 3, 2],
    [1, 4, 4],
  ];
  expect(isGameOver(tiles)).toBeFalsy();
});

test("Merge tile in the entire middle column", () => {
  const tiles = [
    [1, 2, 1],
    [2, 2, 3],
    [1, 2, 1],
  ];
  expect(isGameOver(tiles)).toBeFalsy();
});

test("Merge tile in the entire left column", () => {
  const tiles = [
    [1, 2, 1],
    [1, 4, 3],
    [1, 2, 1],
  ];
  expect(isGameOver(tiles)).toBeFalsy();
});

test("Merge tile in the entire right column", () => {
  const tiles = [
    [1, 3, 2],
    [2, 4, 2],
    [1, 3, 2],
  ];
  expect(isGameOver(tiles)).toBeFalsy();
});

test("Merge tile in the entire last row", () => {
  const tiles = [
    [1, 3, 2],
    [5, 4, 3],
    [2, 2, 2],
  ];
  expect(isGameOver(tiles)).toBeFalsy();
});

test("Merge tile in the entire middle row", () => {
  const tiles = [
    [2, 1, 2],
    [4, 4, 4],
    [2, 1, 2],
  ];
  expect(isGameOver(tiles)).toBeFalsy();
});

test("Merge tile in the entire first row", () => {
  const tiles = [
    [2, 2, 2],
    [5, 4, 3],
    [2, 1, 2],
  ];
  expect(isGameOver(tiles)).toBeFalsy();
});

test("Empty tiles in the entire last row", () => {
  const tiles = [
    [1, 3, 2],
    [5, 4, 3],
    [0, 0, 0],
  ];
  expect(isGameOver(tiles)).toBeFalsy();
});

test("Empty tiles in the entire last colunm", () => {
  const tiles = [
    [1, 3, 0],
    [5, 4, 0],
    [2, 1, 0],
  ];
  expect(isGameOver(tiles)).toBeFalsy();
});

test("Empty tiles in the right down corner", () => {
  const tiles = [
    [1, 3, 1],
    [5, 4, 2],
    [2, 1, 0],
  ];
  expect(isGameOver(tiles)).toBeFalsy();
});
