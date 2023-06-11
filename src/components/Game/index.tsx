import cn from "classnames";
import { useEffect, useReducer } from "react";
import { useSwipeable } from "react-swipeable";
import useDebounce from "../../hooks/useDebounce";
import useEventCallback from "../../hooks/useEventCallback";
import Board from "../Board";
import MenuSection from "../Layout/MenuSection";
import Scoreboard from "../Layout/Scoreboard";
import { KEY_MAP, STATE_KEY } from "./constants";
import styles from "./Game.module.css";
import GameOver from "./GameOver";
import move, { AllowedMovements } from "./movement";
import { createInitialState, gameReducer, GameState } from "./state";

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

  const [state, dispatch] = useReducer(gameReducer, initialState, () =>
    createInitialState(initialState, rows, cols)
  );

  // Persist game state to local storage
  useAutoSave(state);

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

  useOnKeyUp((event) => {
    if (!(event.key in KEY_MAP)) {
      return;
    }
    executeMove(KEY_MAP[event.key]);
  });

  const touchEventHandlers = useSwipeable({
    onSwipedLeft: () => executeMove("left"),
    onSwipedRight: () => executeMove("right"),
    onSwipedUp: () => executeMove("up"),
    onSwipedDown: () => executeMove("down"),
    preventScrollOnSwipe: true,
  });

  return (
    <div className={cn(className, styles.game)}>
      <GameOver
        show={state.hasGameEnded}
        className={styles.rety}
        gameDispatch={dispatch}
      />
      <MenuSection className={styles.menu} gameDispatch={dispatch} />
      <Scoreboard
        className={styles.scoreBoard}
        score={state.score}
        bestScore={state.bestScore}
        aria-label="Score board"
      />
      <Board
        className={styles.board}
        tiles={state.tiles}
        aria-label="2048 game board"
        {...touchEventHandlers}
      />
    </div>
  );
}

function useOnKeyUp(callback: (event: KeyboardEvent) => void) {
  const onKeyUp = useEventCallback(callback);

  useEffect(() => {
    document.addEventListener("keyup", onKeyUp);
    return () => {
      document.removeEventListener("keyup", onKeyUp);
    };
  }, [onKeyUp]);
}

function useAutoSave(state: GameState) {
  const gameState = useDebounce(state, 1000);
  useEffect(() => {
    localStorage.setItem(STATE_KEY, JSON.stringify(gameState));
  }, [gameState]);
}

export default Game;
