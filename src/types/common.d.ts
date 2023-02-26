/** Represents a single coordinate in a 2D plane */
type Vector = {
  x: number;
  y: number;
};

type ITile = {
  id: number;
  value: number;
};

type IGrid = Array<Array<ITile | null>>;
