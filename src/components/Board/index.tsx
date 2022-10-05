import classNames from "classnames";
import React, { KeyboardEvent, useRef, useState } from "react";
import Container from "../Container";
import Tile from "../Tile";
import styles from "./index.module.css";
import { TileProps } from "../Tile";

export type BoardProps = {
  columns: number;
  rows: number;
  className?: string;
};

const BASE = 2;

const Directions = {
  right: [1, 0],
  left: [-1, 0],
  down: [0, 1],
  up: [0, -1],
};

/**
 * Extending CSS properties to add custom ones.
 * @see https://github.com/frenic/csstype/issues/63#issuecomment-466910109
 * @see https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
 */
interface BoardStyle extends React.CSSProperties {
  "--columns": number;
  "--rows": number;
}

function makeTiles(rows: number, cols: number) {
  const t = Array<number[]>(rows);
  for (let i = 0; i < t.length; i++) {
    t[i] = Array<number>(cols).fill(0);
  }
  return t;
}

function cloneTiles(tiles: number[][]) {
  const newTiles = [...tiles];
  for (let i = 0; i < newTiles.length; i++) {
    newTiles[i] = [...tiles[i]];
  }
  return newTiles;
}

function move(tiles: number[][], dir: keyof typeof Directions) {
  const rows = tiles.length;
  const cols = tiles[0].length;

  const [dx, dy] = Directions[dir];
  let rowIncrement = 1;
  let colIncrement = 1;
  let startRow = 0;
  let startCol = 0;

  // We want to look ahead where we are going, so that means that
  // If we are moving towards the right we need to to start from the right,
  // Likewise if we are moving down, we need to start from the bottom
  if (dir === "right") {
    startCol = cols - 1;
    colIncrement = -1;
  } else if (dir === "down") {
    startRow = rows - 1;
    rowIncrement = -1;
  }

  const isInbounds = (col: number, row: number) =>
    col >= 0 && col < cols && row >= 0 && row < rows;

  for (let y = startRow; y >= 0 && y < rows; y += rowIncrement) {
    for (let x = startCol; x >= 0 && x < cols; x += colIncrement) {
      const tile = tiles[y][x];
      if (!tile) {
        continue;
      }

      // Find the farthest empty location
      let [previousX, previousY] = [x, y];
      let [nextX, nextY] = [previousX + dx, previousY + dy];
      // Keep looking until an obstacle is found
      while (isInbounds(nextX, nextY) && !tiles[nextY][nextX]) {
        [previousX, previousY] = [nextX, nextY];
        [nextX, nextY] = [nextX + dx, nextY + dy];
      }

      // Empty current tile since we are going to merge it or move it somewhere else
      tiles[y][x] = 0;

      // Can we merge the next tile?
      if (isInbounds(nextX, nextY) && tiles[nextY][nextX] === tile) {
        tiles[nextY][nextX] *= 2;
      } else {
        // Move tile to its new position
        tiles[previousY][previousX] = tile;
      }
    }
  }

  return cloneTiles(tiles);
}

function Board(props: BoardProps) {
  const { columns, rows, className } = props;
  // Using useRef instead of useState to prevent react from re-rendering while the array is populating
  const cellsPosition = useRef<Array<Point>>([]);
  const [tiles, setTiles] = useState(
    new Array<TileProps | undefined>(rows * columns)
  );

  const style: BoardStyle = {
    "--columns": columns,
    "--rows": rows,
  };

  // Get bounding box and store the top-left coordinates
  const addLocation = (element: HTMLDivElement | null) => {
    const rect = element?.getBoundingClientRect();
    if (rect) {
      const position: Point = {
        x: Math.round(rect.x),
        y: Math.round(rect.y),
      };
      cellsPosition.current.push(position);
    }
  };

  const handledKeyup = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
        console.log(tiles);
        break;
      case "ArrowDown":
        break;
      case "ArrowRight":
        test_addTiles(0);
        break;
      case "ArrowLeft":
        test_addTiles(4);
        break;
    }
  };

  function test_addTiles(index: number) {
    let n = Math.pow(BASE, Math.round(Math.random() + 1));
    // if (tiles.length === 16) {
    //   console.log("Full Tiles");
    //   return;
    // }

    // do {
    //   index = Math.floor(Math.random() * rows * columns);
    // } while (tiles[index]);
    //setTiles([...SetPositionTile(index, n)]);
  }

  function setPositionTile(index: number, value: number) {
    const { x: newX, y: newY } = getPosition(index);
    const tmp = [...tiles];
    tmp[index] = { x: newX, y: newY, value: value };
    setTiles(tmp);
  }

  const getPosition = (index: number): Point => {
    const offsetX = cellsPosition.current[0].x;
    const offsetY = cellsPosition.current[0].y;
    const x = cellsPosition.current[index].x - offsetX;
    const y = cellsPosition.current[index].y - offsetY;

    return { x: x, y: y };
  };

  // Building Grid
  const cells: React.ReactNode[] = [];
  for (let i = 0; i < rows * columns; i++) {
    // Attaching addLocation as a callback to get the bounding box for each cell.
    // see https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
    cells.push(<div key={i} className={styles.cell} ref={addLocation} />);
  }
  const containerClass = classNames(className, styles.alignTop);

  return (
    <Container className={containerClass} onKeyUp={handledKeyup} tabIndex={0}>
      {tiles.map((props) => (props ? <Tile {...props} /> : <></>))}
      <div className={styles.grid} style={style}>
        {cells}
      </div>
    </Container>
  );
}

export default Board;
export { move };
