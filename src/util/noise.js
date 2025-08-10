// Super‑small 2D value "noise" (not true Perlin, but good enough for mask/jitter)
import { seeded } from './seededRng.js';

export function makeValueNoise2D(seed = 1337) {
  const rng = seeded(seed);
  const grid = new Map();
  const key = (x, y) => `${x}|${y}`;
  const g = (x, y) => {
    const k = key(x, y);
    if (!grid.has(k)) grid.set(k, rng());
    return grid.get(k);
  };
  const smooth = t => t * t * (3 - 2 * t);
  const lerp = (a, b, t) => a + (b - a) * t;

  return function noise(x, y) {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = x - xi,       yf = y - yi;
    const v00 = g(xi, yi),   v10 = g(xi + 1, yi);
    const v01 = g(xi, yi+1), v11 = g(xi + 1, yi + 1);
    const u = smooth(xf),    v = smooth(yf);
    return lerp(lerp(v00, v10, u), lerp(v01, v11, u), v);
  };
}
