export class Renderer extends THREE.WebGLRenderer {
    constructor() {
        super({ antialias: true });
        this.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.domElement);
    }
}
