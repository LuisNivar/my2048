import "./index.css";

const BASE = 2;
const DARK_COLOR = "#151718";

type TileProps = {
  value: number;
};

function exponent(value: number) {
  return Math.floor(Math.log(value) / Math.log(BASE));
}

/**
 * Return HSL string given a value
 */
function getCSSColor(value: number) {
  const MAX_HUE = 360;
  // Max number is base ^ 11, example 2 ^ 11 = 2048
  // So we compute the initial HUE accordingly so that colors
  // are distributed evenly.
  const INITIAL_HUE = Math.floor(360 / 11);
  const multiplier = exponent(value);
  const hue = multiplier * INITIAL_HUE;

  if (hue >= MAX_HUE) {
    return DARK_COLOR;
  }

  return `hsl(${hue}, 81%, 67%)`;
}

function Tile(props: TileProps) {
  const MAX_DIGITS = 6;
  const numOfDigits = Math.floor(Math.log10(props.value) + 1);

  const isSmallNumber = numOfDigits <= MAX_DIGITS;

  const style = {
    background: getCSSColor(props.value),
    fontSize: "32px",
  };

  return (
    <div className="Tile" style={style}>
      {isSmallNumber ? (
        // Display the number as is
        <p>{props.value}</p>
      ) : (
        // Show the number in scientific notation
        <p>
          {BASE}
          <sup>{exponent(props.value)}</sup>
        </p>
      )}
    </div>
  );
}

export default Tile;
