import { Camera } from './Camera.js';
import { Renderer } from './Renderer.js';
import { Lighting } from './Lighting.js';
import { Controls } from './Controls.js';
import { SceneFactory } from '../ParametricObject.js';
import { elevatorRecipe } from '../recipes/elevator_recipe.js';
import { grandCanyonRecipe } from '../recipes/grand_canyon_recipe.js';
import { greatDomeMITRecipe } from '../recipes/great_dome_mit_recipe.js';

class ElevatorApp {
    constructor() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x20232a);
        this.camera = new Camera();
        this.renderer = new Renderer();
        new Lighting(this.scene);
        this.controls = new Controls(this.renderer, this.camera);

        // Shading toggle
        this.useUnlit = true;
        window.useUnlit = this.useUnlit;
        window.toggleUnlitShading = () => this.toggleUnlitShading();
        document.getElementById('toggle-shading').onclick = window.toggleUnlitShading;
        window.addEventListener('DOMContentLoaded', () => {
            this.updateAllMaterials(this.scene, this.useUnlit);
        });

        // Recipes and state
        this.domeRecipe = greatDomeMITRecipe();
        this.canyonRecipe = grandCanyonRecipe();
        this.interpInstanced = [];
        this.currentScene = 'dome';
        this.elevator = null;
        this.elevatorMesh = null;
        this.elevatorTargetY = 20;
        this.elevatorMoving = false;
        this.elevatorDirection = 1;
        this.playerInElevator = false;

        this.loadDomeScene();
        document.addEventListener('keydown', e => this.onKeyDown(e));

        this.animate = this.animate.bind(this);
        this.animate();
    }

    toggleUnlitShading() {
        this.useUnlit = !this.useUnlit;
        window.useUnlit = this.useUnlit;
        this.updateAllMaterials(this.scene, this.useUnlit);
    }

    updateAllMaterials(obj, unlit) {
        obj.traverse(child => {
            if (child.isMesh) {
                const color = child.material.color ? child.material.color.getHex() : 0xffffff;
                child.material = unlit
                    ? new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide })
                    : new THREE.MeshPhongMaterial({ color, side: THREE.DoubleSide });
            }
        });
    }

    onKeyDown(e) {
        if (e.key.toLowerCase() === 'e' && !this.elevatorMoving && !this.playerInElevator) {
            this.playerInElevator = true;
            this.elevatorMoving = true;
            this.elevatorDirection = (this.currentScene === 'dome') ? 1 : -1;
        }
    }

    createInterpInstanced(recipeA, recipeB) {
        const types = ['box', 'sphere', 'cylinder'];
        for (const type of types) {
            const arrA = [], arrB = [];
            function collect(objA, objB) {
                if (objA.type === type && objB.type === type) {
                    arrA.push(objA);
                    arrB.push(objB);
                }
                if (objA.children && objB.children && objA.children.length === objB.children.length) {
                    for (let i = 0; i < objA.children.length; ++i) {
                        collect(objA.children[i], objB.children[i]);
                    }
                }
            }
            collect(recipeA, recipeB);
            if (arrA.length > 0) {
                let geometry;
                switch (type) {
                    case 'box': geometry = new THREE.BoxGeometry(...(arrA[0].size || [1,1,1])); break;
                    case 'sphere': geometry = new THREE.SphereGeometry((arrA[0].size||[1])[0], 32, 32); break;
                    case 'cylinder': geometry = new THREE.CylinderGeometry(...(arrA[0].size||[1,1,1]), 32); break;
                }
                const unlit = (typeof window !== 'undefined' && window.useUnlit !== undefined) ? window.useUnlit : false;
                const baseColor = arrA[0].color || 0xffffff;
                const material = unlit
                    ? new THREE.MeshBasicMaterial({ color: baseColor, side: THREE.DoubleSide })
                    : new THREE.MeshPhongMaterial({ color: baseColor, side: THREE.DoubleSide });
                const instanced = new THREE.InstancedMesh(geometry, material, arrA.length);
                this.scene.add(instanced);
                this.interpInstanced.push({ instanced, arrA, arrB });
            }
        }
        if (recipeA.type === 'plane' && recipeB.type === 'plane') {
            let geometry = new THREE.PlaneGeometry(...(recipeA.size||[1,1]));
            const unlit = (typeof window !== 'undefined' && window.useUnlit !== undefined) ? window.useUnlit : false;
            const material = unlit
                ? new THREE.MeshBasicMaterial({ color: recipeA.color || 0xffffff, side: THREE.DoubleSide })
                : new THREE.MeshPhongMaterial({ color: recipeA.color || 0xffffff, side: THREE.DoubleSide });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(...(recipeA.position||[0,0,0]));
            mesh.rotation.set(...(recipeA.rotation||[0,0,0]));
            mesh.scale.set(...(recipeA.scale||[1,1,1]));
            this.scene.add(mesh);
        }
    }

    loadDomeScene() {
        this.scene.clear();
        this.interpInstanced = [];
        this.createInterpInstanced(this.domeRecipe, this.canyonRecipe);
        this.elevator = SceneFactory.createFromRecipe(
            elevatorRecipe({ position: [0, 5, 10], height: 8, width: 4, depth: 4 })
        );
        this.elevatorMesh = this.elevator;
        this.scene.add(this.elevatorMesh);
        this.camera.position.y = 5;
        this.currentScene = 'dome';
    }

    loadCanyonScene() {
        this.scene.clear();
        this.interpInstanced = [];
        this.createInterpInstanced(this.domeRecipe, this.canyonRecipe);
        this.elevator = SceneFactory.createFromRecipe(
            elevatorRecipe({ position: [0, 5, 10], height: 8, width: 4, depth: 4, color: 0x8844ff })
        );
        this.elevatorMesh = this.elevator;
        this.scene.add(this.elevatorMesh);
        this.camera.position.y = 5;
        this.currentScene = 'canyon';
    }

    animate() {
        requestAnimationFrame(this.animate);
        let t = (this.elevatorMesh.position.y - 5) / (this.elevatorTargetY - 5);
        t = Math.max(0, Math.min(1, t));
        if (this.elevatorMoving && this.playerInElevator) {
            let arrived = false;
            if (this.elevatorDirection === 1 && this.elevatorMesh.position.y < this.elevatorTargetY) {
                this.elevatorMesh.position.y += 0.1;
                if (this.elevatorMesh.position.y >= this.elevatorTargetY) {
                    this.elevatorMesh.position.y = this.elevatorTargetY;
                    arrived = true;
                }
                this.camera.position.y = this.elevatorMesh.position.y;
            } else if (this.elevatorDirection === -1 && this.elevatorMesh.position.y > 5) {
                this.elevatorMesh.position.y -= 0.1;
                if (this.elevatorMesh.position.y <= 5) {
                    this.elevatorMesh.position.y = 5;
                    arrived = true;
                }
                this.camera.position.y = this.elevatorMesh.position.y;
            } else {
                arrived = true;
            }
            const color = new THREE.Color();
            for (const { instanced, arrA, arrB } of this.interpInstanced) {
                for (let i = 0; i < arrA.length; ++i) {
                    const objA = arrA[i], objB = arrB[i];
                    const pos = objA.position.map((a, j) => a + (objB.position[j] - a) * t);
                    const rot = objA.rotation.map((a, j) => a + (objB.rotation[j] - a) * t);
                    const scl = objA.scale.map((a, j) => a + (objB.scale[j] - a) * t);
                    const m = new THREE.Matrix4();
                    m.compose(
                        new THREE.Vector3(...pos),
                        new THREE.Quaternion().setFromEuler(new THREE.Euler(...rot)),
                        new THREE.Vector3(...scl)
                    );
                    instanced.setMatrixAt(i, m);
                    color.set(objA.color);
                    color.lerp(new THREE.Color(objB.color), t);
                    instanced.setColorAt(i, color);
                }
                instanced.instanceMatrix.needsUpdate = true;
                if (instanced.instanceColor) instanced.instanceColor.needsUpdate = true;
            }
            if (arrived) {
                this.elevatorMoving = false;
                this.playerInElevator = false;
                this.currentScene = (this.elevatorDirection === 1) ? 'canyon' : 'dome';
            }
        } else {
            this.controls.update();
            let snapT = (this.currentScene === 'dome') ? 0 : 1;
            const color = new THREE.Color();
            for (const { instanced, arrA, arrB } of this.interpInstanced) {
                for (let i = 0; i < arrA.length; ++i) {
                    const objA = arrA[i], objB = arrB[i];
                    const pos = objA.position.map((a, j) => a + (objB.position[j] - a) * snapT);
                    const rot = objA.rotation.map((a, j) => a + (objB.rotation[j] - a) * snapT);
                    const scl = objA.scale.map((a, j) => a + (objB.scale[j] - a) * snapT);
                    const m = new THREE.Matrix4();
                    m.compose(
                        new THREE.Vector3(...pos),
                        new THREE.Quaternion().setFromEuler(new THREE.Euler(...rot)),
                        new THREE.Vector3(...scl)
                    );
                    instanced.setMatrixAt(i, m);
                    color.set(objA.color);
                    color.lerp(new THREE.Color(objB.color), snapT);
                    instanced.setColorAt(i, color);
                }
                instanced.instanceMatrix.needsUpdate = true;
                if (instanced.instanceColor) instanced.instanceColor.needsUpdate = true;
            }
        }
        this.renderer.render(this.scene, this.camera);
    }
}

new ElevatorApp();
