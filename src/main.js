import { TILE, PAL, CANVAS_W, CANVAS_H, MAP_COLS, MAP_ROWS } from './constants.js';
import { createCanvas } from './canvas.js';
import { initInput, isDown, clearKey } from './input.js';
import { startLoop } from './game-loop.js';
import { generateTileset } from './tileset.js';
import { generatePlayerSprites, generateCatSprite, DIR } from './sprites.js';
import { createPlayer, updatePlayer, renderPlayer, getPlayerTile } from './player.js';
import { renderMap } from './map-renderer.js';
import { updateCamera } from './camera.js';
import { getProjectAtDoor, getMapDoorAt } from './projects.js';
import { showOverlay, hideOverlay, isOverlayVisible } from './overlay.js';
import { createNPCs, renderNPCs, getNearbyNPC } from './npc.js';
import { tiles, isSolid } from './map-data.js';
import { homeTiles, HOME_COLS, HOME_ROWS, isHomeSolid, HOME_EXIT, HOME_SPAWN, HOME_CAT } from './home-map.js';

// ---- State ----
const state = {
  mode: 'title',     // 'title' | 'overworld' | 'overlay' | 'dialogue'
  currentMap: 'overworld',  // 'overworld' | 'home'
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
const { ctx } = createCanvas();
initInput();
const tileset = generateTileset();
const playerSprites = generatePlayerSprites();
const catSprite = generateCatSprite();

// Player starts on the main path in front of his home (col 42, row 11)
state.player = createPlayer(42, 11);
state.npcs = createNPCs();

// Create interior cat NPC
state.interiorNPCs = [{
  x: HOME_CAT.col * TILE,
  y: HOME_CAT.row * TILE,
  sprite: catSprite,
  lines: HOME_CAT.lines,
  lineIndex: 0,
}];

// ---- Helpers ----
function getActiveMapInfo() {
  if (state.currentMap === 'home') {
    return {
      mapTiles: homeTiles,
      mapCols: HOME_COLS,
      mapRows: HOME_ROWS,
      solidFn: isHomeSolid,
      npcs: state.interiorNPCs,
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

// ---- Title screen ----
const titleScreen = document.getElementById('title-screen');

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
      dialogueBox.classList.remove('visible');
      state.mode = 'overworld';
    }
    return;
  }

  // --- Overworld / Interior mode ---
  updatePlayer(state.player, solidFn);
  updateCamera(state, mapCols, mapRows);

  const { col, row } = getPlayerTile(state.player);

  // Check for map-transition doors (e.g. entering home)
  if (state.currentMap === 'overworld') {
    const mapDoor = getMapDoorAt(col, row);
    if (mapDoor) {
      state.pendingMapSwitch = {
        targetMap: mapDoor.targetMap,
        spawnCol: HOME_SPAWN.col,
        spawnRow: HOME_SPAWN.row,
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

  // Check for exit door in interior
  if (state.currentMap === 'home') {
    if (col === HOME_EXIT.col && row === HOME_EXIT.row) {
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
      ctx.fillText('ENTER', sx, sy + 2);
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
