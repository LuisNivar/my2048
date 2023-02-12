import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Game from "..";
import * as utils from "../utils";

const mockinsertRandomTile = jest
  .spyOn(utils, "insertRandomTile")
  .mockImplementation(() => {});

// Utility so that we can swap out the implementation details
// when the representation of a Tile changes.
function insertTile(
  tiles: unknown[][],
  tileValue: {
    row: number;
    col: number;
    value: number;
  }
) {
  const { row, col, value } = tileValue;
  tiles[row][col] = value;
}

test("The game initiates with a single tile placed randomly", () => {
  render(<Game rows={3} cols={3} />);

  expect(utils.insertRandomTile).toHaveBeenCalledTimes(1);
});

test("A new tile is generated when the user makes a move", async () => {
  const user = userEvent.setup();

  render(<Game rows={3} cols={3} />);

  await user.keyboard("[ArrowUp][ArrowDown][ArrowLeft][ArrowRight]");
  // 4 moves + initial random tile
  expect(utils.insertRandomTile).toHaveBeenCalledTimes(5);
});

test("Moving a tile right with no obstacles ends at the right edge of the screen", async () => {
  const user = userEvent.setup();

  mockinsertRandomTile.mockImplementationOnce((tiles) => {
    insertTile(tiles, { row: 0, col: 0, value: 2 });
  });

  render(<Game rows={3} cols={3} />);

  await user.keyboard("[ArrowRight]");

  expect(screen.queryByTestId("0,0")).toBe(null);
  expect(screen.getByTestId("0,2")).toHaveTextContent(/^2/);
});

test("Moving a tile down with no obstacles ends at the down edge of the screen", async () => {
  const user = userEvent.setup();

  mockinsertRandomTile.mockImplementationOnce((tiles) => {
    insertTile(tiles, { row: 0, col: 0, value: 2 });
  });

  render(<Game rows={3} cols={3} />);

  await user.keyboard("[ArrowDown]");

  expect(screen.queryByTestId("0,0")).toBe(null);
  expect(screen.getByTestId("2,0")).toHaveTextContent(/^2/);
});

test("Moving a tile left with no obstacles ends at the left edge of the screen", async () => {
  const user = userEvent.setup();

  mockinsertRandomTile.mockImplementationOnce((tiles) => {
    insertTile(tiles, { row: 0, col: 2, value: 2 });
  });

  render(<Game rows={3} cols={3} />);

  await user.keyboard("[ArrowLeft]");

  expect(screen.queryByTestId("0,2")).toBe(null);
  expect(screen.getByTestId("0,0")).toHaveTextContent(/^2/);
});

test("Moving a tile up with no obstacles ends at the up edge of the screen", async () => {
  const user = userEvent.setup();

  mockinsertRandomTile.mockImplementationOnce((tiles) => {
    insertTile(tiles, { row: 2, col: 0, value: 2 });
  });

  render(<Game rows={3} cols={3} />);

  await user.keyboard("[ArrowUp]");

  expect(screen.queryByTestId("2,0")).toBe(null);
  expect(screen.getByTestId("0,0")).toHaveTextContent(/^2/);
});
