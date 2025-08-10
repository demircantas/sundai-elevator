// SceneObjectSync: keeps SceneConcept and ObjectConcept in sync
export class SceneObjectSync {
  constructor(sceneConcept, objectConcept) {
    this.sceneConcept = sceneConcept;
    this.objectConcept = objectConcept;
  }
  addObjectToScene({ objectProps }) {
    const { object } = this.objectConcept.create({ object: objectProps });
    this.sceneConcept.objects.push(object);
    return { scene: this.sceneConcept, object };
  }
  removeObjectFromScene({ object }) {
    this.sceneConcept.objects = this.sceneConcept.objects.filter(o => o !== object);
    return { scene: this.sceneConcept };
  }
}
