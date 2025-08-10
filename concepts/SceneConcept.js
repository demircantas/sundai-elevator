// SceneConcept: represents a 3D environment with a set of objects and their properties
export class SceneConcept {
  constructor() {
    this.objects = [];
    this.background = 0x000000;
    this.lighting = [];
  }
  load({ objects }) {
    this.objects = objects;
    return { scene: this };
  }
  update({ objects }) {
    this.objects = objects;
    return { scene: this };
  }
  reset() {
    this.objects = [];
    return { scene: this };
  }
  interpolate({ sceneA, sceneB, t }) {
    this.objects = sceneA.objects.map((objA, i) => {
      const objB = sceneB.objects[i];
      if (!objB) return objA;
      return {
        ...objA,
        position: objA.position.map((a, j) => a + (objB.position[j] - a) * t),
        color: objA.color + (objB.color - objA.color) * t
      };
    });
    return { scene: this };
  }
}
