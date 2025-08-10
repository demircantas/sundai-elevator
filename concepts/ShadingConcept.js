// ShadingConcept: manages the shading mode and updates materials
export class ShadingConcept {
  constructor() {
    this.shadingMode = 'unlit';
    this.materialProps = {};
  }
  toggle() {
    this.shadingMode = this.shadingMode === 'unlit' ? 'lit' : 'unlit';
    return { shading: this };
  }
  setMode({ mode }) {
    this.shadingMode = mode;
    return { shading: this };
  }
  updateMaterials({ props }) {
    this.materialProps = props;
    return { shading: this };
  }
}
