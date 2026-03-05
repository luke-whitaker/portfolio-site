import { TILE, PLAYER_SPEED, PLAYER_W, PLAYER_H, PLAYER_OFFSET_X, PLAYER_OFFSET_Y, ANIM_FRAME_TICKS } from './constants.js';
import { isDown } from './input.js';
import { DIR } from './sprites.js';

export function createPlayer(tileCol, tileRow) {
  return {
    x: tileCol * TILE,
    y: tileRow * TILE,
    dir: DIR.DOWN,
    frame: 0,
    animTimer: 0,
    moving: false,
  };
}

export function updatePlayer(player, solidFn) {
  let dx = 0;
  let dy = 0;

  if (isDown('ArrowLeft')  || isDown('KeyA')) dx -= PLAYER_SPEED;
  if (isDown('ArrowRight') || isDown('KeyD')) dx += PLAYER_SPEED;
  if (isDown('ArrowUp')    || isDown('KeyW')) dy -= PLAYER_SPEED;
  if (isDown('ArrowDown')  || isDown('KeyS')) dy += PLAYER_SPEED;

  // Diagonal normalisation
  if (dx !== 0 && dy !== 0) {
    const f = PLAYER_SPEED / Math.sqrt(dx * dx + dy * dy);
    dx *= f;
    dy *= f;
  }

  player.moving = dx !== 0 || dy !== 0;

  // Facing direction
  if (dy < 0) player.dir = DIR.UP;
  else if (dy > 0) player.dir = DIR.DOWN;
  if (dx < 0) player.dir = DIR.LEFT;
  else if (dx > 0) player.dir = DIR.RIGHT;

  // Per-axis collision — move X first, then Y
  if (dx !== 0) {
    const newX = player.x + dx;
    if (!collidesAt(newX, player.y, solidFn)) {
      player.x = newX;
    }
  }

  if (dy !== 0) {
    const newY = player.y + dy;
    if (!collidesAt(player.x, newY, solidFn)) {
      player.y = newY;
    }
  }

  // Walk animation
  if (player.moving) {
    player.animTimer++;
    if (player.animTimer >= ANIM_FRAME_TICKS) {
      player.animTimer = 0;
      player.frame = (player.frame + 1) % 2;
    }
  } else {
    player.frame = 0;
    player.animTimer = 0;
  }
}

function collidesAt(x, y, solidFn) {
  const left   = x + PLAYER_OFFSET_X;
  const right  = x + PLAYER_OFFSET_X + PLAYER_W - 1;
  const top    = y + PLAYER_OFFSET_Y;
  const bottom = y + PLAYER_OFFSET_Y + PLAYER_H - 1;

  const c1 = Math.floor(left / TILE);
  const c2 = Math.floor(right / TILE);
  const r1 = Math.floor(top / TILE);
  const r2 = Math.floor(bottom / TILE);

  return solidFn(c1, r1) || solidFn(c2, r1) || solidFn(c1, r2) || solidFn(c2, r2);
}

export function renderPlayer(ctx, player, sprites, camX, camY) {
  const sprite = sprites[player.dir][player.frame];
  ctx.drawImage(sprite, Math.round(player.x - camX), Math.round(player.y - camY));
}

// Get the tile the player is standing on (centre of hitbox)
export function getPlayerTile(player) {
  const cx = player.x + PLAYER_OFFSET_X + PLAYER_W / 2;
  const cy = player.y + PLAYER_OFFSET_Y + PLAYER_H / 2;
  return { col: Math.floor(cx / TILE), row: Math.floor(cy / TILE) };
}
