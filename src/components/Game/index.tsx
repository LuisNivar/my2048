import classNames from "classnames";
import Board from "../Board";
import MenuSection from "../MenuSection";
import ScoreBoard from "../ScoreBoard";
import Tile from "../Tile";
import styles from "./index.module.css";

type gameProps = {
  className?: string;
  score: number;
  bestScore: number;
  rows: number;
  cols: number;
};

function Game(props: gameProps) {
  const Tiles: React.ReactNode[] = [];

  const gameClass = classNames(props.className, styles.game);

  return (
    <div className={gameClass}>
      <MenuSection className={styles.menu} />
      <ScoreBoard
        className={styles.scoreBoard}
        score={props.score}
        bestScore={props.bestScore}
      />
      <Board className={styles.board} rows={props.rows} columns={props.cols} />
    </div>
  );
}

export default Game;
