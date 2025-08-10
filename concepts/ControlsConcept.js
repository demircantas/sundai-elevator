// ControlsConcept: handles user input and camera controls
export class ControlsConcept {
  constructor() {
    this.mode = 'default';
    this.enabled = true;
    this.params = {};
  }
  enable() {
    this.enabled = true;
    return { controls: this };
  }
  disable() {
    this.enabled = false;
    return { controls: this };
  }
  update({ params }) {
    this.params = params;
    return { controls: this };
  }
  setMode({ mode }) {
    this.mode = mode;
    return { controls: this };
  }
}
