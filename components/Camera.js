export class Camera extends THREE.PerspectiveCamera {
    constructor() {
        super(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.position.set(0, 1.6, 5);
    }
}
