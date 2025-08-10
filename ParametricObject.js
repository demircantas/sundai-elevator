export function createParametricObject({ type, size = [1, 1, 1], position = [0, 0, 0], color = 0xffffff, children = [] }) {
    let geometry, material, mesh;
    // Use global toggle if available
    const unlit = (typeof window !== 'undefined' && window.useUnlit !== undefined) ? window.useUnlit : false;
    material = unlit
        ? new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide })
        : new THREE.MeshPhongMaterial({ color, side: THREE.DoubleSide });
    switch (type) {
        case 'box':
            geometry = new THREE.BoxGeometry(...size);
            break;
        case 'sphere':
            geometry = new THREE.SphereGeometry(size[0], 32, 32);
            break;
        case 'cylinder':
            geometry = new THREE.CylinderGeometry(size[0], size[1], size[2], 32);
            break;
        case 'plane':
            geometry = new THREE.PlaneGeometry(size[0], size[1]);
            break;
        default:
            throw new Error('Unknown geometry type: ' + type);
    }
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position);
    // Recursively add children
    for (const child of children) {
        mesh.add(createParametricObject(child));
    }
    return mesh;
}

export function createSceneFromRecipe(recipe) {
    return createParametricObject(recipe);
}
