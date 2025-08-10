// PlayerConcept: represents the user/player in the scene
export class PlayerConcept {
  constructor() {
    this.position = [0,0,0];
    this.camera = {};
    this.controls = {};
  }
  move({ position }) {
    this.position = position;
    return { player: this };
  }
  enterElevator() {
    return { player: this };
  }
  exitElevator() {
    return { player: this };
  }
  setPosition({ position }) {
    this.position = position;
    return { player: this };
  }
}
