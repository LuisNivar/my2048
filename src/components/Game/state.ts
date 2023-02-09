import { EMPTY_TILE } from "./constants";
import { generateRandomTile, isGameOver } from "./utils";

export type BoardSize = {
  rows: number;
  cols: number;
};

export type GameState = {
  dimensions: BoardSize;
  tiles: number[][];
  score: number;
  bestScore: number;
  hasGameEnded?: boolean;
};

export type Action =
  | {
      type: "updated_tiles";
      tiles: number[][];
      score: number;
    }
  | {
      type: "reset";
    };

export function createInitialState(initialState: GameState) {
  const { rows, cols } = initialState.dimensions;
  const tiles = Array<number[]>(rows);
  for (let i = 0; i < tiles.length; i++) {
    tiles[i] = Array<number>(cols).fill(EMPTY_TILE);
  }

  generateRandomTile(tiles);

  return {
    ...initialState,
    score: 0,
    hasGameEnded: false,
    tiles,
  };
}

export function GameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "updated_tiles": {
      const currentScore = state.score + action.score;

      return {
        ...state,
        tiles: action.tiles,
        score: currentScore,
        bestScore: Math.max(currentScore, state.bestScore),
        hasGameEnded: isGameOver(action.tiles),
      };
    }

    case "reset": {
      return createInitialState(state);
    }

    default:
      break;
  }
  return state;
}
