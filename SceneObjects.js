// SceneObjects.js is now a placeholder for future helpers or extensions.

export function applyMaterial(mesh, m) {
  if (!mesh) return;
  const kind = m.kind || 'standard';
  const color = m.color || '#cccccc';
  let mat;
  switch (kind) {
    case 'standard': mat = new THREE.MeshStandardMaterial({ color, metalness: m.metalness ?? 0, roughness: m.roughness ?? 1 }); break;
    case 'phong':    mat = new THREE.MeshPhongMaterial({ color, shininess: m.shininess ?? 30 }); break;
    case 'emissive': mat = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: m.emissiveIntensity ?? 1, metalness: 0, roughness: 1 }); break;
    default:         mat = new THREE.MeshBasicMaterial({ color });
  }
  mesh.material = mat;
}

