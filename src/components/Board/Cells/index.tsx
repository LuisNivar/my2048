import { forwardRef, useImperativeHandle, useRef } from "react";
import styles from "./Cells.module.css";

type CellProps = {
  rows: number;
  columns: number;
};

const Cells = forwardRef<Vector[], CellProps>(function Cells(props, ref) {
  const { rows, columns } = props;
  const cellsRef = useRef<Array<HTMLDivElement | null>>([]);

  useImperativeHandle(
    ref,
    () => {
      // Update Refs size when the number of tiles changes
      const cells = cellsRef.current.slice(0, rows * columns);
      cellsRef.current = cells;

      // Get top-left location of every cell
      return cells.map((element) => getElementPosition(element));
    },
    [rows, columns]
  );

  const cells = [];
  for (let i = 0; i < rows * columns; i++) {
    cells.push(
      <div
        className={styles.cell}
        key={i}
        ref={(element) => {
          cellsRef.current[i] = element;
        }}
      />
    );
  }

  return (
    <div
      className={styles.grid}
      style={{ "--columns": columns, "--rows": rows }}
    >
      {cells}
    </div>
  );
});

function getElementPosition(element: HTMLElement | null) {
  if (!element) {
    return { x: 0, y: 0 };
  }

  const rect = element.getBoundingClientRect();
  const position: Vector = {
    x: Math.round(rect.x),
    y: Math.round(rect.y),
  };
  return position;
}

export default Cells;
