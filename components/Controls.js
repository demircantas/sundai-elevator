export function setupControls(renderer, camera) {
    const keys = {};
    let yaw = 0, pitch = 0;
    let isPointerLocked = false;
    const speed = 0.1;
    const lookSpeed = 0.002;

    document.addEventListener('keydown', (e) => { keys[e.key.toLowerCase()] = true; });
    document.addEventListener('keyup', (e) => { keys[e.key.toLowerCase()] = false; });

    renderer.domElement.addEventListener('click', () => {
        renderer.domElement.requestPointerLock();
    });

    document.addEventListener('pointerlockchange', () => {
        isPointerLocked = document.pointerLockElement === renderer.domElement;
    });

    document.addEventListener('mousemove', (event) => {
        if (!isPointerLocked) return;
        yaw -= event.movementX * lookSpeed;
        pitch -= event.movementY * lookSpeed;
        pitch = Math.max(-Math.PI/2, Math.min(Math.PI/2, pitch));
    });

    function updateMovement() {
        let forward = 0, right = 0;
        if (keys['w']) forward -= 1;
        if (keys['s']) forward += 1;
        if (keys['a']) right -= 1;
        if (keys['d']) right += 1;

        const direction = new THREE.Vector3();
        direction.x = Math.sin(yaw) * forward + Math.cos(yaw) * right;
        direction.z = Math.cos(yaw) * forward - Math.sin(yaw) * right;
        direction.normalize();

        camera.position.x += direction.x * speed;
        camera.position.z += direction.z * speed;
        camera.rotation.order = 'YXZ';
        camera.rotation.y = yaw;
        camera.rotation.x = pitch;
    }

    return updateMovement;
}
