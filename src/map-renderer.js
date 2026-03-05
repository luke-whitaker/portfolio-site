import { TILE, CANVAS_W, CANVAS_H } from './constants.js';
import { T } from './tileset.js';

export function renderMap(ctx, tileset, camX, camY, frameTick, mapTiles, mapCols, mapRows) {
  // Calculate visible tile range
  const startCol = Math.max(0, Math.floor(camX / TILE));
  const startRow = Math.max(0, Math.floor(camY / TILE));
  const endCol = Math.min(mapCols - 1, Math.floor((camX + CANVAS_W) / TILE));
  const endRow = Math.min(mapRows - 1, Math.floor((camY + CANVAS_H) / TILE));

  // Water animation: swap every 30 ticks
  const useWater2 = Math.floor(frameTick / 30) % 2 === 1;

  for (let row = startRow; row <= endRow; row++) {
    for (let col = startCol; col <= endCol; col++) {
      let tileId = mapTiles[row][col];

      // Animate water
      if (tileId === T.WATER && useWater2) {
        tileId = T.WATER2;
      }

      const img = tileset[tileId];
      if (img) {
        ctx.drawImage(img, col * TILE - camX, row * TILE - camY);
      }
    }
  }
}
