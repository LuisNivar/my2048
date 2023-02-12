import React, { useLayoutEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import TextStroke from "./TextStroke";

const BASE = 2;
const MAX_DIGITS = 6;
const DARK_COLOR = "#151718";
const TILE_FONT_SIZE = 32;
const TILE_PADDING = 16;

export type TileProps = {
  value: number;
  x: number;
  y: number;
  "data-testid"?: string;
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

function Tile({ value, x, y, ...rest }: TileProps) {
  const [fontSize, setFontSize] = useState(TILE_FONT_SIZE);

  const tileRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const numOfDigits = Math.floor(Math.log10(value) + 1);
  const isSmallNumber = numOfDigits <= MAX_DIGITS;

  const style = {
    background: getCSSColor(value),
    fontSize: fontSize + "px",
    "--x": x + "px",
    "--y": y + "px",
  };

  // Reset font size when value changes
  useLayoutEffect(() => {
    setFontSize(TILE_FONT_SIZE);
  }, [value]);

  // Dynamically resize the font size to fit inside the tile's width
  useLayoutEffect(() => {
    if (
      !tileRef.current ||
      !textRef.current ||
      process.env.NODE_ENV === "test" // Skip testing font resizing
    ) {
      return;
    }

    const tileDiv = tileRef.current;
    const textDiv = textRef.current;

    const tileWidth = tileDiv.clientWidth - TILE_PADDING;
    const textWidth = textDiv.clientWidth;

    if (tileWidth < textWidth) {
      setFontSize(fontSize - 1);
    }
  }, [value, fontSize]);

  if (value === 0) {
    // Empty tile
    return <></>;
  }

  return (
    <div className={styles.tile} style={style} ref={tileRef} {...rest}>
      <TextStroke ref={textRef}>
        {isSmallNumber ? (
          value
        ) : (
          // Display in scientific notation
          <>
            {BASE}
            <sup>{exponent(value)}</sup>
          </>
        )}
      </TextStroke>
    </div>
  );
}

export default Tile;
