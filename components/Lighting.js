export function addLighting(scene) {
    // Stronger ambient and hemisphere light for full color visibility
    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambient);
    // Brighter sky and ground colors for hemisphere light
    const hemi = new THREE.HemisphereLight(0xffffbb, 0x444466, 1.0);
    scene.add(hemi);
}
