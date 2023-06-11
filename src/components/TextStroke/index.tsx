import React from "react";
import styles from "./TextStroke.module.css";

type TextStrokeProps = {
  children?: React.ReactNode;
};

const TextStroke = React.forwardRef<HTMLDivElement | null, TextStrokeProps>(
  function TextStroke(props, ref) {
    return (
      <div className={styles.textStrokeWrapper} ref={ref}>
        <p className={styles.textStroke} aria-hidden>
          {props.children}
        </p>
        <p className={styles.text}>{props.children}</p>
      </div>
    );
  }
);

export default TextStroke;
