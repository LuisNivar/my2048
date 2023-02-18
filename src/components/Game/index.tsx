import cn from "classnames";
import { useReducer } from "react";
import { useSwipeable } from "react-swipeable";
import useAutoFocus from "../../hooks/useAutoFocus";
import mergeRefs from "../../utils/mergeRefs";
import Board from "../Board";
import MenuSection from "../MenuSection";
import RetryGame from "../RetryGame";
import ScoreBoard from "../ScoreBoard";
import { Controls, KEY_MAP } from "./constants";
import styles from "./index.module.css";
import move from "./movement";
import { createInitialState, GameReducer, GameState } from "./state";

type GameProps = {
  rows: number;
  cols: number;
  className?: string;
  score?: number;
  bestScore?: number;
};

//#region Utilities
function Game(props: GameProps) {
  const { className, score, bestScore, rows, cols } = props;
  const { ref: swipeRefs, ...touchEventHandlers } = useSwipeable({
    onSwipedLeft: () => handleMove("ArrowLeft"),
    onSwipedRight: () => handleMove("ArrowRight"),
    onSwipedUp: () => handleMove("ArrowUp"),
    onSwipedDown: () => handleMove("ArrowDown"),
    preventScrollOnSwipe: true,
  });

  const autoFocusRef = useAutoFocus();

  const initialState: GameState = {
    dimensions: { rows, cols },
    tiles: [],
    bestScore: bestScore ?? 0,
    score: score ?? 0,
    hasGameEnded: false,
  };

  const [state, dispatch] = useReducer(
    GameReducer,
    initialState,
    createInitialState
  );

  const handleMove = (key: Controls) => {
    if (!state.hasGameEnded) {
      const { tiles, score } = move(state.tiles, KEY_MAP[key]);

      dispatch({
        type: "updated_tiles",
        tiles,
        score,
      });
    }
  };

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
        aria-label="Score board"
      />
      <Board
        ref={mergeRefs(swipeRefs, autoFocusRef)}
        className={styles.board}
        tiles={state.tiles}
        aria-label="2048 game board"
        onKeyUp={(e) => handleMove(e.key as Controls)}
        {...touchEventHandlers}
      />
    </div>
  );
}

export default Game;
