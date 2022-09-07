import './index.css';

type TileProps = {
    value : number;
}

/**
 * Return HSL string given a value
 */
function getCSSColor(value : number) {
    const MAX_HUE = 360;
    // Max number is base ^ 11, example 2 ^ 11 = 2048
    // So we compute the initial HUE accordingly so that colors 
    // are distributed evenly. 
    const INITIAL_HUE = Math.floor(360 / 11);
    const BASE_NUMBER = 2;

    const multiplier = Math.log(value) / Math.log(BASE_NUMBER); 
    const hue =  multiplier * INITIAL_HUE;

    if (hue >= MAX_HUE) {
        return "#252525";
    }

    return `hsl(${hue}, 81%, 67%)`;
}
/**
 * Return font size 
 */
function GetFontSize(value : number){
    // decrease font size by increasing number length
    const FONT_SIZE_BASE = 26;
    const length = ~~(Math.log(value) / Math.LN10 + 1);
    return FONT_SIZE_BASE - length;
}
 

function Tile(props : TileProps) {
    const style = {
        background : getCSSColor(props.value),
        "font-size" : GetFontSize(props.value)
    }

    return (
        <div className="Tile" style={style}>
            <p>{props.value}</p>
        </div>
    );
}

export default Tile;