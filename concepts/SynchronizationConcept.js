// SynchronizationConcept: declaratively synchronizes actions between concepts
export class SynchronizationConcept {
  constructor() {
    this.synchronizations = [];
  }
  register({ rule }) {
    this.synchronizations.push(rule);
    return { sync: this };
  }
  trigger({ action }) {
    return { sync: this };
  }
  update({ rule }) {
    return { sync: this };
  }
}
