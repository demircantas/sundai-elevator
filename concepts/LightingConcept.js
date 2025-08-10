// LightingConcept: manages scene lighting
export class LightingConcept {
  constructor() {
    this.lights = [];
  }
  addLight({ light }) {
    this.lights.push(light);
    return { lighting: this };
  }
  updateLight({ light }) {
    return { lighting: this };
  }
  removeLight({ light }) {
    this.lights = this.lights.filter(l => l !== light);
    return { lighting: this };
  }
}
