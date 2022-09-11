import React from "react";
import Container from "../Container";
import styles from "./index.module.css";

type ScoreType = {
  className: string;
  score: number;
  bestScore: number;
};

function padZero(num: number, length: number) {
  return String(num).padStart(length, "0");
}

function ScoreBoard(props: ScoreType) {
  const score = padZero(props.score, 7);
  const bestScore = padZero(props.bestScore, 7);

  return (
    <div className={`${styles.scoreBoard} ${props.className}`}>
      <Container className={`${styles.marginBottom} ${styles.padding}`}>
        <p className={styles.title}>Score:</p>
        <p className={styles.score}>{score}</p>
      </Container>

      <Container className={styles.padding}>
        <p className={styles.title}>Best:</p>
        <p className={styles.score}>{bestScore} </p>
      </Container>
    </div>
  );
}

export default ScoreBoard;
