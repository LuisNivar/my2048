import cn from "classnames";
import React, { useCallback, useState } from "react";
import Container, { ContainerProps } from "../Container";
import styles from "./Board.module.css";
import Cells from "./Cells";
import Tiles from "./Tiles";

export type BoardProps = ContainerProps & {
  tiles: IGrid;
};

const Board = React.forwardRef<HTMLDivElement | null, BoardProps>(
  function Board(props, containerRef) {
    const { tiles, className, ...rest } = props;
    const [cellsPosition, setCellsPosition] = useState<Vector[]>([]);
    const rows = tiles.length;
    const columns = tiles[0].length ?? 0;

    const cellsRef = useCallback((positions: Vector[]) => {
      setCellsPosition(positions);
    }, []);

    return (
      <Container
        className={cn(className, styles.board)}
        tabIndex={0}
        ref={containerRef}
        {...rest}
      >
        <Cells rows={rows} columns={columns} ref={cellsRef} />
        <Tiles tiles={tiles} cellsPosition={cellsPosition} />
      </Container>
    );
  }
);

export default Board;
