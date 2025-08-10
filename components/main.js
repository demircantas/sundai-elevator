
// Unlit shading toggle (default: true)
let useUnlit = true;
window.useUnlit = useUnlit;
window.toggleUnlitShading = function() {
    useUnlit = !useUnlit;
    window.useUnlit = useUnlit;
    updateAllMaterials(scene, useUnlit);
};

function updateAllMaterials(obj, unlit) {
    obj.traverse(child => {
        if (child.isMesh) {
            const color = child.material.color ? child.material.color.getHex() : 0xffffff;
            child.material = unlit
                ? new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide })
                : new THREE.MeshPhongMaterial({ color, side: THREE.DoubleSide });
        }
    });
}

// Wire up the button
document.getElementById('toggle-shading').onclick = window.toggleUnlitShading;
// Set initial mode to unlit
window.addEventListener('DOMContentLoaded', () => {
    updateAllMaterials(scene, useUnlit);
});
import { createCamera } from './Camera.js';
import { createRenderer } from './Renderer.js';
import { addLighting } from './Lighting.js';
import { setupControls } from './Controls.js';
import { createSceneFromRecipe } from '../ParametricObject.js';
import { createParametricObject } from '../ParametricObject.js';
import { elevatorRecipe } from '../recipes/elevator_recipe.js';
import { interpolateRecipes, createInterpolatedScene } from './SceneInterpolator.js';

// Import recipes
import { grandCanyonRecipe } from '../recipes/grand_canyon_recipe.js';
import { greatDomeMITRecipe } from '../recipes/great_dome_mit_recipe.js';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x20232a);

// Camera
const camera = createCamera();

// Renderer
const renderer = createRenderer();

// Lighting
addLighting(scene);

// Objects
// scene.add(createGround());
// scene.add(createCube());
// scene.add(createSphere());
// scene.add(createCylinder());

// Load scene from recipe (choose one)
// const canyon = createSceneFromRecipe(grandCanyonRecipe());
// scene.add(canyon);
// To use the MIT Dome scene, comment above and uncomment below:
let currentScene = 'dome';
let elevator, elevatorMesh, elevatorY = 0, elevatorTargetY = 20, elevatorMoving = false, elevatorDirection = 1;
let dome, canyon, playerInElevator = false;
let interpObjects = [];
const domeRecipe = greatDomeMITRecipe();
const canyonRecipe = grandCanyonRecipe();

function loadDomeScene() {
    scene.clear();
    // Create objects for interpolation and keep references
    interpObjects = [];
    function createInterpObjects(objA, objB, parent) {
        const mesh = createParametricObject(objA);
        if (parent) parent.add(mesh); else scene.add(mesh);
        interpObjects.push({ mesh, objA, objB });
        if (objA.children && objB.children && objA.children.length === objB.children.length) {
            for (let i = 0; i < objA.children.length; ++i) {
                createInterpObjects(objA.children[i], objB.children[i], mesh);
            }
        }
    }
    createInterpObjects(domeRecipe, canyonRecipe, null);
    // Elevator
    elevator = createSceneFromRecipe(elevatorRecipe({ position: [0, 5, 10], height: 8, width: 4, depth: 4 }));
    elevatorMesh = elevator;
    scene.add(elevatorMesh);
    camera.position.y = 5;
    currentScene = 'dome';
}

function loadCanyonScene() {
    scene.clear();
    // Create objects for interpolation and keep references
    interpObjects = [];
    function createInterpObjects(objA, objB, parent) {
        const mesh = createParametricObject(objA);
        if (parent) parent.add(mesh); else scene.add(mesh);
        interpObjects.push({ mesh, objA, objB });
        if (objA.children && objB.children && objA.children.length === objB.children.length) {
            for (let i = 0; i < objA.children.length; ++i) {
                createInterpObjects(objA.children[i], objB.children[i], mesh);
            }
        }
    }
    createInterpObjects(domeRecipe, canyonRecipe, null);
    // Elevator
    elevator = createSceneFromRecipe(elevatorRecipe({ position: [0, 5, 10], height: 8, width: 4, depth: 4, color: 0x8844ff }));
    elevatorMesh = elevator;
    scene.add(elevatorMesh);
    camera.position.y = 5;
    currentScene = 'canyon';
}

// Start in MIT Dome
loadDomeScene();

// Listen for 'E' key to enter elevator and start moving
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'e' && !elevatorMoving && !playerInElevator) {
        playerInElevator = true;
        elevatorMoving = true;
        // Set direction based on current scene
        elevatorDirection = (currentScene === 'dome') ? 1 : -1;
    }
});

// Controls
const updateMovement = setupControls(renderer, camera);

// Animation loop



function animate() {
    requestAnimationFrame(animate);
    let t = (elevatorMesh.position.y - 5) / (elevatorTargetY - 5);
    t = Math.max(0, Math.min(1, t));
    if (elevatorMoving && playerInElevator) {
        // Move elevator and player up or down
        let arrived = false;
        if (elevatorDirection === 1 && elevatorMesh.position.y < elevatorTargetY) {
            elevatorMesh.position.y += 0.1;
            if (elevatorMesh.position.y >= elevatorTargetY) {
                elevatorMesh.position.y = elevatorTargetY;
                arrived = true;
            }
            camera.position.y = elevatorMesh.position.y;
        } else if (elevatorDirection === -1 && elevatorMesh.position.y > 5) {
            elevatorMesh.position.y -= 0.1;
            if (elevatorMesh.position.y <= 5) {
                elevatorMesh.position.y = 5;
                arrived = true;
            }
            camera.position.y = elevatorMesh.position.y;
        } else {
            arrived = true;
        }
        // Update all interpObjects in place
        for (let i = 0; i < interpObjects.length; ++i) {
            const { mesh, objA, objB } = interpObjects[i];
            // Always interpolate from MIT (bottom) to Canyon (top)
            if (objA.position && objB.position) mesh.position.set(...objA.position.map((a, j) => a + (objB.position[j] - a) * t));
            if (objA.rotation && objB.rotation) mesh.rotation.set(...objA.rotation.map((a, j) => a + (objB.rotation[j] - a) * t));
            if (objA.scale && objB.scale) mesh.scale.set(...objA.scale.map((a, j) => a + (objB.scale[j] - a) * t));
            if (objA.color !== undefined && objB.color !== undefined) {
                // Lerp color
                const c1 = new THREE.Color(objA.color);
                const c2 = new THREE.Color(objB.color);
                mesh.material.color.lerpColors(c1, c2, t);
            }
        }
        if (arrived) {
            elevatorMoving = false;
            playerInElevator = false;
            if (elevatorDirection === 1) {
                currentScene = 'canyon';
            } else {
                currentScene = 'dome';
            }
        }
    } else {
        updateMovement();
        // When not moving, snap to correct state
        for (let i = 0; i < interpObjects.length; ++i) {
            const { mesh, objA, objB } = interpObjects[i];
            let snapT = (currentScene === 'dome') ? 0 : 1;
            if (objA.position && objB.position) mesh.position.set(...objA.position.map((a, j) => a + (objB.position[j] - a) * snapT));
            if (objA.rotation && objB.rotation) mesh.rotation.set(...objA.rotation.map((a, j) => a + (objB.rotation[j] - a) * snapT));
            if (objA.scale && objB.scale) mesh.scale.set(...objA.scale.map((a, j) => a + (objB.scale[j] - a) * snapT));
            if (objA.color !== undefined && objB.color !== undefined) {
                const c1 = new THREE.Color(objA.color);
                const c2 = new THREE.Color(objB.color);
                mesh.material.color.lerpColors(c1, c2, snapT);
            }
        }
    }
    renderer.render(scene, camera);
}
animate();
