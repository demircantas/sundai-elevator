// InterpolationConcept: handles smooth transitions between two scenes or object states
export class InterpolationConcept {
  constructor() {
    this.t = 0;
    this.source = null;
    this.target = null;
  }
  interpolate({ source, target, t }) {
    this.t = t;
    this.source = source;
    this.target = target;
    return { object: { ...source, t } };
  }
  setT({ t }) {
    this.t = t;
    return { interpolation: this };
  }
  start() {
    return { interpolation: this };
  }
  stop() {
    return { interpolation: this };
  }
}
