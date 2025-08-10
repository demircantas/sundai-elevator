// ElevatorPlayerSync: synchronizes ElevatorConcept and PlayerConcept
export class ElevatorPlayerSync {
  constructor(elevatorConcept, playerConcept) {
    this.elevatorConcept = elevatorConcept;
    this.playerConcept = playerConcept;
  }
  playerEntersElevator() {
    this.elevatorConcept.playerInElevator = true;
    return { elevator: this.elevatorConcept, player: this.playerConcept };
  }
  playerExitsElevator() {
    this.elevatorConcept.playerInElevator = false;
    return { elevator: this.elevatorConcept, player: this.playerConcept };
  }
}
