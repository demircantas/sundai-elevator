// Instanced geometry support for performance
// Helper: flatten all children of a given type
function flattenByType(obj, type, arr = []) {
    if (obj.type === type) arr.push(obj);
    if (obj.children) for (const c of obj.children) flattenByType(c, type, arr);
    return arr;
}

// Helper: remove all children of a given type from a tree (for instancing)
function removeTypeFromTree(obj, type) {
    if (!obj.children) return;
    obj.children = obj.children.filter(c => c.type !== type);
    for (const c of obj.children) removeTypeFromTree(c, type);
}

// Main instancing-aware scene builder implemented as a function for concept usage
export function createSceneFromRecipe(recipe) {
    // Supported types for instancing
    const instancedTypes = ['box', 'sphere', 'cylinder'];
    const root = new THREE.Group();
    // For each instanced type, batch all objects
    for (const type of instancedTypes) {
        const all = flattenByType(recipe, type);
        if (all.length > 0) {
            let geometry;
            switch (type) {
                case 'box': geometry = new THREE.BoxGeometry(...(all[0].size || [1,1,1])); break;
                case 'sphere': geometry = new THREE.SphereGeometry((all[0].size||[1])[0], 32, 32); break;
                case 'cylinder': geometry = new THREE.CylinderGeometry(...(all[0].size||[1,1,1]), 32); break;
            }
            // Use a single material for all, color will be set per-instance
            const unlit = (typeof window !== 'undefined' && window.useUnlit !== undefined) ? window.useUnlit : false;
            const baseColor = all[0].color || 0xffffff;
            const material = unlit
                ? new THREE.MeshBasicMaterial({ color: baseColor, side: THREE.DoubleSide })
                : new THREE.MeshPhongMaterial({ color: baseColor, side: THREE.DoubleSide });
            const instanced = new THREE.InstancedMesh(geometry, material, all.length);
            const color = new THREE.Color();
            for (let i = 0; i < all.length; ++i) {
                const obj = all[i];
                const m = new THREE.Matrix4();
                const s = obj.scale || [1,1,1];
                const r = obj.rotation || [0,0,0];
                const p = obj.position || [0,0,0];
                m.compose(
                    new THREE.Vector3(...p),
                    new THREE.Quaternion().setFromEuler(new THREE.Euler(...r)),
                    new THREE.Vector3(...s)
                );
                instanced.setMatrixAt(i, m);
                color.set(obj.color || 0xffffff);
                instanced.setColorAt(i, color);
            }
            instanced.instanceMatrix.needsUpdate = true;
            if (instanced.instanceColor) instanced.instanceColor.needsUpdate = true;
            root.add(instanced);
            // Remove these from tree so they're not double-rendered
            removeTypeFromTree(recipe, type);
        }
    }
    // Add remaining objects (planes, etc) as normal meshes
    function addRemaining(obj, parent) {
        if (['box','sphere','cylinder'].includes(obj.type)) return;
        let geometry, material, mesh;
        const unlit = (typeof window !== 'undefined' && window.useUnlit !== undefined) ? window.useUnlit : false;
        material = unlit
            ? new THREE.MeshBasicMaterial({ color: obj.color || 0xffffff, side: THREE.DoubleSide })
            : new THREE.MeshPhongMaterial({ color: obj.color || 0xffffff, side: THREE.DoubleSide });
        switch (obj.type) {
            case 'plane': geometry = new THREE.PlaneGeometry(...(obj.size||[1,1])); break;
            default: return;
        }
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(...(obj.position||[0,0,0]));
        mesh.rotation.set(...(obj.rotation||[0,0,0]));
        mesh.scale.set(...(obj.scale||[1,1,1]));
        if (parent) parent.add(mesh); else root.add(mesh);
        if (obj.children) for (const c of obj.children) addRemaining(c, mesh);
    }
    addRemaining(recipe, null);
    return root;
}


