// Recipe for the Great Dome of MIT scene using parametric objects
export function greatDomeMITRecipe() {
  const children = [];
  // Main dome
  children.push({ type: 'sphere', size: [18], position: [0, 18, 0], color: 0xFFFFFF });
  // Dome base
  children.push({ type: 'cylinder', size: [18, 18, 4], position: [0, 2, 0], color: 0xFFFFFF });
  // Main building
  children.push({ type: 'box', size: [60, 10, 30], position: [0, 5, -20], color: 0xFFFFFF });
  // Steps
  for (let i = 0; i < 20; i++) {
    children.push({ type: 'box', size: [60 - i * 2, 1, 4], position: [0, i * 1, -35 + i * 2], color: 0xCCCCCC });
  }
  // Columns
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * Math.PI;
    children.push({ type: 'cylinder', size: [1, 1, 12], position: [Math.cos(angle) * 16, 6, -10 + Math.sin(angle) * 6], color: 0xDDDDDD });
  }
  // Windows
  for (let i = 0; i < 30; i++) {
    children.push({ type: 'box', size: [2, 3, 0.5], position: [-28 + (i % 10) * 6, 7, -20 + Math.floor(i / 10) * 8], color: 0x333366 });
  }
  // Trees
  for (let i = 0; i < 20; i++) {
    children.push({ type: 'cylinder', size: [0.7, 0.7, 4], position: [-50 + i * 5, 2, 40], color: 0x8B5A2B });
    children.push({ type: 'sphere', size: [2], position: [-50 + i * 5, 6, 40], color: 0x228B22 });
  }
  // Fill to ~200 objects
  for (let i = children.length; i < 200; i++) {
    children.push({ type: 'box', size: [1, 1, 1], position: [Math.random() * 100 - 50, 0.5, Math.random() * 100 - 50], color: 0xAAAAAA });
  }
  return {
    type: 'plane',
    size: [120, 120],
    position: [0, 0, 0],
    color: 0x888888,
    children
  };
}
