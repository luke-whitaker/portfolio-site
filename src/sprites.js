import { TILE, PAL } from './constants.js';

// Directions
export const DIR = { DOWN: 0, UP: 1, LEFT: 2, RIGHT: 3 };

function makeSprite(draw) {
  const c = document.createElement('canvas');
  c.width = TILE;
  c.height = TILE;
  const x = c.getContext('2d');
  draw(x);
  return c;
}

// Generate player sprite frames: 4 directions x 2 walk frames
export function generatePlayerSprites() {
  const sprites = {};

  function drawBody(c, facing, frame) {
    // Head / skin
    c.fillStyle = PAL.skin;
    c.fillRect(5, 1, 6, 5);

    // Hair
    c.fillStyle = PAL.hair;
    c.fillRect(5, 0, 6, 2);
    if (facing === DIR.DOWN) {
      c.fillRect(5, 0, 1, 3);
      c.fillRect(10, 0, 1, 3);
    } else if (facing === DIR.UP) {
      c.fillRect(5, 0, 6, 3);
    } else if (facing === DIR.LEFT) {
      c.fillRect(5, 0, 2, 4);
    } else {
      c.fillRect(9, 0, 2, 4);
    }

    // Eyes
    c.fillStyle = PAL.darkest;
    if (facing === DIR.DOWN) {
      c.fillRect(6, 3, 1, 1);
      c.fillRect(9, 3, 1, 1);
    } else if (facing === DIR.UP) {
      // back of head — no eyes
    } else if (facing === DIR.LEFT) {
      c.fillRect(6, 3, 1, 1);
    } else {
      c.fillRect(9, 3, 1, 1);
    }

    // Skin shadow
    c.fillStyle = PAL.skinDk;
    if (facing === DIR.DOWN) {
      c.fillRect(5, 5, 6, 1);
    }

    // Shirt (torso)
    c.fillStyle = PAL.shirt;
    c.fillRect(4, 5, 8, 5);
    c.fillStyle = PAL.shirtLt;
    c.fillRect(6, 5, 4, 1);

    // Arms
    c.fillStyle = PAL.shirt;
    if (facing === DIR.LEFT) {
      c.fillRect(3, 5 + frame, 1, 5);
      c.fillRect(12, 6, 1, 4);
    } else if (facing === DIR.RIGHT) {
      c.fillRect(12, 5 + frame, 1, 5);
      c.fillRect(3, 6, 1, 4);
    } else {
      c.fillRect(3, 5 + frame, 1, 5);
      c.fillRect(12, 6 - frame, 1, 5);
    }

    // Hands (skin)
    c.fillStyle = PAL.skin;
    if (facing === DIR.LEFT) {
      c.fillRect(3, 9 + frame, 1, 1);
      c.fillRect(12, 9, 1, 1);
    } else if (facing === DIR.RIGHT) {
      c.fillRect(12, 9 + frame, 1, 1);
      c.fillRect(3, 9, 1, 1);
    } else {
      c.fillRect(3, 9 + frame, 1, 1);
      c.fillRect(12, 10 - frame, 1, 1);
    }

    // Pants
    c.fillStyle = PAL.pants;
    c.fillRect(4, 10, 8, 2);

    // Legs — alternate by frame
    c.fillStyle = PAL.pants;
    const legOffset = frame === 0 ? 0 : 1;
    c.fillRect(5 + legOffset, 12, 2, 3);
    c.fillRect(9 - legOffset, 12, 2, 3);
    // Shoe
    c.fillStyle = PAL.darkest;
    c.fillRect(5 + legOffset, 14, 2, 1);
    c.fillRect(9 - legOffset, 14, 2, 1);
  }

  for (const dir of [DIR.DOWN, DIR.UP, DIR.LEFT, DIR.RIGHT]) {
    sprites[dir] = [];
    for (let frame = 0; frame < 2; frame++) {
      sprites[dir].push(makeSprite(c => drawBody(c, dir, frame)));
    }
  }

  return sprites;
}

// Generate a black cat sprite
export function generateCatSprite() {
  return makeSprite(c => {
    const black = '#1a1a2e';
    const darkGrey = '#2a2a4a';

    // Body
    c.fillStyle = black;
    c.fillRect(3, 7, 10, 5);
    c.fillStyle = darkGrey;
    c.fillRect(5, 8, 6, 3);

    // Head
    c.fillStyle = black;
    c.fillRect(5, 3, 7, 5);
    // Ears
    c.fillRect(5, 1, 2, 3);
    c.fillRect(10, 1, 2, 3);
    c.fillStyle = '#c87828';
    c.fillRect(6, 2, 1, 1);
    c.fillRect(10, 2, 1, 1);

    // Eyes
    c.fillStyle = '#58a848';
    c.fillRect(6, 5, 2, 1);
    c.fillRect(9, 5, 2, 1);
    c.fillStyle = black;
    c.fillRect(7, 5, 1, 1);
    c.fillRect(10, 5, 1, 1);

    // Nose
    c.fillStyle = '#c87878';
    c.fillRect(8, 6, 1, 1);

    // Tail
    c.fillStyle = black;
    c.fillRect(12, 8, 2, 1);
    c.fillRect(13, 7, 2, 1);
    c.fillRect(14, 5, 1, 2);
    c.fillStyle = darkGrey;
    c.fillRect(14, 5, 1, 1);

    // Paws
    c.fillStyle = darkGrey;
    c.fillRect(4, 12, 2, 1);
    c.fillRect(10, 12, 2, 1);
  });
}

// Generate NPC sprite (simpler, static) — each variant has different colours
export function generateNPCSprite(variant) {
  const configs = [
    { shirt: PAL.npc0shirt, hat: PAL.npc0hat },
    { shirt: PAL.npc1shirt, hat: PAL.npc1hat },
    { shirt: PAL.npc2shirt, hat: PAL.npc2hat },
  ];
  const cfg = configs[variant] || configs[0];

  return makeSprite(c => {
    // Head
    c.fillStyle = PAL.skin;
    c.fillRect(5, 2, 6, 5);

    // Hat
    c.fillStyle = cfg.hat;
    c.fillRect(4, 0, 8, 3);
    c.fillRect(3, 2, 10, 1);

    // Eyes
    c.fillStyle = PAL.darkest;
    c.fillRect(6, 4, 1, 1);
    c.fillRect(9, 4, 1, 1);

    // Body
    c.fillStyle = cfg.shirt;
    c.fillRect(4, 6, 8, 5);

    // Arms
    c.fillStyle = cfg.shirt;
    c.fillRect(3, 6, 1, 4);
    c.fillRect(12, 6, 1, 4);
    // Hands
    c.fillStyle = PAL.skin;
    c.fillRect(3, 10, 1, 1);
    c.fillRect(12, 10, 1, 1);

    // Pants
    c.fillStyle = PAL.dark;
    c.fillRect(4, 11, 8, 1);

    // Legs
    c.fillStyle = PAL.dark;
    c.fillRect(5, 12, 2, 3);
    c.fillRect(9, 12, 2, 3);
    // Shoes
    c.fillStyle = PAL.darkest;
    c.fillRect(5, 14, 2, 1);
    c.fillRect(9, 14, 2, 1);
  });
}
