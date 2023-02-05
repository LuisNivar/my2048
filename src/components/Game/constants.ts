import { AllowedMovements } from "./movement";

export type Controls = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";

export const EMPTY_TILE = 0;

export const KEY_MAP: Record<Controls, AllowedMovements> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
} as const;
