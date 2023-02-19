import cn from "classnames";
import { useDeferredValue, useEffect, useReducer } from "react";
import { useSwipeable } from "react-swipeable";
import useAutoFocus from "../../hooks/useAutoFocus";
import mergeRefs from "../../utils/mergeRefs";
import Board from "../Board";
import MenuSection from "../MenuSection";
import RetryGame from "../RetryGame";
import ScoreBoard from "../ScoreBoard";
import { KEY_MAP, STATE_KEY } from "./constants";
import styles from "./index.module.css";
import move from "./movement";
import { createInitialState, GameReducer, GameState } from "./state";
import { AllowedMovements } from "./movement";

type GameProps = {
  rows: number;
  cols: number;
  className?: string;
};

const initialState: GameState = {
  tiles: [],
  bestScore: 0,
  score: 0,
  hasGameEnded: false,
};

//#region Utilities
function Game(props: GameProps) {
  const { className, rows, cols } = props;

  const autoFocusRef = useAutoFocus();

  const [state, dispatch] = useReducer(GameReducer, initialState, () =>
    createInitialState(initialState, rows, cols)
  );

  // Persist game state to local storage
  useSaveGame(state);

  const executeMove = (direction: AllowedMovements) => {
    if (!state.hasGameEnded) {
      const { tiles, score } = move(state.tiles, direction);

      dispatch({
        type: "updated_tiles",
        tiles,
        score,
      });
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!(e.key in KEY_MAP)) {
      return;
    }
    executeMove(KEY_MAP[e.key]);
  };

  const { ref: swipeRefs, ...touchEventHandlers } = useSwipeable({
    onSwipedLeft: () => executeMove("left"),
    onSwipedRight: () => executeMove("right"),
    onSwipedUp: () => executeMove("up"),
    onSwipedDown: () => executeMove("down"),
  });

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
        onKeyUp={handleKeyUp}
        {...touchEventHandlers}
      />
    </div>
  );
}

function useSaveGame(state: GameState) {
  // Using deferred value to avoid saving state on every render
  const gameState = useDeferredValue(state);
  useEffect(() => {
    localStorage.setItem(STATE_KEY, JSON.stringify(gameState));
  }, [gameState]);
}

export default Game;
