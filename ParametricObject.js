export function createParametricObject({ type, size = [1, 1, 1], position = [0, 0, 0], color = 0xffffff }) {
    let geometry, material, mesh;
    material = new THREE.MeshPhongMaterial({ color });
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
    return mesh;
}

export function createSceneFromJSON(json, parent = null) {
    const obj = createParametricObject(json);
    if (json.children && Array.isArray(json.children)) {
        json.children.forEach(child => {
            const childObj = createSceneFromJSON(child, obj);
            obj.add(childObj);
        });
    }
    return obj;
}
