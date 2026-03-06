import { TILE } from './constants.js';
import { generateNPCSprite } from './sprites.js';

export const NPC_DATA = [
  {
    col: 64, row: 10,
    variant: 0,
    lines: [
      "Welcome to the Stats Lab!",
      "Inside you'll find Luke's\nco-authored 2024 research on AI\nin language education.",
      "Walk through the door\nto read the article!",
    ],
  },
  {
    col: 72, row: 10,
    variant: 1,
    lines: [
      "This is the Ling Lab!",
      "It houses Luke's MA Thesis —\nan empirical study of French\nsyntax and heritage speakers.",
      "Head inside to read it!",
    ],
  },
  {
    col: 80, row: 10,
    variant: 2,
    lines: [
      "Welcome to the Dev Lab!",
      "This is where Luke keeps\nhis software projects —\nstarting with this portfolio site.",
      "Enter to see the source!",
    ],
  },
];

export function createNPCs() {
  return NPC_DATA.map(data => ({
    ...data,
    x: data.col * TILE,
    y: data.row * TILE,
    sprite: generateNPCSprite(data.variant),
    lineIndex: 0,
  }));
}

export function renderNPCs(ctx, npcs, camX, camY) {
  for (const npc of npcs) {
    if (npc.sprite) ctx.drawImage(npc.sprite, npc.x - camX, npc.y - camY);
  }
}

// Check if player is within 1.5 tiles of any NPC
export function getNearbyNPC(npcs, playerX, playerY) {
  const threshold = TILE * 1.8;
  for (const npc of npcs) {
    const dx = (npc.x + TILE / 2) - (playerX + TILE / 2);
    const dy = (npc.y + TILE / 2) - (playerY + TILE / 2);
    if (Math.sqrt(dx * dx + dy * dy) < threshold) {
      return npc;
    }
  }
  return null;
}
