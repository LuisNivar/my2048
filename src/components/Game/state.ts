import { EMPTY_TILE, STATE_KEY } from "./constants";
import { insertRandomTile, isGameOver } from "./utils";

//#region Types
export type GameState = {
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
//#endregion

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
      return newGame(state, state.tiles.length, state.tiles[0].length);
    }
  }
}

export function createInitialState(
  initialState: GameState,
  rows: number,
  cols: number
): GameState {
  const saveGame = loadGameStateFromLocalStorage();

  return saveGame ? saveGame : newGame(initialState, rows, cols);
}

function loadGameStateFromLocalStorage(): GameState | undefined {
  const savedState = localStorage.getItem(STATE_KEY);

  if (savedState) {
    try {
      return JSON.parse(savedState);
    } catch (error) {
      console.error("Error parsing saved state", error);
    }
  }
}

function newGame(state: GameState, rows: number, cols: number): GameState {
  return {
    ...state,
    tiles: createInitialGrid(rows, cols),
    score: 0,
    hasGameEnded: false,
  };
}

function createInitialGrid(rows: number, cols: number) {
  const grid = Array<number[]>(rows);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = Array<number>(cols).fill(EMPTY_TILE);
  }
  insertRandomTile(grid);

  return grid;
}
