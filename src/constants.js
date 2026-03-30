// Tile & map dimensions
export const TILE = 16;
export const MAP_COLS = 90;
export const MAP_ROWS = 20;

// Native canvas resolution
export const CANVAS_W = 30 * TILE;   // 480
export const CANVAS_H = MAP_ROWS * TILE;   // 320

// Fantasy 32-colour palette (from fantasy.pal)
export const PAL = {
  // General
  darkest:  '#353540',
  dark:     '#636167',
  light:    '#bfb8b4',
  lightest: '#ede4da',
  white:    '#ede4da',

  // Grass
  grass:    '#557d55',
  grassLt:  '#8b9150',
  grassDk:  '#446350',

  // Path
  path:     '#bdaa97',
  pathLt:   '#d4c2b6',
  pathDk:   '#bda351',

  // Water
  water1:   '#668da9',
  water2:   '#769fa6',
  waterDk:  '#5c699f',
  waterLt:  '#8bb0ad',

  // Trees
  leaves:   '#3e554c',
  leavesMd: '#446350',
  leavesLt: '#557d55',
  trunk:    '#735b42',
  trunkDk:  '#604b3d',

  // Buildings
  roof:     '#ca5954',
  roofDk:   '#a94949',
  roofLt:   '#e56f4b',
  wall:     '#d4c2b6',
  wallDk:   '#bdaa97',
  wallLt:   '#ede4da',
  door:     '#735b42',
  doorDk:   '#604b3d',
  doorFrame:'#7e674c',
  window:   '#8bb0ad',
  windowDk: '#769fa6',
  windowFrame: '#bdaa97',

  // Fence / Sign
  fence:    '#86735b',
  fenceDk:  '#604b3d',
  sign:     '#bda351',
  signFace: '#ede4da',
  signText: '#604b3d',

  // Flowers
  flower1:  '#a94949',
  flower2:  '#eeb551',
  flower3:  '#bc87a5',
  flowerCtr:'#e8c65b',

  // Player
  skin:     '#d9a6a6',
  skinDk:   '#bdaa97',
  hair:     '#604b3d',
  shirt:    '#557d55',
  shirtLt:  '#8b9150',
  pants:    '#5c699f',
  pantsLt:  '#668da9',

  // NPCs
  npc0shirt:'#ca5954',
  npc0hat:  '#a94949',
  npc1shirt:'#5c699f',
  npc1hat:  '#446350',
  npc2shirt:'#e39347',
  npc2hat:  '#7e674c',

  // UI
  uiBg:     '#353540',
  uiBorder: '#ede4da',
  uiText:   '#ede4da',
};

// Player
export const PLAYER_SPEED = 1.5;   // pixels per tick
export const PLAYER_W = 12;
export const PLAYER_H = 12;
export const PLAYER_OFFSET_X = 2;  // hitbox offset within 16x16 sprite
export const PLAYER_OFFSET_Y = 4;

// Animation
export const ANIM_FRAME_TICKS = 10; // ticks per walk-cycle frame

// Timing
export const TICK_RATE = 1000 / 60;
