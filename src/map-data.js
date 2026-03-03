import { T } from './tileset.js';

// 30 columns x 20 rows
// Legend: G=grass, P=path, W=water, TT=tree top, TB=tree trunk,
//         WL=wall, RF=roof, DR=door, WN=window, FN=fence, SN=sign
//         RL=roof left, RR=roof right, FL=flower, WL2=wall left, WR2=wall right

const G  = T.GRASS;
const P  = T.PATH;
const W  = T.WATER;
const TT = T.TREE_TOP;
const TB = T.TREE_TRUNK;
const WA = T.WALL;
const RF = T.ROOF;
const DR = T.DOOR;
const WN = T.WINDOW;
const FN = T.FENCE;
const SN = T.SIGN;
const RL = T.ROOF_LEFT;
const RR = T.ROOF_RIGHT;
const FL = T.FLOWER;
const WL = T.WALL_LEFT;
const WR = T.WALL_RIGHT;

// prettier-ignore
export const tiles = [
  // Row 0: top border — trees and water
  [TT,  TT, TT,  TT,  TT,  TT, TT, TT, TT,  TT,  TT,  TT,  TT,  TT,  TT,  TT,  TT,  TT, TT, TT, TT,  TT,  TT,  TT,  TT,  TT,  TT,  TT,  TT,  TT, G,  G,  G,  G,  G,  G,  G,  G,  G, G, G,  G,  G,  G,  G,  G,  G,  G, G, G,  G,  G, G, G, G, G, G, G, G, G, TT, TT, TT, W, W, W, W, W, TT, TT, TT, TT, G, G, TT, TT, TT, TT, G, G, TT, TT, TT, W, W, W, W,  TT, TT, TT],
  // Row 1: tree trunks and water
  [TT,  TT, TT,  TT,  TT,  TT,  TT,  TT,  TT,  TT,  TT,  TT,  TT,  TT,  TT,  TT,  TT,  TT,  TT,  TT,  TT,  TT,  TT,  TT,  TT,  TT,  TT,  TT,  TT,  TT,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G, TB, TB, TB, W,  W,  W,  W,  W,  TB, TB, TB, TB, G,  G,  TB, TB, TB, TB, G,  G,  TB, TB, TB, W,  W,  W,  W,  TB, TB, TB],
  // Row 2: open area with flowers
  [TT, TT, G, FL,  G,  G,  G, FL,  G,  G,  G, FL,  G,  G,  G, FL,  G,  G,  G, FL,  G,  G,  G, FL,  G,  G,  G, FL,  G,  G, G,  FL,  G,  G,  G, FL,  G,  G,  G, FL,  G,  G,  G, FL,  G,  G,  G, FL,  G,  G,  G, FL,  G,  G,  G,  FL,  G,  G,  G, FL, G,  G,  G,  G,  FL, G,  G,  G,  G,  G,  G,  FL, G,  G,  G,  FL, G,  G,  G,  G,  FL, G,  G,  G,  G,  FL, G,  G,  G,  G ],
  // Row 3: fence above buildings
  [TT, TT, G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G, G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G, G,  G,  FN, FN, FN, FN, FN, FN, FN, G,  FN, FN, FN, FN, FN, FN, FN, G,  FN, FN, FN, FN, FN, FN, FN, FN, G,  G,  G,  G ],
  // Row 4: space
  [TT, TT, G,  G,  G, FL,  G,  G,  G, FL,  G,  G,  G, FL,  G,  G,  G, FL,  G,  G,  G, FL,  G,  G,  G, FL,  G,  G,  G, FL, G,  G,  G, FL,  G,  G,  G, FL,  G,  G,  G, FL,  G,  G,  G, FL,  G,  G,  G, FL,  G,  G,  G, FL,  G,  G,  G,  G,  G,  G, G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G ],
  // Row 5: space
  [TT, TT, G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G, G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G, G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G ],
  // Row 6: space before roofs
  [TT, TT, G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G, G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G, G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G ],
  // Row 7: roofs — Building 1 (cols 4-8), Building 2 (cols 12-16), Building 3 (cols 20-24)
  [TT, TT, G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G, G,  G,  G,  G,  G,  G,  G,  G,  G,  RL,  RF,  RF,  RF,  RF,  RF,  RR,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G, G,  G,  G,  RL, RF, RF, RF, RF, RR, G,  G,  RL, RF, RF, RF, RF, RR, G,  G,  RL, RF, RF, RF, RF, RR, G,  G,  G,  G,  G ],
  // Row 8: walls with windows
  [TT, TT, G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G, G,  G,  G,  G,  G,  G,  G,  G,  G,  WL,  WA,  WN,  WA,  WN,  WA,  WR,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G, G,  G,  G,  WL, WN, WA, WA, WN, WR, G,  G,  WL, WN, WA, WA, WN, WR, G,  G,  WL, WN, WA, WA, WN, WR, G,  G,  G,  G,  G ],
  // Row 9: walls with doors
  [TT, TT, G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G, G,  G,  G,  G,  G,  G,  G,  G,  G,  WL,  WA,  WA,  DR,  WA,  WA,  WR,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G, G,  G,  G,  WL, WA, WA, DR, WA, WR, G,  G,  WL, WA, WA, DR, WA, WR, G,  G,  WL, WA, WA, DR, WA, WR, G,  G,  G,  G,  G ],
  // Row 10: path in front of buildings
  [TT, TT, G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G, G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  P,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G, G,  G,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  G,  G,  G ],
  // Row 11: path
  [TT, TT, G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G, G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  P,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G, G,  G,  G,  G,  G,  G,  P,  G,  G,  G,  G,  G,  G,  G,  P,  G,  G,  G,  G,  G,  G,  G,  P,  G,  G,  G,  G,  G,  G,  G ],
  // Row 12: vertical paths down from doors + NPC area
  [TT, TT, G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, P, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL,  SN,  G, G,  FL, G,  G,  G,  G,  P,  G,  G,  FL, G,  G,  G,  G,  P,  G,  G,  FL, G,  G,  G,  G,  P,  G,  G,  FL, G,  G,  G,  G ],
  // Row 13: main horizontal path
  [TT, TT, G, G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  P, P, P,  P,  P,  P,  P,  P, P,  P, P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P, P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P,  P ],
  // Row 14: below path
  [TT, TT, G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL, FL,  G,  G,  G,  FL, G,  G,  G,  G,  G,  G,  FL, G,  G,  G,  FL, G,  G,  G,  G,  FL, G,  G,  G,  G,  FL, G,  G,  G,  G ],
  // Row 15: some trees and open grass
  [TT, TT, G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G, G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G, G,  G,  TT, G,  G,  G,  G,  G,  TT, G,  G,  G,  G,  G,  G,  G,  TT, G,  G,  G,  G,  G,  G,  TT, G,  G,  G,  G,  TT, G ],
  // Row 16
  [TT, TT, G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G, G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G,  G, G,  G,  TB, G,  G,  G,  G,  G,  TB, G,  G,  G,  G,  G,  G,  G,  TB, G,  G,  G,  G,  G,  G,  TB, G,  G,  G,  G,  TB, G ],
  // Row 17: water at bottom
  [W,  W,  W,  W,  W,  G,  G,  G,  W,  W,  W,  W,  W,  G,  G,  G,  W,  W,  W,  W,  W,  G,  G,  G,  W,  W,  W,  W,  W,  W, W,  W,  W,  W,  W,  G,  G,  G,  W,  W,  W,  W,  W,  G,  G,  G,  W,  W,  W,  W,  W,  G,  G,  G,  W,  W,  W,  W,  W,  W, G,  G,  G,  G,  G,  FN, FN, FN, G,  G,  G,  G,  G,  FN, FN, FN, G,  G,  G,  G,  G,  FN, FN, FN, G,  G,  G,  G,  G,  G ],
  // Row 18
  [W,  W,  W,  W,  W,  G,  G,  G,  W,  W,  W,  W,  W,  G,  G,  G,  W,  W,  W,  W,  W,  G,  G,  G,  W,  W,  W,  W,  W,  W, W,  W,  W,  W,  W,  G,  G,  G,  W,  W,  W,  W,  W,  G,  G,  G,  W,  W,  W,  W,  W,  G,  G,  G,  W,  W,  W,  W,  W,  W, W,  W,  W,  W,  G,  G,  G,  G,  G,  G,  W,  W,  W,  G,  G,  G,  G,  W,  W,  W,  G,  G,  G,  G,  G,  G,  W,  W,  W,  W ],
  // Row 19: bottom water
  [W,  W,  W,  W,  W,  G,  G,  G,  W,  W,  W,  W,  W,  G,  G,  G,  W,  W,  W,  W,  W,  G,  G,  G,  W,  W,  W,  W,  W,  W, W,  W,  W,  W,  W,  G,  G,  G,  W,  W,  W,  W,  W,  G,  G,  G,  W,  W,  W,  W,  W,  G,  G,  G,  W,  W,  W,  W,  W,  W, W,  W,  W,  W,  W,  G,  G,  G,  W,  W,  W,  W,  W,  G,  G,  G,  W,  W,  W,  W,  W,  G,  G,  G,  W,  W,  W,  W,  W,  W ],
];

// Collision: 1 = solid, 0 = walkable
// Trees, water, walls, roofs, fences, windows are solid
// Grass, path, doors, flowers, signs are walkable
const SOLID = new Set([T.WATER, T.WATER2, T.TREE_TOP, T.TREE_TRUNK, T.WALL, T.ROOF,
  T.FENCE, T.WINDOW, T.ROOF_LEFT, T.ROOF_RIGHT, T.WALL_LEFT, T.WALL_RIGHT]);

export function isSolid(col, row) {
  if (col < 0 || col >= 30 || row < 0 || row >= 20) return true;
  return SOLID.has(tiles[row][col]);
}
