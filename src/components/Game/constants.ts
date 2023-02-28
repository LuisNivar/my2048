import { AllowedMovements } from "./movement";

export const EMPTY_TILE = 0;

export const STATE_KEY = "game_state";

export const KEY_MAP: Record<string, AllowedMovements> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
} as const;
