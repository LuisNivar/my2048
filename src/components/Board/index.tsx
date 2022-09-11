import React from "react";
import styles from "./index.module.css";
import Container from "../Container";

type GridProps = {
  columns: number;
  rows: number;
  className?: string;
};

/**
 * Extending CSS properties to add custom ones.
 * @see {@link https://github.com/frenic/csstype/issues/63#issuecomment-466910109}
 * @see {@link https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors}
 */
interface GridStyle extends React.CSSProperties {
  "--columns": number;
  "--rows": number;
}

function Board({ columns, rows, className }: GridProps) {
  const style: GridStyle = {
    "--columns": columns,
    "--rows": rows,
  };
  const cells = [...Array(rows * columns).keys()];

  return (
    <Container className={className}>
      <div className={styles.grid} style={style}>
        {cells.map((_, index) => (
          <div key={index} className={styles.cell} />
        ))}
      </div>
    </Container>
  );
}

export default Board;
