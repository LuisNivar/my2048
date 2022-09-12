import styles from "./ArrowKeys.module.css";
import { ReactComponent as Icon } from "../../assets/key-arrow.svg";
import classNames from "classnames";

function ArrowKeys() {
  const upClass = classNames(styles.icon, styles.up);
  const downClass = classNames(styles.icon, styles.down);
  const leftClass = classNames(styles.icon, styles.left);
  const rightClass = classNames(styles.icon, styles.right);

  return (
    <div className={styles.controls}>
      {<Icon className={upClass} />}
      {<Icon className={downClass} />}
      {<Icon className={leftClass} />}
      {<Icon className={rightClass} />}
    </div>
  );
}

export default ArrowKeys;
