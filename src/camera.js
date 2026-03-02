import { CANVAS_W, CANVAS_H, MAP_COLS, MAP_ROWS, TILE } from './constants.js';

export function updateCamera(state) {
  const p = state.player;
  // Centre camera on player
  state.camX = Math.round(p.x + TILE / 2 - CANVAS_W / 2);
  state.camY = Math.round(p.y + TILE / 2 - CANVAS_H / 2);

  // Clamp to map edges
  const maxX = MAP_COLS * TILE - CANVAS_W;
  const maxY = MAP_ROWS * TILE - CANVAS_H;
  state.camX = Math.max(0, Math.min(state.camX, maxX));
  state.camY = Math.max(0, Math.min(state.camY, maxY));
}
