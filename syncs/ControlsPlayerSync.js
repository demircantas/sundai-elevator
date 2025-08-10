// ControlsPlayerSync: synchronizes ControlsConcept and PlayerConcept
export class ControlsPlayerSync {
  constructor(controlsConcept, playerConcept) {
    this.controlsConcept = controlsConcept;
    this.playerConcept = playerConcept;
  }
  updatePlayerFromControls({ params }) {
    this.playerConcept.setPosition({ position: params.position });
    return { player: this.playerConcept };
  }
  setControlsMode({ mode }) {
    this.controlsConcept.setMode({ mode });
    return { controls: this.controlsConcept };
  }
}
