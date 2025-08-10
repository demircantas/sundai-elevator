// SceneInterpolator.js
// Interpolates between two scene recipes (arrays of objects with matching order/types)
import { createParametricObject } from '../ParametricObject.js';

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function lerpArray(a, b, t) {
  return a.map((v, i) => lerp(v, b[i], t));
}

function lerpColor(c1, c2, t) {
  // c1, c2 are numbers (hex)
  const r1 = (c1 >> 16) & 0xff, g1 = (c1 >> 8) & 0xff, b1 = c1 & 0xff;
  const r2 = (c2 >> 16) & 0xff, g2 = (c2 >> 8) & 0xff, b2 = c2 & 0xff;
  const r = Math.round(lerp(r1, r2, t));
  const g = Math.round(lerp(g1, g2, t));
  const b = Math.round(lerp(b1, b2, t));
  return (r << 16) | (g << 8) | b;
}

export function interpolateRecipes(recipeA, recipeB, t) {
  // Assumes both have the same structure and number of children
  function interpObj(objA, objB) {
    const type = objA.type;
    const size = lerpArray(objA.size, objB.size, t);
    const position = lerpArray(objA.position, objB.position, t);
    const color = lerpColor(objA.color, objB.color, t);
    let children = [];
    if (objA.children && objB.children && objA.children.length === objB.children.length) {
      children = objA.children.map((childA, i) => interpObj(childA, objB.children[i]));
    }
    return { type, size, position, color, children };
  }
  return interpObj(recipeA, recipeB);
}

export function createInterpolatedScene(recipeA, recipeB, t) {
  const interpRecipe = interpolateRecipes(recipeA, recipeB, t);
  return createParametricObject(interpRecipe);
}
