const keys = {};

export const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

export function initInput() {
  window.addEventListener('keydown', e => { keys[e.code] = true; });
  window.addEventListener('keyup',   e => { keys[e.code] = false; });

  // D-pad touch controls — map button IDs to key codes
  const dpadMap = {
    'btn-up':      'ArrowUp',
    'btn-down':    'ArrowDown',
    'btn-left':    'ArrowLeft',
    'btn-right':   'ArrowRight',
    'btn-interact':'Enter',
  };

  for (const [id, code] of Object.entries(dpadMap)) {
    const btn = document.getElementById(id);
    if (!btn) continue;
    btn.addEventListener('touchstart',  e => { e.preventDefault(); keys[code] = true; },  { passive: false });
    btn.addEventListener('touchend',    e => { e.preventDefault(); keys[code] = false; }, { passive: false });
    btn.addEventListener('touchcancel', () => { keys[code] = false; });
  }
}

export function isDown(code) {
  return !!keys[code];
}

export function clearKey(code) {
  keys[code] = false;
}

export function pressKey(code) {
  keys[code] = true;
}
