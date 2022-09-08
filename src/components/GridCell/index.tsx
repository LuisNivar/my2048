import styles from "./index.module.css";

type GridCellProps = {
  children: React.ReactNode;
};

function GridCell({ children }: GridCellProps) {
  return <div className={styles.gridCell}>{children}</div>;
}

export default GridCell;
