export class Controls {
    constructor(renderer, camera) {
        this.renderer = renderer;
        this.camera = camera;
        this.keys = {};
        this.yaw = 0;
        this.pitch = 0;
        this.isPointerLocked = false;
        this.speed = 0.1;
        this.lookSpeed = 0.002;

        document.addEventListener('keydown', e => { this.keys[e.key.toLowerCase()] = true; });
        document.addEventListener('keyup', e => { this.keys[e.key.toLowerCase()] = false; });

        renderer.domElement.addEventListener('click', () => {
            renderer.domElement.requestPointerLock();
        });

        document.addEventListener('pointerlockchange', () => {
            this.isPointerLocked = document.pointerLockElement === renderer.domElement;
        });

        document.addEventListener('mousemove', (event) => {
            if (!this.isPointerLocked) return;
            this.yaw -= event.movementX * this.lookSpeed;
            this.pitch -= event.movementY * this.lookSpeed;
            this.pitch = Math.max(-Math.PI/2, Math.min(Math.PI/2, this.pitch));
        });
    }

    update() {
        let forward = 0, right = 0;
        if (this.keys['w']) forward -= 1;
        if (this.keys['s']) forward += 1;
        if (this.keys['a']) right -= 1;
        if (this.keys['d']) right += 1;

        const direction = new THREE.Vector3();
        direction.x = Math.sin(this.yaw) * forward + Math.cos(this.yaw) * right;
        direction.z = Math.cos(this.yaw) * forward - Math.sin(this.yaw) * right;
        direction.normalize();

        this.camera.position.x += direction.x * this.speed;
        this.camera.position.z += direction.z * this.speed;
        this.camera.rotation.order = 'YXZ';
        this.camera.rotation.y = this.yaw;
        this.camera.rotation.x = this.pitch;
    }
}
