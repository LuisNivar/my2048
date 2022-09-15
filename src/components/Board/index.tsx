import React, { useRef } from "react";
import Container from "../Container";
import styles from "./index.module.css";

export type BoardProps = {
  columns: number;
  rows: number;
  className?: string;
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

function Board(props: BoardProps) {
  const { columns, rows, className } = props;
  // Using useRef instead of useState to prevent react from re-rendering while the array is populating
  const cellsPosition = useRef<Array<Point>>([]);

  const style: BoardStyle = {
    "--columns": columns,
    "--rows": rows,
  };

  // Get bounding box and store the top-left coordinates
  const addLocation = (element: HTMLDivElement | null) => {
    const rect = element?.getBoundingClientRect();
    if (rect) {
      const position: Point = {
        x: rect.x,
        y: rect.y,
      };
      cellsPosition.current.push(position);
    }
  };

  // Building Grid
  const cells: React.ReactNode[] = [];
  for (let i = 0; i < rows * columns; i++) {
    // Attaching addLocation as a callback to get the bounding box for each cell.
    // see https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
    cells.push(<div key={i} className={styles.cell} ref={addLocation} />);
  }

  return (
    <Container className={className}>
      <div className={styles.grid} style={style}>
        {cells}
      </div>
    </Container>
  );
}

export default Board;
