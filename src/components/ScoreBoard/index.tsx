import cn from "classnames";
import Container from "../Container";
import styles from "./index.module.css";

type ScoreType = {
  className?: string;
  score: number;
  bestScore: number;
};

function padZero(num: number, length: number) {
  return String(num).padStart(length, "0");
}

function ScoreBoard({ score, bestScore, className }: ScoreType) {
  return (
    <div className={cn(styles.scoreBoard, className)}>
      <Container className={styles.container}>
        <p className={styles.title}>Score</p>
        <p className={styles.score}>{padZero(score, 7)}</p>
      </Container>

      <Container className={styles.container}>
        <p className={styles.title}>Best</p>
        <p className={styles.score}>{padZero(bestScore, 7)} </p>
      </Container>
    </div>
  );
}

export default ScoreBoard;
