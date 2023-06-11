import cn from "classnames";
import Container from "../Container";
import styles from "./Scoreboard.module.css";

type ScoreboardProps = {
  className?: string;
  score: number;
  bestScore: number;
};

function padZero(num: number, length: number) {
  return String(num).padStart(length, "0");
}

function Scoreboard({ score, bestScore, className }: ScoreboardProps) {
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

export default Scoreboard;
