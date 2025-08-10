// ElevatorConcept: represents the elevator and its state
export class ElevatorConcept {
  constructor() {
    this.position = 0;
    this.targetPosition = 0;
    this.direction = 1;
    this.moving = false;
    this.playerInElevator = false;
  }
  move({ target }) {
    this.targetPosition = target;
    this.moving = true;
    return { elevator: this };
  }
  start() {
    this.moving = true;
    return { elevator: this };
  }
  stop() {
    this.moving = false;
    return { elevator: this };
  }
  setTarget({ target }) {
    this.targetPosition = target;
    return { elevator: this };
  }
  setDirection({ direction }) {
    this.direction = direction;
    return { elevator: this };
  }
}
