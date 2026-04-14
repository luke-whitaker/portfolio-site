import { T } from './tileset.js';

// Interior tile shortcuts
const F  = T.FLOOR;
const IW = T.INT_WALL;
const IB = T.INT_WALL_BOTTOM;
const SH = T.SHELF;
const ED = T.EXIT_DOOR;
const WN = T.INT_WINDOW;
const CP = T.COMPUTER;
const PS = T.POSTER;

export const LAB_COLS = 15;
export const LAB_ROWS = 10;

// ──────────────────────────────────────
//  Stats Lab — computer running StatLab
// ──────────────────────────────────────

// prettier-ignore
export const statsLabTiles = [
  [IW, IW, IW, IW, SH, SH, WN, WN, WN, SH, SH, IW, IW, IW, IW],
  [IB, IB, IB, IB, SH, SH, WN, WN, WN, SH, SH, IB, IB, IB, IB],
  [F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F ],
  [F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  CP, F,  F,  F ],
  [F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F ],
  [F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F ],
  [F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F ],
  [F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F ],
  [IB, IB, IB, IB, IB, IB, IB, ED, IB, IB, IB, IB, IB, IB, IB],
  [IW, IW, IW, IW, IW, IW, IW, IW, IW, IW, IW, IW, IW, IW, IW],
];

export const STATS_LAB_EXIT  = { col: 7, row: 8 };
export const STATS_LAB_SPAWN = { col: 7, row: 7 };

export const STATS_LAB_CAT = {
  col: 3, row: 5,
  lines: [
    "Mrrrow... welcome to\nthe Stats Lab.",
    "See that computer\nin the corner? That's\nLuke's StatLab app.",
    "Head over and interact\nwith it to check it out!",
  ],
};

export const STATS_LAB_NPC = {
  col: 5, row: 4,
  lines: [
    "StatLab is Luke's web app\nfor running statistical\nanalyses in the browser.",
    "It makes data analysis\naccessible without needing\nto install any software.",
  ],
};

export const STATS_LAB_COMPUTER = {
  col: 11, row: 3,
  lines: [
    "[ StatLab ]\nA browser-based statistical\nanalysis tool.",
    "Run descriptive stats, t-tests,\ncorrelations, and more — no\ninstallation required.",
    "Click the link below\nto open StatLab.",
  ],
  link: 'https://dynamic-spirit-production-91a5.up.railway.app/',
};

// ──────────────────────────────────────
//  Ling Lab — published research posters
// ──────────────────────────────────────

// prettier-ignore
export const lingLabTiles = [
  [IW, IW, IW, IW, SH, SH, WN, WN, WN, SH, SH, IW, IW, IW, IW],
  [IB, IB, IB, IB, SH, SH, WN, WN, WN, SH, SH, IB, IB, IB, IB],
  [F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F ],
  [F,  F,  F,  PS, F,  F,  F,  F,  F,  F,  F,  PS, F,  F,  F ],
  [F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F ],
  [F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F ],
  [F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F ],
  [F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F ],
  [IB, IB, IB, IB, IB, IB, IB, ED, IB, IB, IB, IB, IB, IB, IB],
  [IW, IW, IW, IW, IW, IW, IW, IW, IW, IW, IW, IW, IW, IW, IW],
];

export const LING_LAB_EXIT  = { col: 7, row: 8 };
export const LING_LAB_SPAWN = { col: 7, row: 7 };

export const LING_LAB_CAT = {
  col: 3, row: 5,
  lines: [
    "Mrrrow... the Ling Lab.\nLuke's published research\nlives here.",
    "There are two posters\non display — one for each\npublication.",
    "Walk up to either poster\nand interact with it\nto learn more!",
  ],
};

export const LING_LAB_NPC = {
  col: 7, row: 4,
  lines: [
    "Luke has two published works\non display here.",
    "The poster on the left is\nhis MA Thesis on French\ninterrogative syntax.",
    "The one on the right is\na co-authored article on AI\nin language education.",
  ],
};

export const LING_LAB_POSTER_1 = {
  col: 3, row: 3,
  lines: [
    "[ French Interrogatives\n  in Context ]\nMA Thesis · University of Iowa\n2021",
    "An empirical study of whether\nHeritage French speakers are\nas sensitive as native speakers\nto contextual factors governing\nquestion forms in French.",
    "Click below to read\nthe full thesis.",
  ],
  link: 'https://iro.uiowa.edu/esploro/outputs/graduate/French-interrogatives-in-context/9984096974302771',
};

export const LING_LAB_POSTER_2 = {
  col: 11, row: 3,
  lines: [
    "[ The Future of Language\n  Education ]\nZimotti, Frances & Whitaker\n2024",
    "A survey of 100+ language\nteachers on their perceptions\nof AI writing tools like\nChatGPT in the classroom.",
    "Role: Co-author &\nprimary Data Analyst.\nClick below to read\nthe article.",
  ],
  link: 'https://doi.org/10.29140/tltl.v6n2.1136',
};

// ──────────────────────────────────────
//  Dev Lab — software projects
// ──────────────────────────────────────

// prettier-ignore
export const devLabTiles = [
  [IW, IW, IW, IW, SH, SH, WN, WN, WN, SH, SH, IW, IW, IW, IW],
  [IB, IB, IB, IB, SH, SH, WN, WN, WN, SH, SH, IB, IB, IB, IB],
  [F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F ],
  [F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  CP, F,  F,  F ],
  [F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F ],
  [F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F ],
  [F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F ],
  [F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F,  F ],
  [IB, IB, IB, IB, IB, IB, IB, ED, IB, IB, IB, IB, IB, IB, IB],
  [IW, IW, IW, IW, IW, IW, IW, IW, IW, IW, IW, IW, IW, IW, IW],
];

export const DEV_LAB_EXIT  = { col: 7, row: 8 };
export const DEV_LAB_SPAWN = { col: 7, row: 7 };

export const DEV_LAB_CAT = {
  col: 3, row: 5,
  lines: [
    "Mrrrow... the Dev Lab.\nLuke's software projects\nare showcased here.",
    "Check out the computer\nto see what he's built!",
  ],
};

export const DEV_LAB_NPC = {
  col: 5, row: 4,
  lines: [
    "Luke builds tools that\nbring together language\nand technology.",
    "The computer has links to\nhis active projects —\nStatLab and Our Place.",
  ],
};

export const DEV_LAB_COMPUTER = {
  col: 11, row: 3,
  lines: [
    "[ Dev Lab Projects ]\nLuke's software projects\nare listed here.",
    "[ StatLab ]\nA browser-based statistical\nanalysis tool.\nClick below to open it.",
    "[ Our Place ]\nA community platform with\nan 8-bit RPG overworld.\nClick below to view on GitHub.",
  ],
  // Multi-link: one per dialogue page (null = no link on that page)
  links: [
    null,
    'https://dynamic-spirit-production-91a5.up.railway.app/',
    'https://github.com/luke-whitaker/our-place',
  ],
};

// ──────────────────────────────────────
//  Shared collision logic
// ──────────────────────────────────────

const LAB_SOLID = new Set([
  T.INT_WALL, T.INT_WALL_BOTTOM, T.SHELF, T.TABLE, T.INT_WINDOW,
  T.COMPUTER, T.POSTER,
]);

function makeLabSolidFn(tileGrid) {
  return function isLabSolid(col, row) {
    if (col < 0 || col >= LAB_COLS || row < 0 || row >= LAB_ROWS) return true;
    return LAB_SOLID.has(tileGrid[row][col]);
  };
}

export const isStatsLabSolid = makeLabSolidFn(statsLabTiles);
export const isLingLabSolid  = makeLabSolidFn(lingLabTiles);
export const isDevLabSolid   = makeLabSolidFn(devLabTiles);
