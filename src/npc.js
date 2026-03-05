import { TILE } from './constants.js';
import { generateNPCSprite } from './sprites.js';

export const NPC_DATA = [
  {
    col: 64, row: 10,
    variant: 0,
    lines: [
      "Welcome to the Stats Lab!",
      "Luke built tools that make data\naccessible to everyone.",
      "Walk through the door to\nsee the project!",
    ],
  },
  {
    col: 72, row: 10,
    variant: 1,
    lines: [
      "This is the Corpus Explorer!",
      "It generates linguistic profiles\nfrom any text you give it.",
      "Fancy a look? Head inside!",
    ],
  },
  {
    col: 80, row: 10,
    variant: 2,
    lines: [
      "Ah, the Notebook Library!",
      "Each notebook is a mini-paper\non a linguistic dataset.",
      "Enter to browse the collection!",
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
    ctx.drawImage(npc.sprite, npc.x - camX, npc.y - camY);
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
