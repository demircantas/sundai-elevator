// ObjectConcept: represents a single 3D object and its properties
export class ObjectConcept {
  constructor(props) {
    this.type = props.type;
    this.size = props.size;
    this.position = props.position;
    this.rotation = props.rotation;
    this.scale = props.scale;
    this.color = props.color;
    this.parent = props.parent;
    this.children = props.children;
  }
  create({ object }) {
    return { object: new ObjectConcept(object) };
  }
  update({ object, props }) {
    Object.assign(object, props);
    return { object };
  }
  delete({ object }) {
    return { object: null };
  }
  interpolate({ objectA, objectB, t }) {
    const interp = { ...objectA };
    interp.position = objectA.position.map((a, j) => a + (objectB.position[j] - a) * t);
    interp.color = objectA.color + (objectB.color - objectA.color) * t;
    return { object: interp };
  }
}
