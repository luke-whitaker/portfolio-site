import { TILE, PAL, CANVAS_W, CANVAS_H } from './constants.js';
import { createCanvas } from './canvas.js';
import { initInput, isDown, clearKey } from './input.js';
import { startLoop } from './game-loop.js';
import { generateTileset } from './tileset.js';
import { generatePlayerSprites } from './sprites.js';
import { createPlayer, updatePlayer, renderPlayer, getPlayerTile } from './player.js';
import { renderMap } from './map-renderer.js';
import { updateCamera } from './camera.js';
import { getProjectAtDoor } from './projects.js';
import { showOverlay, hideOverlay, isOverlayVisible } from './overlay.js';
import { createNPCs, renderNPCs, getNearbyNPC } from './npc.js';

// ---- State ----
const state = {
  mode: 'title',     // 'title' | 'overworld' | 'overlay' | 'dialogue'
  player: null,
  camX: 0,
  camY: 0,
  frameTick: 0,
  fade: 0,           // 0 = no fade, 1 = fully black
  fadeDir: 0,        // 1 = fading in to black, -1 = fading out
  pendingProject: null,
  dialogue: null,    // { npc, charIndex, timer }
  npcs: [],
};

// ---- Init ----
const { ctx } = createCanvas();
initInput();
const tileset = generateTileset();
const playerSprites = generatePlayerSprites();

// Player starts on the main path (col 14, row 13)
state.player = createPlayer(14, 13);
state.npcs = createNPCs();

// ---- Dialogue UI elements ----
const dialogueBox = document.getElementById('dialogue-box');
const dialogueText = document.getElementById('dialogue-text');

// ---- Title screen ----
const titleScreen = document.getElementById('title-screen');

// ---- Update ----
function update() {
  state.frameTick++;

  // --- Fade logic ---
  if (state.fadeDir !== 0) {
    state.fade += state.fadeDir * 0.04;
    if (state.fade >= 1) {
      state.fade = 1;
      state.fadeDir = 0;
      // Fade-in complete — show overlay
      if (state.pendingProject) {
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
      //Step player down one tile so they don't re-trigger the door
      state.player.dir = DIR.DOWN; 
      state.player.y += TILE/2;
      state.mode = 'overworld';
      state.fadeDir = -1;  // fade out from black
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
      // If text not done, show all
      if (d.charIndex < fullText.length) {
        d.charIndex = fullText.length;
        dialogueText.textContent = fullText;
      } else {
        // Next line or close
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

  // --- Overworld mode ---
  updatePlayer(state.player);
  updateCamera(state);

  // Check door collision
  const { col, row } = getPlayerTile(state.player);
  const project = getProjectAtDoor(col, row);
  if (project) {
    state.pendingProject = project;
    state.fadeDir = 1;  // fade to black
    state.mode = 'overworld';  // keep until fade completes
  }

  // Check NPC interaction (Enter key)
  if (isDown('Enter')) {
    clearKey('Enter');
    const npc = getNearbyNPC(state.npcs, state.player.x, state.player.y);
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
    // Title handled by HTML overlay
    return;
  }

  // Draw map
  renderMap(ctx, tileset, state.camX, state.camY, state.frameTick);

  // Draw NPCs
  renderNPCs(ctx, state.npcs, state.camX, state.camY);

  // Draw player
  renderPlayer(ctx, state.player, playerSprites, state.camX, state.camY);

  // Draw "ENTER" prompt near NPC
  if (state.mode === 'overworld') {
    const npc = getNearbyNPC(state.npcs, state.player.x, state.player.y);
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

    // Door prompt
    const { col, row } = getPlayerTile(state.player);
    const project = getProjectAtDoor(col, row);
    if (project && state.fadeDir === 0) {
      // Already auto-entering on door step
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
