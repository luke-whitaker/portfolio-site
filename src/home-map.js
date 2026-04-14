import { T } from './tileset.js';

// Interior tile shortcuts
const F  = T.FLOOR;
const IW = T.INT_WALL;
const IB = T.INT_WALL_BOTTOM;
const RG = T.RUG;
const SH = T.SHELF;
const TB = T.TABLE;
const ED = T.EXIT_DOOR;
const WN = T.INT_WINDOW;

// 15 columns x 10 rows — a cosy home interior
// prettier-ignore
export const homeTiles = [
  // Row 0: top wall
  [IW, IW, IW, IW, SH, SH, WN, WN, WN, SH, SH, IW, IW, IW, IW],
  // Row 1: wall bottom with baseboards
  [IB, IB, IB, IB, SH, SH, WN, WN, WN, SH, SH, IB, IB, IB, IB],
  // Row 2: open floor
  [F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F ],
  // Row 3: table area
  [F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  TB, F,  F ],
  // Row 4: rug area
  [F,  F,  F,  F,  RG, RG, RG, RG, RG, RG, RG, F,  F,  F,  F ],
  // Row 5: rug area
  [F,  F,  F,  F,  RG, RG, RG, RG, RG, RG, RG, F,  F,  F,  F ],
  // Row 6: open floor
  [F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F ],
  // Row 7: open floor
  [F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F ],
  // Row 8: bottom wall with exit door
  [IB, IB, IB, IB, IB, IB, IB, ED, IB, IB, IB, IB, IB, IB, IB],
  // Row 9: below wall (not visible, acts as boundary)
  [IW, IW, IW, IW, IW, IW, IW, IW, IW, IW, IW, IW, IW, IW, IW],
];

export const HOME_COLS = 15;
export const HOME_ROWS = 10;

// Tiles that are solid inside the home
const HOME_SOLID = new Set([
  T.INT_WALL, T.INT_WALL_BOTTOM, T.SHELF, T.TABLE, T.INT_WINDOW,
]);

export function isHomeSolid(col, row) {
  if (col < 0 || col >= HOME_COLS || row < 0 || row >= HOME_ROWS) return true;
  return HOME_SOLID.has(homeTiles[row][col]);
}

// Exit door position
export const HOME_EXIT = { col: 7, row: 8 };

// Player spawn position when entering home
export const HOME_SPAWN = { col: 7, row: 7 };

// Desk position inside home (right-side table, col 12 row 3)
export const HOME_DESK = {
  col: 12, row: 3,
  link: 'https://luke-whitaker.github.io/portfolio-site/resume.pdf', // LINK TO RESUME
  lines: [
    "[ Luke's Desk ]\nThree labs are just outside\nto the East. Each one holds\ndifferent work.",
    "Stats Lab (1st door):\nLuke's StatLab app — a\nbrowser-based stats tool.",
    "Ling Lab (2nd door):\nLuke's published research —\nMA Thesis and co-authored\narticle on AI in education.",
    "Dev Lab (3rd door):\nLuke's software projects —\nStatLab and Our Place.",
    "[ Luke's resume ]\nClick the link below to open\nLuke's resume in a new tab.",
  ],
};

// Cat position inside home
export const HOME_CAT = {
  col: 6, row: 5,
  lines: [
    "Mrrrow... a visitor.\nHow nice.\nYou've found Luke's place.",
    "Luke speaks English, French,\nand Spanish fluently — with some\nPortuguese and Mandarin\npicked up along the way.",
    "He's a professionally trained\nlinguist and empirical researcher\nwith a passion for language,\ntechnology, and digital interfaces.",
    "A lifelong language learner.\nAlso a passionate soccer\nfan and player, if you\nwere wondering. ...purrr...",
    "See that desk in the corner?\nHead over and interact with it—\nit'll tell you exactly what's\nin each of the labs outside.",
    "On his desk you'll also find a copy of Luke's resume.",
  ],
};
