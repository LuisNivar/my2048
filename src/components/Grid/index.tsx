import React from "react";
import styles from "./index.module.css";

type GridProps = {
  columns: number;
  rows: number;
  children: React.ReactNode;
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

function Grid({ children, columns, rows }: GridProps) {
  const style: GridStyle = {
    "--columns": columns,
    "--rows": rows,
  };

  return (
    <div className={styles.grid} style={style}>
      {children}
    </div>
  );
}

export default Grid;
