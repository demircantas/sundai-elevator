// Recipe for a stylized Grand Canyon scene using parametric objects
export function grandCanyonRecipe() {
  // Layered canyon walls
  const layers = [];
  for (let i = 0; i < 8; i++) {
    layers.push({
      type: 'box',
      size: [90 - i * 10, 2, 60 - i * 7],
      position: [0, 1 + i * 2, 0],
      color: 0xC97E4B - i * 0x111100
    });
  }
  // River
  const river = {
    type: 'box',
    size: [60, 0.5, 8],
    position: [0, 1.5, 0],
    color: 0x3399FF
  };
  // Rocks
  const rocks = [];
  for (let i = 0; i < 20; i++) {
    rocks.push({
      type: 'sphere',
      size: [Math.random() * 1.5 + 0.5],
      position: [Math.random() * 80 - 40, 2, Math.random() * 40 - 20],
      color: 0xA0522D
    });
  }
  // Plateaus
  const plateaus = [];
  for (let i = 0; i < 5; i++) {
    plateaus.push({
      type: 'box',
      size: [8, 2, 8],
      position: [Math.random() * 60 - 30, 10 + Math.random() * 6, Math.random() * 40 - 20],
      color: 0xE2B07A
    });
  }
  return {
    type: 'plane',
    size: [100, 100],
    position: [0, 0, 0],
    color: 0xE2B07A,
    children: [
      ...layers,
      river,
      ...rocks,
      ...plateaus
    ]
  };
}
