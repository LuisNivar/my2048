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

type DirectionY = "up" | "down";
type DirectionX = "left" | "right";

/**
 * Extending CSS properties to add custom ones.
 * @see https://github.com/frenic/csstype/issues/63#issuecomment-466910109
 * @see https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
 */
interface BoardStyle extends React.CSSProperties {
  "--columns": number;
  "--rows": number;
}

/**
 * 1 2 3
 * 4 5 6
 * 7 8 9
 */
function Index(i: number, j: number, columns: number) {
  return i * columns + j;
}

function moveY(
  tiles: number[],
  rows: number,
  columns: number,
  dir: DirectionY
) {
  let tmp = [...tiles];

  const startRow = dir === "up" ? rows - 1 : 0;
  const endRow = dir === "up" ? 0 : rows - 1;
  const direction = dir === "up" ? -1 : 1;

  let i = startRow;

  while (i != endRow) {
    for (let j = 0; j < columns; j++) {
      const cur = Index(i, j, columns);
      const incoming = Index(i + direction, j, columns);
      tmp[incoming] = tiles[cur];
    }
    i += direction;
  }

  return tmp;
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
export { moveY };
