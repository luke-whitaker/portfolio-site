// Tile & map dimensions
export const TILE = 16;
export const MAP_COLS = 90;
export const MAP_ROWS = 20;

// Native canvas resolution
export const CANVAS_W = 30 * TILE;   // 480
export const CANVAS_H = MAP_ROWS * TILE;   // 320

// Pokemon Leaf Green-inspired full-colour palette
export const PAL = {
  // General
  darkest:  '#1a1a2e',
  dark:     '#3a4466',
  light:    '#c8d8c0',
  lightest: '#e8f0e0',
  white:    '#f8f8f0',

  // Grass
  grass:    '#58a848',
  grassLt:  '#70c058',
  grassDk:  '#409038',

  // Path
  path:     '#d8c078',
  pathLt:   '#e8d898',
  pathDk:   '#c0a858',

  // Water
  water1:   '#3890f8',
  water2:   '#2878d8',
  waterDk:  '#2060b0',
  waterLt:  '#58a8f8',

  // Trees
  leaves:   '#286828',
  leavesMd: '#388838',
  leavesLt: '#48a848',
  trunk:    '#885830',
  trunkDk:  '#604020',

  // Buildings
  roof:     '#c03838',
  roofDk:   '#982828',
  roofLt:   '#d85050',
  wall:     '#e8d8b8',
  wallDk:   '#d0c098',
  wallLt:   '#f0e8d0',
  door:     '#604020',
  doorDk:   '#483018',
  doorFrame:'#885830',
  window:   '#88c8f8',
  windowDk: '#5898c8',
  windowFrame: '#d0c098',

  // Fence / Sign
  fence:    '#c0a060',
  fenceDk:  '#987840',
  sign:     '#c8a050',
  signFace: '#f0e8c8',
  signText: '#604020',

  // Flowers
  flower1:  '#f06060',
  flower2:  '#f0d040',
  flower3:  '#f080c0',
  flowerCtr:'#f8f060',

  // Player
  skin:     '#f8c898',
  skinDk:   '#d8a070',
  hair:     '#483818',
  shirt:    '#38a848',
  shirtLt:  '#58c868',
  pants:    '#2850a0',
  pantsLt:  '#3868b8',

  // NPCs
  npc0shirt:'#c83838',
  npc0hat:  '#982828',
  npc1shirt:'#3868b8',
  npc1hat:  '#286828',
  npc2shirt:'#c87828',
  npc2hat:  '#a06020',

  // UI
  uiBg:     '#1a1a2e',
  uiBorder: '#f8f8f0',
  uiText:   '#f8f8f0',
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
