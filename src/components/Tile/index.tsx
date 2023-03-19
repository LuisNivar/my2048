import { animated, useSpring } from "@react-spring/web";
import { useLayoutEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import TextStroke from "./TextStroke";

// Base of the number system
const BASE = 2;
// Number of digits to display before switching to scientific notation
const MAX_DIGITS = 6;
// Color of the tile when the value is too large
const DARK_COLOR = "#151718";
// Base font size for the tile
const TILE_FONT_SIZE = 32;
// Padding of the tile container
const TILE_PADDING = 16;

export type TileProps = {
  value: number;
  x: number;
  y: number;
  "data-testid"?: string;
};

function Tile({ value, x, y, ...rest }: TileProps) {
  const { containerRef, textRef, containerStyles } = useDynamicFontSize(
    TILE_FONT_SIZE,
    value
  );
  const props = useSpring({
    from: {
      scale: 0,
      background: "white",
    },
    to: {
      scale: 1,
      x,
      y,
      background: getCSSColor(value),
    },
  });

  if (value === 0) {
    // Empty tile
    return <></>;
  }

  const isSmallNumber = getNumberOfDigits(value) <= MAX_DIGITS;

  return (
    <animated.div
      {...rest}
      ref={containerRef}
      className={styles.tile}
      style={{
        ...containerStyles,
        ...props,
      }}
    >
      <TextStroke ref={textRef}>
        {isSmallNumber ? (
          value
        ) : (
          // Display in scientific notation
          <>
            {BASE}
            <sup>{getExponent(value, BASE)}</sup>
          </>
        )}
      </TextStroke>
    </animated.div>
  );
}

function useDynamicFontSize(initialFontSize: number, tileValue: number) {
  const [fontSize, setFontSize] = useState(initialFontSize);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (
      !containerRef.current ||
      !textRef.current ||
      process.env.NODE_ENV === "test" // Skip testing font resizing
    ) {
      return;
    }
    const container = containerRef.current;
    const text = textRef.current;

    const tileWidth = container.clientWidth - TILE_PADDING;
    const textWidth = text.clientWidth;

    if (tileWidth < textWidth) {
      setFontSize(fontSize - 1);
    }
  }, [fontSize, tileValue]);

  return {
    containerRef,
    textRef,
    containerStyles: {
      fontSize: fontSize + "px",
    },
  };
}

/**
 *  Get the CSS color for the tile based on the value.
 */
function getCSSColor(value: number) {
  const MAX_HUE = 360;
  // Max number is base ^ 11, example 2 ^ 11 = 2048
  // So we compute the initial HUE accordingly so that colors
  // are distributed evenly.
  const INITIAL_HUE = Math.floor(360 / 11);
  const multiplier = getExponent(value, BASE);
  const hue = multiplier * INITIAL_HUE;

  if (hue >= MAX_HUE) {
    return DARK_COLOR;
  }

  return `hsl(${hue}, 81%, 67%)`;
}

function getExponent(value: number, base: number) {
  return Math.floor(Math.log(value) / Math.log(base));
}

function getNumberOfDigits(value: number) {
  return Math.floor(Math.log10(value) + 1);
}

export default Tile;
