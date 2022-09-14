import React, { useLayoutEffect, useRef, useState } from "react";
import styles from "./index.module.css";

const BASE = 2;
const MAX_DIGITS = 6;
const DARK_COLOR = "#151718";
const TILE_FONT_SIZE = 32;
const TILE_PADDING = 16;

type TileProps = {
  value: number;
};

type StrokeProps = {
  children: React.ReactNode;
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

const Stroke = React.forwardRef<HTMLDivElement | null, StrokeProps>(
  (props, ref) => (
    <div className={styles.textStrokeWrapper} ref={ref}>
      <p className={styles.textStroke}>{props.children}</p>
      <p className={styles.text}>{props.children}</p>
    </div>
  )
);

function Tile(props: TileProps) {
  const [fontSize, setFontSize] = useState(TILE_FONT_SIZE);
  const tileRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const numOfDigits = Math.floor(Math.log10(props.value) + 1);
  const isSmallNumber = numOfDigits <= MAX_DIGITS;

  const style = {
    background: getCSSColor(props.value),
    fontSize: fontSize + "px",
  };

  // Reset font size when value changes
  useLayoutEffect(() => {
    setFontSize(TILE_FONT_SIZE);
  }, [props.value]);

  // Dynamically resize the font size to fit inside the tile's width
  useLayoutEffect(() => {
    const tileDiv = tileRef.current;
    const textDiv = textRef.current;

    if (!tileDiv || !textDiv) {
      return;
    }
    const tileWidth = tileDiv.clientWidth - TILE_PADDING;
    const textWidth = textDiv.clientWidth;

    if (tileWidth < textWidth) {
      setFontSize(fontSize - 1);
    }
  }, [props.value, fontSize]);

  return (
    <div className={styles.tile} style={style} ref={tileRef}>
      {isSmallNumber ? (
        // Display the number as is
        <Stroke ref={textRef}>{props.value}</Stroke>
      ) : (
        // Show the number in scientific notation
        <Stroke ref={textRef}>
          {BASE}
          <sup>{exponent(props.value)}</sup>
        </Stroke>
      )}
    </div>
  );
}

export default Tile;
