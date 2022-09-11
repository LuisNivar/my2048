import React from "react";
import Container from "../Container";
import styles from "./index.module.css";

type ScoreType = {
  className: string;
  score: number;
  bestScore: number;
};

const padZero = (num: number, length: number) => String(num).padStart();
function ScoreBoard(props: ScoreType) {
  /**
   * Add leading Zeros
   * @see {@link https://stackoverflow.com/questions/1267283/how-can-i-pad-a-value-with-leading-zeros}
   */
  const score = ("0000000" + props.score).slice(-7);
  const bestScore = ("0000000" + props.bestScore).slice(-7);
  console.log(styles);
  return (
    <div className={`${styles.scoreBoard} ${props.className}`}>
      <Container className={styles.marginBottom}>
        <p className={styles.title}>Score:</p>
        <p className={styles.score}>{score}</p>
      </Container>

      <Container>
        <p className={styles.title}>Best:</p>
        <p className={styles.score}>{bestScore} </p>
      </Container>
    </div>
  );
}

export default ScoreBoard;
