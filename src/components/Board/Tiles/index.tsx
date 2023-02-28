import React from "react";
import { getNewId } from "../../Game/utils";
import Tile from "../../Tile";

type TilesProps = {
  tiles: IGrid;
  cellsPosition: Vector[];
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
        const tile = tiles[row][col];
        return (
          tile && (
            <Tile
              key={tile.id}
              value={tile.value}
              x={position.x - offsetX}
              y={position.y - offSetY}
              data-testid={`${row},${col}`}
            />
          )
        );
      })}
    </>
  );
}

export default Tiles;
