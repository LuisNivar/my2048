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
  tiles: IGrid,
  tileValue: {
    row: number;
    col: number;
    value: number;
  }
) {
  const { row, col, value } = tileValue;
  tiles[row][col] = {
    id: utils.getNewId(),
    value: value,
  };
}

//#region Game Setup
test("Game automatically focuses on the board", () => {
  render(<Game rows={3} cols={3} />);

  expect(screen.getByLabelText("2048 game board")).toHaveFocus();
});

test("Should load initial state from local storage", () => {
  render(<Game rows={3} cols={3} />);
  expect(localStorage.getItem).toBeCalled();
});

test("The game initiates with a single tile placed randomly", () => {
  render(<Game rows={3} cols={3} />);

  expect(utils.insertRandomTile).toHaveBeenCalledTimes(1);
});

test("A new tile is generated when the user makes a valid move", async () => {
  const user = userEvent.setup();

  mockinsertRandomTile.mockImplementationOnce((tiles) => {
    insertTile(tiles, { row: 2, col: 2, value: 2 });
  });

  render(<Game rows={3} cols={3} />);

  await user.keyboard("[ArrowUp][ArrowDown][ArrowLeft][ArrowRight]");
  // 4 moves + initial random tile
  expect(utils.insertRandomTile).toHaveBeenCalledTimes(5);
});

test("Should not generate a new tile if no movement is possible", async () => {
  const user = userEvent.setup();
  mockinsertRandomTile.mockImplementationOnce((tiles) => {
    insertTile(tiles, { row: 0, col: 0, value: 2 });
  });

  render(<Game rows={3} cols={3} />);

  await user.keyboard("[ArrowLeft]");

  expect(utils.insertRandomTile).toHaveBeenCalledTimes(1);
});
//#endregion

test("Should generate a new tile after a merge", async () => {
  const user = userEvent.setup();
  mockinsertRandomTile.mockImplementationOnce((tiles) => {
    insertTile(tiles, { row: 0, col: 0, value: 2 });
    insertTile(tiles, { row: 0, col: 1, value: 2 });
  });

  render(<Game rows={3} cols={3} />);
  await user.keyboard("[ArrowRight]");

  expect(utils.insertRandomTile).toHaveBeenCalledTimes(2);
});

//#region Movement
test("Should persist game state when the user makes a move", async () => {
  const user = userEvent.setup();

  render(<Game rows={3} cols={3} />);

  await user.keyboard("[ArrowUp]");

  expect(localStorage.setItem).toBeCalled();
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

test("Moving a tile down with no obstacles ends at the bottom edge of the screen", async () => {
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

test("Moving a tile up with no obstacles ends at the upper edge of the screen", async () => {
  const user = userEvent.setup();

  mockinsertRandomTile.mockImplementationOnce((tiles) => {
    insertTile(tiles, { row: 2, col: 0, value: 2 });
  });

  render(<Game rows={3} cols={3} />);

  await user.keyboard("[ArrowUp]");

  expect(screen.queryByTestId("2,0")).toBe(null);
  expect(screen.getByTestId("0,0")).toHaveTextContent(/^2/);
});
//#endregion

//#region Merging
test("Should merge tile right when ArrowRight is pressed", async () => {
  const user = userEvent.setup();
  mockinsertRandomTile.mockImplementationOnce((tiles) => {
    insertTile(tiles, { row: 0, col: 0, value: 4 });
    insertTile(tiles, { row: 0, col: 1, value: 4 });
  });

  render(<Game rows={3} cols={3} />);

  await user.keyboard("[ArrowRight]");

  expect(screen.getByTestId("0,2")).toHaveTextContent(/^8/);
});

test("Should merge tile down when ArrowDown is pressed", async () => {
  const user = userEvent.setup();
  mockinsertRandomTile.mockImplementationOnce((tiles) => {
    insertTile(tiles, { row: 0, col: 0, value: 1024 });
    insertTile(tiles, { row: 2, col: 0, value: 1024 });
  });

  render(<Game rows={3} cols={3} />);

  await user.keyboard("[ArrowDown]");

  expect(screen.getByTestId("2,0")).toHaveTextContent(/^2048/);
});

test("Should merge tile left when ArrowLeft is pressed", async () => {
  const user = userEvent.setup();
  mockinsertRandomTile.mockImplementationOnce((tiles) => {
    insertTile(tiles, { row: 1, col: 2, value: 16 });
    insertTile(tiles, { row: 1, col: 0, value: 16 });
  });

  render(<Game rows={3} cols={3} />);

  await user.keyboard("[ArrowLeft]");

  expect(screen.getByTestId("1,0")).toHaveTextContent(/^32/);
});

test("Should merge tile up when ArrowUp is pressed", async () => {
  const user = userEvent.setup();
  mockinsertRandomTile.mockImplementationOnce((tiles) => {
    insertTile(tiles, { row: 1, col: 2, value: 2 });
    insertTile(tiles, { row: 2, col: 2, value: 2 });
  });

  render(<Game rows={3} cols={3} />);

  await user.keyboard("[ArrowUp]");

  expect(screen.getByTestId("0,2")).toHaveTextContent(/^4/);
});
//#endregion
