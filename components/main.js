// Scene, Camera, Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x20232a);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 5);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Simple ground
const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshPhongMaterial({color: 0x888888});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Basic geometry for context
// Cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x2196f3 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(2, 0.5, 0);
scene.add(cube);

// Sphere
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xe91e63 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(-2, 0.5, 0);
scene.add(sphere);

// Cylinder
const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
const cylinderMaterial = new THREE.MeshPhongMaterial({ color: 0x4caf50 });
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinder.position.set(0, 0.5, -2);
scene.add(cylinder);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

// Controls
const keys = {};
document.addEventListener('keydown', (e) => { keys[e.key.toLowerCase()] = true; });
document.addEventListener('keyup', (e) => { keys[e.key.toLowerCase()] = false; });

// Movement parameters
const speed = 0.1;
const lookSpeed = 0.002;
let yaw = 0, pitch = 0;
let isPointerLocked = false;

// Pointer lock for mouse look
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

function animate() {
    requestAnimationFrame(animate);


    // WASD movement
    let forward = 0, right = 0;
    if (keys['w']) forward -= 1;
    if (keys['s']) forward += 1;
    if (keys['a']) right -= 1;
    if (keys['d']) right += 1;

    // Calculate direction
    const direction = new THREE.Vector3();
    direction.x = Math.sin(yaw) * forward + Math.cos(yaw) * right;
    direction.z = Math.cos(yaw) * forward - Math.sin(yaw) * right;
    direction.normalize();

    camera.position.x += direction.x * speed;
    camera.position.z += direction.z * speed;

    // Apply rotation
    camera.rotation.order = 'YXZ';
    camera.rotation.y = yaw;
    camera.rotation.x = pitch;

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
