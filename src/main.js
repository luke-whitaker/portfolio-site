import { TILE, PAL, CANVAS_W, CANVAS_H, MAP_COLS, MAP_ROWS } from './constants.js';
import { createCanvas } from './canvas.js';
import { initInput, isDown, clearKey, pressKey, isTouchDevice } from './input.js';
import { startLoop } from './game-loop.js';
import { generateTileset } from './tileset.js';
import { generatePlayerSprites, generateCatSprite, generateFemaleNPCSprite, generateDevLabNPCSprite, DIR } from './sprites.js';
import { createPlayer, updatePlayer, renderPlayer, getPlayerTile } from './player.js';
import { renderMap } from './map-renderer.js';
import { updateCamera } from './camera.js';
import { getProjectAtDoor, getMapDoorAt } from './projects.js';
import { showOverlay, hideOverlay, isOverlayVisible } from './overlay.js';
import { createNPCs, renderNPCs, getNearbyNPC } from './npc.js';
import { tiles, isSolid } from './map-data.js';
import { homeTiles, HOME_COLS, HOME_ROWS, isHomeSolid, HOME_EXIT, HOME_SPAWN, HOME_CAT, HOME_DESK } from './home-map.js';
import {
  statsLabTiles, lingLabTiles, devLabTiles,
  LAB_COLS, LAB_ROWS,
  isStatsLabSolid, isLingLabSolid, isDevLabSolid,
  STATS_LAB_EXIT, STATS_LAB_SPAWN, STATS_LAB_CAT, STATS_LAB_NPC, STATS_LAB_COMPUTER,
  LING_LAB_EXIT, LING_LAB_SPAWN, LING_LAB_CAT, LING_LAB_NPC, LING_LAB_POSTER_1, LING_LAB_POSTER_2,
  DEV_LAB_EXIT, DEV_LAB_SPAWN, DEV_LAB_CAT, DEV_LAB_NPC, DEV_LAB_COMPUTER,
} from './lab-maps.js';

// ---- State ----
const state = {
  mode: 'title',     // 'title' | 'overworld' | 'overlay' | 'dialogue'
  currentMap: 'overworld',  // 'overworld' | 'home' | 'stats-lab' | 'ling-lab' | 'dev-lab'
  player: null,
  camX: 0,
  camY: 0,
  frameTick: 0,
  fade: 0,           // 0 = no fade, 1 = fully black
  fadeDir: 0,        // 1 = fading in to black, -1 = fading out
  pendingProject: null,
  pendingMapSwitch: null,  // { targetMap, spawnCol, spawnRow, returnData }
  overworldReturn: null,   // saved { x, y, dir } when entering interior
  dialogue: null,    // { npc, charIndex, timer }
  npcs: [],
  interiorNPCs: [],
};

// ---- Init ----
const { canvas, ctx } = createCanvas();
initInput();
const tileset = generateTileset();
const playerSprites = generatePlayerSprites();
const catSprite = generateCatSprite();
const femaleSprite0 = generateFemaleNPCSprite(0);
const femaleSprite1 = generateFemaleNPCSprite(1);
const devLabNPCSprite = generateDevLabNPCSprite();

// Player starts on the main path in front of his home (col 42, row 11)
state.player = createPlayer(42, 11);
state.npcs = createNPCs();

// Create interior NPCs: cat + desk (home)
state.interiorNPCs = [
  {
    x: HOME_CAT.col * TILE,
    y: HOME_CAT.row * TILE,
    sprite: catSprite,
    lines: HOME_CAT.lines,
    lineIndex: 0,
  },
  {
    x: HOME_DESK.col * TILE,
    y: HOME_DESK.row * TILE,
    sprite: null,
    lines: HOME_DESK.lines,
    link: HOME_DESK.link,
    lineIndex: 0,
  },
];

// Stats Lab interior NPCs
state.statsLabNPCs = [
  {
    x: STATS_LAB_CAT.col * TILE,
    y: STATS_LAB_CAT.row * TILE,
    sprite: catSprite,
    lines: STATS_LAB_CAT.lines,
    lineIndex: 0,
  },
  {
    x: STATS_LAB_NPC.col * TILE,
    y: STATS_LAB_NPC.row * TILE,
    sprite: femaleSprite0,
    lines: STATS_LAB_NPC.lines,
    lineIndex: 0,
  },
  {
    x: STATS_LAB_COMPUTER.col * TILE,
    y: STATS_LAB_COMPUTER.row * TILE,
    sprite: null,
    lines: STATS_LAB_COMPUTER.lines,
    link: STATS_LAB_COMPUTER.link,
    lineIndex: 0,
  },
];

// Ling Lab interior NPCs
state.lingLabNPCs = [
  {
    x: LING_LAB_CAT.col * TILE,
    y: LING_LAB_CAT.row * TILE,
    sprite: catSprite,
    lines: LING_LAB_CAT.lines,
    lineIndex: 0,
  },
  {
    x: LING_LAB_NPC.col * TILE,
    y: LING_LAB_NPC.row * TILE,
    sprite: femaleSprite1,
    lines: LING_LAB_NPC.lines,
    lineIndex: 0,
  },
  {
    x: LING_LAB_POSTER_1.col * TILE,
    y: LING_LAB_POSTER_1.row * TILE,
    sprite: null,
    lines: LING_LAB_POSTER_1.lines,
    link: LING_LAB_POSTER_1.link,
    lineIndex: 0,
  },
  {
    x: LING_LAB_POSTER_2.col * TILE,
    y: LING_LAB_POSTER_2.row * TILE,
    sprite: null,
    lines: LING_LAB_POSTER_2.lines,
    link: LING_LAB_POSTER_2.link,
    lineIndex: 0,
  },
];

// Dev Lab interior NPCs
state.devLabNPCs = [
  {
    x: DEV_LAB_CAT.col * TILE,
    y: DEV_LAB_CAT.row * TILE,
    sprite: catSprite,
    lines: DEV_LAB_CAT.lines,
    lineIndex: 0,
  },
  {
    x: DEV_LAB_NPC.col * TILE,
    y: DEV_LAB_NPC.row * TILE,
    sprite: devLabNPCSprite,
    lines: DEV_LAB_NPC.lines,
    lineIndex: 0,
  },
  {
    x: DEV_LAB_COMPUTER.col * TILE,
    y: DEV_LAB_COMPUTER.row * TILE,
    sprite: null,
    lines: DEV_LAB_COMPUTER.lines,
    links: DEV_LAB_COMPUTER.links,
    lineIndex: 0,
  },
];

// ---- Helpers ----
// Interior map configs keyed by map name
const INTERIOR_MAPS = {
  home: {
    tiles: homeTiles, cols: HOME_COLS, rows: HOME_ROWS,
    solidFn: isHomeSolid, exit: HOME_EXIT, spawn: HOME_SPAWN,
    getNPCs: () => state.interiorNPCs,
  },
  'stats-lab': {
    tiles: statsLabTiles, cols: LAB_COLS, rows: LAB_ROWS,
    solidFn: isStatsLabSolid, exit: STATS_LAB_EXIT, spawn: STATS_LAB_SPAWN,
    getNPCs: () => state.statsLabNPCs,
  },
  'ling-lab': {
    tiles: lingLabTiles, cols: LAB_COLS, rows: LAB_ROWS,
    solidFn: isLingLabSolid, exit: LING_LAB_EXIT, spawn: LING_LAB_SPAWN,
    getNPCs: () => state.lingLabNPCs,
  },
  'dev-lab': {
    tiles: devLabTiles, cols: LAB_COLS, rows: LAB_ROWS,
    solidFn: isDevLabSolid, exit: DEV_LAB_EXIT, spawn: DEV_LAB_SPAWN,
    getNPCs: () => state.devLabNPCs,
  },
};

function getActiveMapInfo() {
  const interior = INTERIOR_MAPS[state.currentMap];
  if (interior) {
    return {
      mapTiles: interior.tiles,
      mapCols: interior.cols,
      mapRows: interior.rows,
      solidFn: interior.solidFn,
      npcs: interior.getNPCs(),
    };
  }
  return {
    mapTiles: tiles,
    mapCols: MAP_COLS,
    mapRows: MAP_ROWS,
    solidFn: isSolid,
    npcs: state.npcs,
  };
}

// ---- Dialogue UI elements ----
const dialogueBox = document.getElementById('dialogue-box');
const dialogueText = document.getElementById('dialogue-text');
const dialogueLink = document.getElementById('dialogue-link');

// ---- Title screen ----
const titleScreen = document.getElementById('title-screen');

// ---- Mobile: update hint text and wire up tap handlers ----
if (isTouchDevice) {
  document.getElementById('start-hint').textContent = 'Tap to start';
  document.getElementById('dialogue-hint').textContent = 'TAP to continue';
  document.getElementById('overlay-hint').textContent = 'Tap outside to return';
}

// Overlay backdrop tap → close
const overlayBackdrop = document.getElementById('overlay');
overlayBackdrop.addEventListener('click', e => {
  if (e.target === overlayBackdrop && state.mode === 'overlay') {
    hideOverlay();
    state.player.dir = DIR.DOWN;
    state.player.y += TILE;
    state.mode = 'overworld';
    state.fadeDir = -1;
    state.fade = 1;
  }
});

// Canvas / title screen tap → press Enter (advances dialogue, starts game)
canvas.addEventListener('click', () => pressKey('Enter'));
titleScreen.addEventListener('click', () => pressKey('Enter'));

// ---- Update ----
function update() {
  state.frameTick++;

  const { mapCols, mapRows, solidFn, npcs } = getActiveMapInfo();

  // --- Fade logic ---
  if (state.fadeDir !== 0) {
    state.fade += state.fadeDir * 0.04;
    if (state.fade >= 1) {
      state.fade = 1;
      state.fadeDir = 0;

      // Fade-to-black complete — perform pending action
      if (state.pendingMapSwitch) {
        const sw = state.pendingMapSwitch;
        state.pendingMapSwitch = null;

        if (sw.targetMap === 'overworld') {
          // Returning to overworld
          state.currentMap = 'overworld';
          if (state.overworldReturn) {
            state.player.x = state.overworldReturn.x;
            state.player.y = state.overworldReturn.y;
            state.player.dir = DIR.DOWN;
            state.player.y += TILE; // step away from door
            state.overworldReturn = null;
          }
        } else {
          // Entering interior
          state.overworldReturn = {
            x: state.player.x,
            y: state.player.y,
            dir: state.player.dir,
          };
          state.currentMap = sw.targetMap;
          state.player.x = sw.spawnCol * TILE;
          state.player.y = sw.spawnRow * TILE;
          state.player.dir = DIR.UP;
        }

        // Fade back out
        state.fadeDir = -1;
      } else if (state.pendingProject) {
        showOverlay(state.pendingProject);
        state.mode = 'overlay';
        state.pendingProject = null;
      }
    } else if (state.fade <= 0) {
      state.fade = 0;
      state.fadeDir = 0;
    }
    return;
  }

  // --- Title screen ---
  if (state.mode === 'title') {
    if (isDown('Enter') || isDown('Space')) {
      clearKey('Enter');
      clearKey('Space');
      titleScreen.classList.add('hidden');
      state.mode = 'overworld';
    }
    return;
  }

  // --- Overlay mode ---
  if (state.mode === 'overlay') {
    if (isDown('Escape')) {
      clearKey('Escape');
      hideOverlay();
      // Turn around and step player down a tile away from the door
      state.player.dir = DIR.DOWN;
      state.player.y += TILE;
      state.mode = 'overworld';
      state.fadeDir = -1;
      state.fade = 1;
    }
    return;
  }

  // --- Dialogue mode ---
  if (state.mode === 'dialogue') {
    const d = state.dialogue;
    // Typewriter effect
    const fullText = d.npc.lines[d.npc.lineIndex];
    if (d.charIndex < fullText.length) {
      d.timer++;
      if (d.timer % 2 === 0) {
        d.charIndex++;
        dialogueText.textContent = fullText.substring(0, d.charIndex);
      }
    }

    // Show link once text is fully typed — supports per-page links array or single link on last page
    const isLastLine = d.npc.lineIndex === d.npc.lines.length - 1;
    const pageLink = d.npc.links
      ? d.npc.links[d.npc.lineIndex]
      : (d.npc.link && isLastLine ? d.npc.link : null);
    if (pageLink && d.charIndex >= fullText.length) {
      dialogueLink.href = pageLink;
      dialogueLink.classList.remove('hidden');
    } else {
      dialogueLink.classList.add('hidden');
      dialogueLink.href = '#';
    }

    if (isDown('Enter') || isDown('Space')) {
      clearKey('Enter');
      clearKey('Space');
      if (d.charIndex < fullText.length) {
        d.charIndex = fullText.length;
        dialogueText.textContent = fullText;
      } else {
        d.npc.lineIndex++;
        if (d.npc.lineIndex >= d.npc.lines.length) {
          d.npc.lineIndex = 0;
          state.dialogue = null;
          dialogueLink.classList.add('hidden');
          dialogueLink.href = '#';
          dialogueBox.classList.remove('visible');
          state.mode = 'overworld';
        } else {
          d.charIndex = 0;
          d.timer = 0;
          dialogueText.textContent = '';
        }
      }
    }

    if (isDown('Escape')) {
      clearKey('Escape');
      state.dialogue.npc.lineIndex = 0;
      state.dialogue = null;
      dialogueLink.classList.add('hidden');
      dialogueLink.href = '#';
      dialogueBox.classList.remove('visible');
      state.mode = 'overworld';
    }
    return;
  }

  // --- Overworld / Interior mode ---
  updatePlayer(state.player, solidFn);
  updateCamera(state, mapCols, mapRows);

  const { col, row } = getPlayerTile(state.player);

  // Check for map-transition doors (e.g. entering home or labs)
  if (state.currentMap === 'overworld') {
    const mapDoor = getMapDoorAt(col, row);
    if (mapDoor) {
      const interior = INTERIOR_MAPS[mapDoor.targetMap];
      state.pendingMapSwitch = {
        targetMap: mapDoor.targetMap,
        spawnCol: interior.spawn.col,
        spawnRow: interior.spawn.row,
      };
      state.fadeDir = 1;
      return;
    }

    // Check project door collision
    const project = getProjectAtDoor(col, row);
    if (project) {
      state.pendingProject = project;
      state.fadeDir = 1;
    }
  }

  // Check for exit door in any interior
  const interior = INTERIOR_MAPS[state.currentMap];
  if (interior) {
    if (col === interior.exit.col && row === interior.exit.row) {
      state.pendingMapSwitch = { targetMap: 'overworld' };
      state.fadeDir = 1;
      return;
    }
  }

  // Check NPC interaction (Enter key)
  if (isDown('Enter')) {
    clearKey('Enter');
    const npc = getNearbyNPC(npcs, state.player.x, state.player.y);
    if (npc) {
      state.mode = 'dialogue';
      state.dialogue = { npc, charIndex: 0, timer: 0 };
      dialogueBox.classList.add('visible');
      dialogueText.textContent = '';
    }
  }
}

// ---- Render ----
function render() {
  // Clear
  ctx.fillStyle = PAL.darkest;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  if (state.mode === 'title') {
    return;
  }

  const { mapTiles, mapCols, mapRows, npcs } = getActiveMapInfo();

  // Draw map
  renderMap(ctx, tileset, state.camX, state.camY, state.frameTick, mapTiles, mapCols, mapRows);

  // Draw NPCs
  renderNPCs(ctx, npcs, state.camX, state.camY);

  // Draw player
  renderPlayer(ctx, state.player, playerSprites, state.camX, state.camY);

  // Draw "ENTER" prompt near NPC
  if (state.mode === 'overworld') {
    const npc = getNearbyNPC(npcs, state.player.x, state.player.y);
    if (npc) {
      const sx = npc.x + TILE / 2 - state.camX;
      const sy = npc.y - 6 - state.camY;
      ctx.fillStyle = PAL.uiBg;
      ctx.fillRect(sx - 18, sy - 6, 36, 10);
      ctx.fillStyle = PAL.uiText;
      ctx.font = '7px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(isTouchDevice ? 'TAP' : 'ENTER', sx, sy + 2);
      ctx.textAlign = 'start';
    }
  }

  // Fade overlay
  if (state.fade > 0) {
    ctx.fillStyle = `rgba(26, 26, 46, ${state.fade})`;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
  }
}

// ---- Start ----
startLoop(update, render);
