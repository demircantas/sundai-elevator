export function createGround() {
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshPhongMaterial({color: 0x888888});
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    return ground;
}

export function createCube() {
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x2196f3 });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(2, 0.5, 0);
    return cube;
}

export function createSphere() {
    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xe91e63 });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(-2, 0.5, 0);
    return sphere;
}

export function createCylinder() {
    const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
    const cylinderMaterial = new THREE.MeshPhongMaterial({ color: 0x4caf50 });
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.position.set(0, 0.5, -2);
    return cylinder;
}
