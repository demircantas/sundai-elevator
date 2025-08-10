// LightingShadingSync: synchronizes LightingConcept and ShadingConcept
export class LightingShadingSync {
  constructor(lightingConcept, shadingConcept) {
    this.lightingConcept = lightingConcept;
    this.shadingConcept = shadingConcept;
  }
  updateShadingWithLighting() {
    if (this.lightingConcept.lights.length > 0) {
      this.shadingConcept.setMode({ mode: 'lit' });
    } else {
      this.shadingConcept.setMode({ mode: 'unlit' });
    }
    return { shading: this.shadingConcept };
  }
}
