import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import Container, { ContainerProps } from "../Container";
import Tile from "../Tile";
import styles from "./index.module.css";

export type BoardProps = ContainerProps & {
  tiles: number[][];
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

const Board = React.forwardRef<HTMLDivElement | null, BoardProps>(
  (props, containerRef) => {
    const { tiles, className, ...rest } = props;
    const cellsRef = useRef<Array<HTMLDivElement | null>>([]);
    const [cellsPosition, setCellsPosition] = useState<Point[]>([]);

    const rows = tiles.length;
    const columns = tiles[0].length;

    const style: BoardStyle = {
      "--columns": columns,
      "--rows": rows,
    };

    useEffect(() => {
      // Update Refs size when the number of tiles changes
      const cells = cellsRef.current.slice(0, rows * columns);
      cellsRef.current = cells;

      // Get top-left location of every cell
      const positions = cells.map((cellDiv) => {
        if (!cellDiv) {
          return { x: 0, y: 0 };
        }
        const rect = cellDiv.getBoundingClientRect();
        const position: Point = {
          x: Math.round(rect.x),
          y: Math.round(rect.y),
        };
        return position;
      });

      setCellsPosition(positions);
    }, [rows, columns]);

    // Building Grid
    const cells: React.ReactNode[] = [];
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

    const containerClass = classNames(className, styles.alignTop);

    return (
      <Container
        className={containerClass}
        tabIndex={0}
        ref={containerRef}
        {...rest}
      >
        <div className={styles.grid} style={style}>
          {cells}
        </div>

        {cellsPosition.map((position, index) => {
          const row = Math.floor(index / rows);
          const col = index % columns;
          // Tile coordinates are relative to the window, however,
          // On the CSS side they are relative to the Container.
          // Since the first cell is located at the top-left corner of the container
          // it can be used to make tile's coordinates relative to the Container itself.
          const firstCellPosition = cellsPosition[0];

          return (
            <Tile
              // TODO uniquely identify every tile
              key={index}
              value={tiles[row][col]}
              x={position.x - firstCellPosition.x}
              y={position.y - firstCellPosition.y}
            />
          );
        })}
      </Container>
    );
  }
);

export default Board;
