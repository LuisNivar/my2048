import {
  forwardRef,
  MutableRefObject,
  useImperativeHandle,
  useRef,
} from "react";
import styles from "./Cells.module.css";

type CellProps = {
  rows: number;
  columns: number;
};

type CellContainers = Array<HTMLDivElement | null>;

const Cells = forwardRef<Vector[], CellProps>(function Cells(props, ref) {
  const { rows, columns } = props;
  const cellsRef = useRef<CellContainers>([]);

  useImperativeHandle(
    ref,
    () => {
      // user can change the number of rows and columns in the board settings
      updateCellsRefSize(cellsRef, rows, columns);
      return getCellsPosition(cellsRef);
    },
    [rows, columns]
  );

  return (
    <div
      className={styles.grid}
      style={{ "--columns": columns, "--rows": rows }}
    >
      {renderCells(rows, columns, cellsRef)}
    </div>
  );
});

function renderCells(
  rows: number,
  columns: number,
  cellsRef: React.MutableRefObject<CellContainers>
) {
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
  return cells;
}

function updateCellsRefSize(
  cellsRef: MutableRefObject<CellContainers>,
  rows: number,
  columns: number
) {
  cellsRef.current = cellsRef.current.slice(0, rows * columns);
}

function getCellsPosition(cellsRef: MutableRefObject<CellContainers>) {
  return cellsRef.current.map((element) => {
    if (!element) {
      return { x: 0, y: 0 };
    }
    return element.getBoundingClientRect();
  });
}

export default Cells;
