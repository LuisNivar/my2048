import { MutableRefObject, useEffect, useRef } from "react";
import useOnResize from "../../../hooks/useOnResize";
import styles from "./Cells.module.css";

type CellProps = {
  rows: number;
  columns: number;
  /** Called when cells render, or the window resizes*/
  onRendered?(positions: Vector[]): void;
};

type CellContainers = Array<HTMLDivElement | null>;

function Cells(props: CellProps) {
  const { rows, columns, onRendered } = props;
  const numOfCells = rows * columns;
  const cellContainers = useCellContainersRef(numOfCells);

  useOnResize(() => {
    onRendered?.(getCellsPosition(cellContainers));
  });

  return (
    <div
      className={styles.grid}
      style={{ "--columns": columns, "--rows": rows }}
    >
      {renderCells(cellContainers, numOfCells)}
    </div>
  );
}

function useCellContainersRef(numOfCells: number) {
  const cellsRef = useRef<CellContainers>(Array(numOfCells));
  useEffect(() => {
    // User can change the number of rows and columns so we need to keep it in sync
    cellsRef.current = cellsRef.current.slice(0, numOfCells);
  }, [numOfCells]);
  return cellsRef;
}

function renderCells(cellsRef: MutableRefObject<CellContainers>, size: number) {
  return Array.from({ length: size }, (_, i) => (
    <div
      className={styles.cell}
      key={i}
      ref={(element) => {
        cellsRef.current[i] = element;
      }}
    />
  ));
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
