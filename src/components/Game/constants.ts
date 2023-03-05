import { AllowedMovements } from "./movement";

export const STATE_KEY = "game_state";

export const KEY_MAP: Record<string, AllowedMovements> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
} as const;
