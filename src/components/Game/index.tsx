import classNames from "classnames";
import Board, { BoardProps } from "../Board";
import MenuSection from "../MenuSection";
import ScoreBoard from "../ScoreBoard";
import styles from "./index.module.css";

type gameProps = {
  className?: string;
  score: number;
  bestScore: number;
  row: number;
  col: number;
};

function Game(props: gameProps) {
  const gameClass = classNames(props.className, styles.game);
  const getCells: BoardProps["getCellsLocation"] = (cells) => {
    // Do anything you need with the cells position here
    // We can also store it as a state variable to use it somewhere else
    console.log(cells);
  };

  return (
    <div className={gameClass}>
      <MenuSection className={styles.menu} />
      <ScoreBoard
        className={styles.scoreBoard}
        score={props.score}
        bestScore={props.bestScore}
      />
      <Board
        className={styles.board}
        rows={props.row}
        columns={props.col}
        getCellsLocation={getCells}
      />
    </div>
  );
}

export default Game;
