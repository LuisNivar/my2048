/**
 * SVG filter for clean looking text-strokes :)
 */
function TextStrokeFilter() {
  return (
    <svg
      version="1.1"
      xmlns="//www.w3.org/2000/svg"
      xmlnsXlink="//www.w3.org/1999/xlink"
      style={{ display: "none" }}
    >
      <defs>
        <filter id="stroke-text-svg-filter">
          <feMorphology operator="dilate" radius="2"></feMorphology>
          <feComposite operator="xor" in="SourceGraphic" />
        </filter>
      </defs>
    </svg>
  );
}

export default TextStrokeFilter;
