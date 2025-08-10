// SceneInterpolator.js
// Interpolates between two scene recipes (arrays of objects with matching order/types)
import { SceneFactory } from '../ParametricObject.js';

export class SceneInterpolator {
  static lerp(a, b, t) {
    return a + (b - a) * t;
  }

  static lerpArray(a, b, t) {
    return a.map((v, i) => SceneInterpolator.lerp(v, b[i], t));
  }

  static lerpColor(c1, c2, t) {
    const r1 = (c1 >> 16) & 0xff, g1 = (c1 >> 8) & 0xff, b1 = c1 & 0xff;
    const r2 = (c2 >> 16) & 0xff, g2 = (c2 >> 8) & 0xff, b2 = c2 & 0xff;
    const r = Math.round(SceneInterpolator.lerp(r1, r2, t));
    const g = Math.round(SceneInterpolator.lerp(g1, g2, t));
    const b = Math.round(SceneInterpolator.lerp(b1, b2, t));
    return (r << 16) | (g << 8) | b;
  }

  static interpolateRecipes(recipeA, recipeB, t) {
    // Assumes both have the same structure and number of children
    function interpObj(objA, objB) {
      const type = objA.type;
      const size = SceneInterpolator.lerpArray(objA.size, objB.size, t);
      const position = SceneInterpolator.lerpArray(objA.position, objB.position, t);
      const color = SceneInterpolator.lerpColor(objA.color, objB.color, t);
      const rotation = SceneInterpolator.lerpArray(objA.rotation || [0,0,0], objB.rotation || [0,0,0], t);
      const scale = SceneInterpolator.lerpArray(objA.scale || [1,1,1], objB.scale || [1,1,1], t);
      let children = [];
      if (objA.children && objB.children && objA.children.length === objB.children.length) {
        children = objA.children.map((childA, i) => interpObj(childA, objB.children[i]));
      }
      return { type, size, position, color, rotation, scale, children };
    }
    return interpObj(recipeA, recipeB);
  }

  static createInterpolatedScene(recipeA, recipeB, t) {
    const interpRecipe = SceneInterpolator.interpolateRecipes(recipeA, recipeB, t);
    return SceneFactory.createFromRecipe(interpRecipe);
  }
}
