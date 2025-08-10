// SceneInterpolationSync: synchronizes SceneConcept and InterpolationConcept
export class SceneInterpolationSync {
  constructor(sceneConcept, interpolationConcept) {
    this.sceneConcept = sceneConcept;
    this.interpolationConcept = interpolationConcept;
  }
  interpolateScenes({ sceneA, sceneB, t }) {
    const { scene } = this.sceneConcept.interpolate({ sceneA, sceneB, t });
    return { scene };
  }
}
