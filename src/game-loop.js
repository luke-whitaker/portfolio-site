import { TICK_RATE } from './constants.js';

export function startLoop(update, render) {
  let prev = performance.now();
  let acc = 0;

  function frame(now) {
    acc += now - prev;
    prev = now;

    // Cap accumulator to avoid spiral of death
    if (acc > 200) acc = 200;

    while (acc >= TICK_RATE) {
      update();
      acc -= TICK_RATE;
    }

    render();
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}
