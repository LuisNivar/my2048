import "./index.css";

const BASE_NUMBER = 2;

type TileProps = {
  value: number;
};

/**
 * Return HSL string given a value
 */
function getCSSColor(value : number) {
    const MAX_HUE = 360;
    // Max number is base ^ 11, example 2 ^ 11 = 2048
    // So we compute the initial HUE accordingly so that colors 
    // are distributed evenly. 
    const INITIAL_HUE = Math.floor(360 / 11);
    const multiplier = Math.log(value) / Math.log(BASE_NUMBER); 
    const hue =  multiplier * INITIAL_HUE;

    if (hue >= MAX_HUE) {
        return "#151718";
    }

  return `hsl(${hue}, 81%, 67%)`;
}

function GetNumer(value : number) {
    const numOfDigits = Math.floor(Math.log10(value)+ 1);
    const MAX_DIGITS = 6;

    if (numOfDigits <= MAX_DIGITS ) {
        return value.toString();
    }
    const multiplier = Math.log(value) / Math.log(BASE_NUMBER);
    return `${BASE_NUMBER}^${multiplier}` ;
}

/**
 * Return font size
 */
function GetFontSize(value : string){
    // decrease font size by increasing number length
    const FONT_SIZE_BASE = 27;
    const numOfDigits = value.length;
    return FONT_SIZE_BASE - numOfDigits * 2;
}

function Tile(props : TileProps) {
    const style = {
        background : getCSSColor(props.value),
        "font-size" : GetFontSize(GetNumer(props.value))
    }

    return (
        <div className="Tile" style={style}>
            <p>{GetNumer(props.value)}</p>
        </div>
    );
}

function Tile(props: TileProps) {
  const style = {
    background: getCSSColor(props.value),
    fontSize: GetFontSize(props.value),
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
