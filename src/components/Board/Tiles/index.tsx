import Tile from "../../Tile";

type TilesProps = {
  tiles: number[][];
  cellsPosition: Point[];
};

function Tiles(props: TilesProps) {
  const { tiles, cellsPosition } = props;
  const rows = tiles.length;
  const columns = tiles[0].length;

  const offsetX = cellsPosition[0]?.x ?? 0;
  const offSetY = cellsPosition[0]?.y ?? 0;

  return (
    <>
      {cellsPosition.map((position, index) => {
        const row = Math.floor(index / rows);
        const col = index % columns;
        return (
          <Tile
            key={index}
            value={tiles[row][col]}
            x={position.x - offsetX}
            y={position.y - offSetY}
            data-testid={`${row},${col}`}
          />
        );
      })}
    </>
  );
}

export default Tiles;
