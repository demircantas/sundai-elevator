
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
let interpScene = null;
const domeRecipe = greatDomeMITRecipe();
const canyonRecipe = grandCanyonRecipe();

function loadDomeScene() {
    scene.clear();
    dome = createSceneFromRecipe(domeRecipe);
    scene.add(dome);
    elevator = createSceneFromRecipe(elevatorRecipe({ position: [0, 5, 10], height: 8, width: 4, depth: 4 }));
    elevatorMesh = elevator;
    scene.add(elevatorMesh);
    // Only update camera Y to elevator Y, keep X/Z
    camera.position.y = 5;
    currentScene = 'dome';
    interpScene = null;
}

function loadCanyonScene() {
    scene.clear();
    canyon = createSceneFromRecipe(canyonRecipe);
    scene.add(canyon);
    elevator = createSceneFromRecipe(elevatorRecipe({ position: [0, 5, 10], height: 8, width: 4, depth: 4, color: 0x8844ff }));
    elevatorMesh = elevator;
    scene.add(elevatorMesh);
    // Only update camera Y to elevator Y, keep X/Z
    camera.position.y = 5;
    currentScene = 'canyon';
    interpScene = null;
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
    let t = 0;
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
        // Interpolate scenes while elevator is moving
        t = (elevatorMesh.position.y - 5) / (elevatorTargetY - 5);
        if (elevatorDirection === -1) t = 1 - t;
        t = Math.max(0, Math.min(1, t));
        if (interpScene) scene.remove(interpScene);
        interpScene = createInterpolatedScene(domeRecipe, canyonRecipe, t);
        scene.add(interpScene);
        if (dome) scene.remove(dome);
        if (canyon) scene.remove(canyon);
        if (arrived) {
            // Only update state, do not reload scene or teleport
            elevatorMoving = false;
            playerInElevator = false;
            // Set currentScene based on direction
            if (elevatorDirection === 1) {
                currentScene = 'canyon';
            } else {
                currentScene = 'dome';
            }
            // Remove interpScene and show new base scene
            if (interpScene) {
                scene.remove(interpScene);
                interpScene = null;
            }
            if (currentScene === 'dome' && dome && !scene.children.includes(dome)) scene.add(dome);
            if (currentScene === 'canyon' && canyon && !scene.children.includes(canyon)) scene.add(canyon);
        }
    } else {
        updateMovement();
        if (interpScene) {
            scene.remove(interpScene);
            interpScene = null;
        }
        if (currentScene === 'dome' && dome && !scene.children.includes(dome)) scene.add(dome);
        if (currentScene === 'canyon' && canyon && !scene.children.includes(canyon)) scene.add(canyon);
    }
    renderer.render(scene, camera);
}
animate();
