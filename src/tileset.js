import { TILE, PAL } from './constants.js';

// Tile IDs
export const T = {
  GRASS: 0,
  PATH: 1,
  WATER: 2,
  TREE_TOP: 3,
  TREE_TRUNK: 4,
  WALL: 5,
  ROOF: 6,
  DOOR: 7,
  WINDOW: 8,
  FENCE: 9,
  SIGN: 10,
  ROOF_LEFT: 11,
  ROOF_RIGHT: 12,
  FLOWER: 13,
  WATER2: 14,   // second water frame
  WALL_LEFT: 15,
  WALL_RIGHT: 16,
  // Interior tiles
  FLOOR: 17,
  INT_WALL: 18,
  INT_WALL_BOTTOM: 19,
  RUG: 20,
  SHELF: 21,
  TABLE: 22,
  EXIT_DOOR: 23,
  INT_WINDOW: 24,
};

function makeTile(draw) {
  const c = document.createElement('canvas');
  c.width = TILE;
  c.height = TILE;
  const x = c.getContext('2d');
  draw(x);
  return c;
}

export function generateTileset() {
  const tiles = {};

  // Grass — lush green with subtle variation
  tiles[T.GRASS] = makeTile(c => {
    c.fillStyle = PAL.grass;
    c.fillRect(0, 0, 16, 16);
    c.fillStyle = PAL.grassLt;
    c.fillRect(2, 3, 2, 1);
    c.fillRect(9, 1, 2, 1);
    c.fillRect(6, 10, 2, 1);
    c.fillRect(12, 12, 2, 1);
    c.fillStyle = PAL.grassDk;
    c.fillRect(5, 6, 1, 1);
    c.fillRect(13, 4, 1, 1);
    c.fillRect(1, 13, 1, 1);
    c.fillRect(10, 8, 1, 1);
  });

  // Flower grass — colourful flowers on grass
  tiles[T.FLOWER] = makeTile(c => {
    c.fillStyle = PAL.grass;
    c.fillRect(0, 0, 16, 16);
    c.fillStyle = PAL.grassLt;
    c.fillRect(7, 9, 2, 1);
    // Flower 1 (red)
    c.fillStyle = PAL.flower1;
    c.fillRect(3, 3, 1, 1);
    c.fillRect(5, 3, 1, 1);
    c.fillRect(4, 2, 1, 1);
    c.fillRect(4, 4, 1, 1);
    c.fillStyle = PAL.flowerCtr;
    c.fillRect(4, 3, 1, 1);
    // Flower 2 (yellow)
    c.fillStyle = PAL.flower2;
    c.fillRect(10, 10, 1, 1);
    c.fillRect(12, 10, 1, 1);
    c.fillRect(11, 9, 1, 1);
    c.fillRect(11, 11, 1, 1);
    c.fillStyle = PAL.flowerCtr;
    c.fillRect(11, 10, 1, 1);
    // Stems
    c.fillStyle = PAL.grassDk;
    c.fillRect(4, 5, 1, 2);
    c.fillRect(11, 12, 1, 2);
  });

  // Path — sandy dirt road
  tiles[T.PATH] = makeTile(c => {
    c.fillStyle = PAL.path;
    c.fillRect(0, 0, 16, 16);
    c.fillStyle = PAL.pathLt;
    c.fillRect(4, 2, 2, 1);
    c.fillRect(10, 8, 2, 1);
    c.fillRect(1, 12, 2, 1);
    c.fillStyle = PAL.pathDk;
    c.fillRect(7, 5, 1, 1);
    c.fillRect(13, 13, 1, 1);
    c.fillRect(2, 7, 1, 1);
  });

  // Water (frame 1) — blue with wave highlights
  tiles[T.WATER] = makeTile(c => {
    c.fillStyle = PAL.water1;
    c.fillRect(0, 0, 16, 16);
    c.fillStyle = PAL.waterLt;
    c.fillRect(2, 3, 5, 1);
    c.fillRect(10, 9, 4, 1);
    c.fillStyle = PAL.waterDk;
    c.fillRect(1, 7, 3, 1);
    c.fillRect(8, 13, 4, 1);
  });

  // Water (frame 2) — shifted waves
  tiles[T.WATER2] = makeTile(c => {
    c.fillStyle = PAL.water1;
    c.fillRect(0, 0, 16, 16);
    c.fillStyle = PAL.waterLt;
    c.fillRect(5, 5, 5, 1);
    c.fillRect(1, 11, 4, 1);
    c.fillStyle = PAL.waterDk;
    c.fillRect(9, 2, 3, 1);
    c.fillRect(3, 14, 4, 1);
  });

  // Tree top — round leafy canopy
  tiles[T.TREE_TOP] = makeTile(c => {
    c.fillStyle = PAL.grass;
    c.fillRect(0, 0, 16, 16);
    // Main canopy
    c.fillStyle = PAL.leavesMd;
    c.fillRect(2, 3, 12, 10);
    c.fillRect(4, 1, 8, 2);
    c.fillRect(4, 13, 8, 2);
    // Highlight clusters
    c.fillStyle = PAL.leavesLt;
    c.fillRect(4, 3, 4, 3);
    c.fillRect(8, 7, 4, 3);
    c.fillRect(3, 9, 3, 2);
    // Shadow clusters
    c.fillStyle = PAL.leaves;
    c.fillRect(9, 3, 3, 2);
    c.fillRect(3, 6, 3, 2);
    c.fillRect(8, 11, 4, 2);
    // Outline hint
    c.fillStyle = PAL.leaves;
    c.fillRect(2, 3, 1, 10);
    c.fillRect(13, 3, 1, 10);
  });

  // Tree trunk
  tiles[T.TREE_TRUNK] = makeTile(c => {
    c.fillStyle = PAL.grass;
    c.fillRect(0, 0, 16, 16);
    // Main trunk
    c.fillStyle = PAL.trunk;
    c.fillRect(5, 0, 6, 12);
    // Bark shadow
    c.fillStyle = PAL.trunkDk;
    c.fillRect(5, 0, 2, 12);
    // Bark highlight
    c.fillStyle = PAL.trunk;
    c.fillRect(8, 2, 1, 8);
    // Ground shadow
    c.fillStyle = PAL.grassDk;
    c.fillRect(4, 12, 8, 1);
  });

  // Wall (centre) — cream/beige
  tiles[T.WALL] = makeTile(c => {
    c.fillStyle = PAL.wall;
    c.fillRect(0, 0, 16, 16);
    // Horizontal mortar lines
    c.fillStyle = PAL.wallDk;
    c.fillRect(0, 5, 16, 1);
    c.fillRect(0, 11, 16, 1);
    // Vertical mortar (offset per row)
    c.fillRect(4, 0, 1, 5);
    c.fillRect(12, 0, 1, 5);
    c.fillRect(8, 6, 1, 5);
    c.fillRect(0, 6, 1, 5);
    c.fillRect(4, 12, 1, 4);
    c.fillRect(12, 12, 1, 4);
    // Top/bottom accent
    c.fillStyle = PAL.wallLt;
    c.fillRect(0, 0, 16, 1);
    c.fillRect(0, 15, 16, 1);
  });

  // Wall left edge
  tiles[T.WALL_LEFT] = makeTile(c => {
    c.fillStyle = PAL.wall;
    c.fillRect(0, 0, 16, 16);
    c.fillStyle = PAL.wallDk;
    c.fillRect(0, 5, 16, 1);
    c.fillRect(0, 11, 16, 1);
    c.fillRect(8, 0, 1, 5);
    c.fillRect(4, 6, 1, 5);
    c.fillRect(12, 6, 1, 5);
    c.fillRect(8, 12, 1, 4);
    // Left edge shadow
    c.fillStyle = PAL.wallDk;
    c.fillRect(0, 0, 2, 16);
    c.fillStyle = PAL.wallLt;
    c.fillRect(0, 0, 16, 1);
    c.fillRect(0, 15, 16, 1);
  });

  // Wall right edge
  tiles[T.WALL_RIGHT] = makeTile(c => {
    c.fillStyle = PAL.wall;
    c.fillRect(0, 0, 16, 16);
    c.fillStyle = PAL.wallDk;
    c.fillRect(0, 5, 16, 1);
    c.fillRect(0, 11, 16, 1);
    c.fillRect(4, 0, 1, 5);
    c.fillRect(8, 6, 1, 5);
    c.fillRect(4, 12, 1, 4);
    // Right edge shadow
    c.fillStyle = PAL.wallDk;
    c.fillRect(14, 0, 2, 16);
    c.fillStyle = PAL.wallLt;
    c.fillRect(0, 0, 16, 1);
    c.fillRect(0, 15, 16, 1);
  });

  // Roof centre — red shingles
  tiles[T.ROOF] = makeTile(c => {
    c.fillStyle = PAL.roof;
    c.fillRect(0, 0, 16, 16);
    // Shingle rows
    c.fillStyle = PAL.roofDk;
    for (let y = 0; y < 16; y += 4) {
      c.fillRect(0, y, 16, 1);
    }
    // Offset shingle lines
    c.fillRect(4, 2, 1, 2);
    c.fillRect(12, 2, 1, 2);
    c.fillRect(0, 6, 1, 2);
    c.fillRect(8, 6, 1, 2);
    c.fillRect(4, 10, 1, 2);
    c.fillRect(12, 10, 1, 2);
    // Highlight
    c.fillStyle = PAL.roofLt;
    c.fillRect(2, 1, 2, 1);
    c.fillRect(10, 5, 2, 1);
    c.fillRect(6, 9, 2, 1);
    c.fillRect(14, 13, 2, 1);
  });

  // Roof left — triangular slope
  tiles[T.ROOF_LEFT] = makeTile(c => {
    c.fillStyle = PAL.grass;
    c.fillRect(0, 0, 16, 16);
    c.fillStyle = PAL.roof;
    for (let y = 0; y < 16; y++) {
      c.fillRect(15 - y, y, y + 1, 1);
    }
    // Shingle shadow lines
    c.fillStyle = PAL.roofDk;
    for (let y = 0; y < 16; y += 4) {
      c.fillRect(15 - y, y, y + 1, 1);
    }
    // Edge highlight
    c.fillStyle = PAL.roofLt;
    for (let y = 0; y < 16; y++) {
      c.fillRect(15 - y, y, 1, 1);
    }
  });

  // Roof right — triangular slope
  tiles[T.ROOF_RIGHT] = makeTile(c => {
    c.fillStyle = PAL.grass;
    c.fillRect(0, 0, 16, 16);
    c.fillStyle = PAL.roof;
    for (let y = 0; y < 16; y++) {
      c.fillRect(0, y, y + 1, 1);
    }
    c.fillStyle = PAL.roofDk;
    for (let y = 0; y < 16; y += 4) {
      c.fillRect(0, y, y + 1, 1);
    }
    c.fillStyle = PAL.roofLt;
    for (let y = 1; y < 16; y++) {
      c.fillRect(y, y, 1, 1);
    }
  });

  // Door — dark wood with frame
  tiles[T.DOOR] = makeTile(c => {
    c.fillStyle = PAL.wall;
    c.fillRect(0, 0, 16, 16);
    // Door frame
    c.fillStyle = PAL.doorFrame;
    c.fillRect(3, 1, 10, 15);
    // Door panels
    c.fillStyle = PAL.door;
    c.fillRect(4, 2, 8, 14);
    // Centre line
    c.fillStyle = PAL.doorDk;
    c.fillRect(7, 2, 2, 14);
    // Panels detail
    c.fillStyle = PAL.doorDk;
    c.fillRect(4, 2, 8, 1);
    c.fillRect(4, 8, 8, 1);
    // Doorknob
    c.fillStyle = PAL.flowerCtr;
    c.fillRect(9, 9, 2, 2);
    // Mortar on wall sides
    c.fillStyle = PAL.wallDk;
    c.fillRect(0, 5, 3, 1);
    c.fillRect(13, 5, 3, 1);
    c.fillRect(0, 11, 3, 1);
    c.fillRect(13, 11, 3, 1);
  });

  // Window — blue glass with frame
  tiles[T.WINDOW] = makeTile(c => {
    c.fillStyle = PAL.wall;
    c.fillRect(0, 0, 16, 16);
    // Window frame
    c.fillStyle = PAL.windowFrame;
    c.fillRect(2, 2, 12, 12);
    // Glass
    c.fillStyle = PAL.window;
    c.fillRect(3, 3, 10, 10);
    // Cross panes
    c.fillStyle = PAL.windowFrame;
    c.fillRect(7, 3, 2, 10);
    c.fillRect(3, 7, 10, 2);
    // Glass highlight
    c.fillStyle = PAL.waterLt;
    c.fillRect(4, 4, 2, 2);
    c.fillRect(10, 4, 2, 2);
    // Shadow on glass
    c.fillStyle = PAL.windowDk;
    c.fillRect(4, 10, 3, 2);
    c.fillRect(10, 10, 2, 2);
    // Wall mortar
    c.fillStyle = PAL.wallDk;
    c.fillRect(0, 5, 2, 1);
    c.fillRect(14, 5, 2, 1);
    c.fillRect(0, 11, 2, 1);
    c.fillRect(14, 11, 2, 1);
    c.fillStyle = PAL.wallLt;
    c.fillRect(0, 0, 16, 1);
    c.fillRect(0, 15, 16, 1);
  });

  // Fence — wooden posts and rails
  tiles[T.FENCE] = makeTile(c => {
    c.fillStyle = PAL.grass;
    c.fillRect(0, 0, 16, 16);
    // Posts
    c.fillStyle = PAL.fence;
    c.fillRect(1, 3, 3, 13);
    c.fillRect(12, 3, 3, 13);
    // Post tops
    c.fillStyle = PAL.fenceDk;
    c.fillRect(1, 3, 3, 1);
    c.fillRect(12, 3, 3, 1);
    // Rails
    c.fillStyle = PAL.fence;
    c.fillRect(0, 6, 16, 2);
    c.fillRect(0, 11, 16, 2);
    // Rail shadow
    c.fillStyle = PAL.fenceDk;
    c.fillRect(0, 8, 16, 1);
    c.fillRect(0, 13, 16, 1);
    // Post shadow
    c.fillStyle = PAL.fenceDk;
    c.fillRect(1, 3, 1, 13);
    c.fillRect(12, 3, 1, 13);
  });

  // Sign — wooden post with sign board
  tiles[T.SIGN] = makeTile(c => {
    c.fillStyle = PAL.grass;
    c.fillRect(0, 0, 16, 16);
    // Post
    c.fillStyle = PAL.trunk;
    c.fillRect(6, 8, 4, 8);
    c.fillStyle = PAL.trunkDk;
    c.fillRect(6, 8, 1, 8);
    // Sign board
    c.fillStyle = PAL.signFace;
    c.fillRect(1, 1, 14, 9);
    // Border
    c.fillStyle = PAL.sign;
    c.fillRect(1, 1, 14, 1);
    c.fillRect(1, 9, 14, 1);
    c.fillRect(1, 1, 1, 9);
    c.fillRect(14, 1, 1, 9);
    // Text lines
    c.fillStyle = PAL.signText;
    c.fillRect(3, 3, 10, 1);
    c.fillRect(3, 5, 8, 1);
    c.fillRect(3, 7, 6, 1);
  });

  // ---- Interior tiles ----

  // Floor — wooden planks
  tiles[T.FLOOR] = makeTile(c => {
    c.fillStyle = '#c8a060';
    c.fillRect(0, 0, 16, 16);
    c.fillStyle = '#b08848';
    c.fillRect(0, 3, 16, 1);
    c.fillRect(0, 7, 16, 1);
    c.fillRect(0, 11, 16, 1);
    c.fillRect(0, 15, 16, 1);
    c.fillStyle = '#d8b878';
    c.fillRect(2, 1, 3, 1);
    c.fillRect(10, 5, 3, 1);
    c.fillRect(5, 9, 3, 1);
    c.fillRect(12, 13, 2, 1);
    c.fillStyle = '#987040';
    c.fillRect(7, 1, 2, 2);
    c.fillRect(3, 9, 2, 2);
  });

  // Interior wall
  tiles[T.INT_WALL] = makeTile(c => {
    c.fillStyle = '#d8c8a8';
    c.fillRect(0, 0, 16, 16);
    c.fillStyle = '#c8b898';
    c.fillRect(4, 2, 1, 1);
    c.fillRect(12, 6, 1, 1);
    c.fillRect(4, 10, 1, 1);
    c.fillRect(12, 14, 1, 1);
    c.fillStyle = '#e8d8c0';
    c.fillRect(0, 0, 16, 2);
    c.fillStyle = '#b0a080';
    c.fillRect(0, 2, 16, 1);
  });

  // Interior wall bottom — baseboard
  tiles[T.INT_WALL_BOTTOM] = makeTile(c => {
    c.fillStyle = '#d8c8a8';
    c.fillRect(0, 0, 16, 12);
    c.fillStyle = '#987040';
    c.fillRect(0, 12, 16, 4);
    c.fillStyle = '#b08848';
    c.fillRect(0, 12, 16, 1);
  });

  // Rug
  tiles[T.RUG] = makeTile(c => {
    c.fillStyle = '#c8a060';
    c.fillRect(0, 0, 16, 16);
    c.fillStyle = '#983838';
    c.fillRect(1, 1, 14, 14);
    c.fillStyle = '#c85050';
    c.fillRect(2, 2, 12, 1);
    c.fillRect(2, 13, 12, 1);
    c.fillRect(2, 2, 1, 12);
    c.fillRect(13, 2, 1, 12);
    c.fillStyle = '#c87050';
    c.fillRect(6, 6, 4, 4);
    c.fillStyle = '#d89060';
    c.fillRect(7, 7, 2, 2);
  });

  // Shelf — bookshelf
  tiles[T.SHELF] = makeTile(c => {
    c.fillStyle = '#d8c8a8';
    c.fillRect(0, 0, 16, 16);
    c.fillStyle = '#885830';
    c.fillRect(1, 1, 14, 15);
    c.fillStyle = '#604020';
    c.fillRect(1, 5, 14, 1);
    c.fillRect(1, 10, 14, 1);
    c.fillStyle = '#c83838';
    c.fillRect(2, 2, 2, 3);
    c.fillStyle = '#3868b8';
    c.fillRect(4, 2, 2, 3);
    c.fillStyle = '#38a848';
    c.fillRect(6, 3, 2, 2);
    c.fillStyle = '#c87828';
    c.fillRect(9, 2, 2, 3);
    c.fillStyle = '#6848a8';
    c.fillRect(11, 2, 2, 3);
    c.fillStyle = '#c8a050';
    c.fillRect(2, 6, 3, 4);
    c.fillStyle = '#3868b8';
    c.fillRect(5, 7, 2, 3);
    c.fillStyle = '#c83838';
    c.fillRect(8, 6, 2, 4);
    c.fillStyle = '#38a848';
    c.fillRect(11, 7, 2, 3);
    c.fillStyle = '#704828';
    c.fillRect(2, 11, 12, 4);
    c.fillStyle = '#885830';
    c.fillRect(3, 12, 4, 3);
    c.fillRect(9, 12, 4, 3);
  });

  // Table
  tiles[T.TABLE] = makeTile(c => {
    c.fillStyle = '#c8a060';
    c.fillRect(0, 0, 16, 16);
    c.fillStyle = '#885830';
    c.fillRect(1, 4, 14, 3);
    c.fillStyle = '#a06830';
    c.fillRect(2, 4, 12, 1);
    c.fillStyle = '#604020';
    c.fillRect(2, 7, 2, 9);
    c.fillRect(12, 7, 2, 9);
    c.fillStyle = '#f0e8c8';
    c.fillRect(6, 2, 4, 2);
    c.fillStyle = '#d0c098';
    c.fillRect(7, 3, 2, 1);
  });

  // Exit door
  tiles[T.EXIT_DOOR] = makeTile(c => {
    c.fillStyle = '#d8c8a8';
    c.fillRect(0, 0, 16, 12);
    c.fillStyle = '#987040';
    c.fillRect(0, 12, 16, 4);
    c.fillStyle = PAL.doorFrame;
    c.fillRect(3, 0, 10, 12);
    c.fillStyle = PAL.door;
    c.fillRect(4, 0, 8, 12);
    c.fillStyle = PAL.doorDk;
    c.fillRect(7, 0, 2, 12);
    c.fillStyle = PAL.flowerCtr;
    c.fillRect(9, 5, 2, 2);
    c.fillStyle = '#c87050';
    c.fillRect(3, 13, 10, 2);
    c.fillStyle = '#a85838';
    c.fillRect(4, 14, 8, 1);
  });

  // Interior window
  tiles[T.INT_WINDOW] = makeTile(c => {
    c.fillStyle = '#d8c8a8';
    c.fillRect(0, 0, 16, 16);
    c.fillStyle = PAL.windowFrame;
    c.fillRect(2, 2, 12, 12);
    c.fillStyle = '#a8d8f8';
    c.fillRect(3, 3, 10, 10);
    c.fillStyle = PAL.windowFrame;
    c.fillRect(7, 3, 2, 10);
    c.fillRect(3, 7, 10, 2);
    c.fillStyle = '#c8e8ff';
    c.fillRect(4, 4, 2, 2);
    c.fillRect(10, 4, 2, 2);
    c.fillStyle = '#c85050';
    c.fillRect(2, 2, 1, 12);
    c.fillRect(13, 2, 1, 12);
    c.fillStyle = '#e8d8c0';
    c.fillRect(0, 0, 16, 2);
    c.fillStyle = '#b0a080';
    c.fillRect(0, 2, 16, 1);
  });

  return tiles;
}
