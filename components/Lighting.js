export class Lighting {
    constructor(scene) {
        this.scene = scene;
        this.add();
    }

    add() {
        // Stronger ambient and hemisphere light for full color visibility
        const ambient = new THREE.AmbientLight(0xffffff, 1.2);
        this.scene.add(ambient);
        // Brighter sky and ground colors for hemisphere light
        const hemi = new THREE.HemisphereLight(0xffffbb, 0x444466, 1.0);
        this.scene.add(hemi);
    }
}
