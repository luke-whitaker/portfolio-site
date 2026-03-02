import { TILE, MAP_COLS, MAP_ROWS, CANVAS_W, CANVAS_H } from './constants.js';
import { tiles } from './map-data.js';
import { T } from './tileset.js';

export function renderMap(ctx, tileset, camX, camY, frameTick) {
  // Calculate visible tile range
  const startCol = Math.max(0, Math.floor(camX / TILE));
  const startRow = Math.max(0, Math.floor(camY / TILE));
  const endCol = Math.min(MAP_COLS - 1, Math.floor((camX + CANVAS_W) / TILE));
  const endRow = Math.min(MAP_ROWS - 1, Math.floor((camY + CANVAS_H) / TILE));

  // Water animation: swap every 30 ticks
  const useWater2 = Math.floor(frameTick / 30) % 2 === 1;

  for (let row = startRow; row <= endRow; row++) {
    for (let col = startCol; col <= endCol; col++) {
      let tileId = tiles[row][col];

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
