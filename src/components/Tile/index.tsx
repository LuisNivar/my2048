import "./index.css";

/**
 * The base is to represent the number in scientific notation if necessary
 */
 const BASE = 2;

type TileProps = {
    value : number;
}

function multiplier (value : number){
    return Math.floor(Math.log(value) / Math.log(BASE));
}

/**
 * Return HSL string given a value
 */
function getCSSColor(value : number) {
    const MAX_HUE = 360;
    const COLOR_IF_OVERFLOW = "#151718" 
    
    // Max number is base ^ 11, example 2 ^ 11 = 2048
    // So we compute the initial HUE accordingly so that colors 
    // are distributed evenly. 
    const INITIAL_HUE = Math.floor(360 / 11);
    const hue =  multiplier(value) * INITIAL_HUE;

    if (hue >= MAX_HUE) {
        return COLOR_IF_OVERFLOW ;
    }

  return `hsl(${hue}, 81%, 67%)`;
}

/**
 * Represent numbers in scientific notation if greater than n digits
 */
function getNumer(value : number) {
    const numOfDigits = Math.floor(Math.log10(value)+ 1);
    const MAX_DIGITS = 6;

    if (numOfDigits <= MAX_DIGITS ) {
        return value.toString();
    }
    return `${BASE}^${multiplier(value)}` ;
}

/**
 * Return font size
 */
function getFontSize(value : string){
    // decrease font size by increasing number length
    const FONT_SIZE_BASE = 27;
    const numOfDigits = value.length;
    return FONT_SIZE_BASE - numOfDigits * 2;
}

function Tile(props : TileProps) {
    const style = {
        background : getCSSColor(props.value),
        "font-size" : getFontSize(getNumer(props.value))
    }

    return (
        <div className="Tile" style={style}>
            <p>{getNumer(props.value)}</p>
        </div>
    );
}

function Tile(props: TileProps) {
  const style = {
    background: getCSSColor(props.value),
    fontSize: getFontSize(props.value),
  };

  return (
    <div className="Tile" style={style}>
      <div className="numberWrapper">
        <p className="textStroke">{props.value}</p>
        <p className="number">{props.value}</p>
      </div>
    </div>
  );
}

export default Tile;
