import { TILE } from './constants.js';
import { generateNPCSprite } from './sprites.js';

export const NPC_DATA = [
  {
    col: 64, row: 10,
    variant: 0,
    lines: [
      "This is the Stats Lab.",
      "Inside you'll find a computer\nrunning Luke's StatLab app.",
      "Head inside to check it out!",
    ],
  },
  {
    col: 72, row: 10,
    variant: 1,
    lines: [
      "Welcome to the Ling Lab.",
      "Luke's published linguistics\nresearch is on display inside.",
      "Go in and take a look!",
    ],
  },
  {
    col: 80, row: 10,
    variant: 2,
    lines: [
      "This is the Dev Lab.",
      "Luke's software projects\nare showcased inside.",
      "Head in to see what\nhe's been building!",
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
