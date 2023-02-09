import cn from "classnames";
import { KeyboardEvent, useEffect, useReducer, useRef } from "react";
import Board from "../Board";
import MenuSection from "../MenuSection";
import RetryGame from "../RetryGame";
import ScoreBoard from "../ScoreBoard";
import { KEY_MAP } from "./constants";
import styles from "./index.module.css";
import move from "./movement";
import { createInitialState, GameReducer, GameState } from "./state";

type GameProps = {
  className?: string;
  score: number;
  bestScore: number;
  rows: number;
  cols: number;
};

//#region Utilities
function Game(props: GameProps) {
  const { className, score, bestScore, rows, cols } = props;
  const boardRef = useRef<HTMLDivElement | null>(null);

  const initialState: GameState = {
    dimensions: { rows, cols },
    tiles: [],
    score,
    bestScore,
  };

  const [state, dispatch] = useReducer(
    GameReducer,
    initialState,
    createInitialState
  );

  const handledKeyup = (e: KeyboardEvent) => {
    if (e.key in KEY_MAP && !state.hasGameEnded) {
      const { tiles, score } = move(
        state.tiles,
        KEY_MAP[e.key as keyof typeof KEY_MAP]
      );

      dispatch({
        type: "updated_tiles",
        tiles,
        score,
      });
    }
  };

  useEffect(() => {
    // Focus container on mount, so that the user can navigate the game using the controls directly
    boardRef.current?.focus();
  }, [boardRef]);

  return (
    <div className={cn(className, styles.game)}>
      {state.hasGameEnded && (
        <RetryGame className={styles.rety} gameDispatch={dispatch} />
      )}
      <MenuSection className={styles.menu} gameDispatch={dispatch} />
      <ScoreBoard
        className={styles.scoreBoard}
        score={state.score}
        bestScore={state.bestScore}
      />
      <Board
        className={styles.board}
        tiles={state.tiles}
        onKeyUp={handledKeyup}
        ref={boardRef}
      />
    </div>
  );
}

export default Game;
