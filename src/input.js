const keys = {};

export function initInput() {
  window.addEventListener('keydown', e => { keys[e.code] = true; });
  window.addEventListener('keyup',   e => { keys[e.code] = false; });
}

export function isDown(code) {
  return !!keys[code];
}

export function clearKey(code) {
  keys[code] = false;
}
