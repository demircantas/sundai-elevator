// Elevator recipe: a simple box elevator with doors
export function elevatorRecipe({ position = [0, 0, 0], height = 10, width = 4, depth = 4, color = 0x8888ff }) {
  return {
    type: 'box',
    size: [width, height, depth],
    position,
    color,
    children: [
      // Optionally add doors, buttons, etc.
      { type: 'box', size: [width * 0.9, 0.2, depth * 0.9], position: [0, -height/2 + 0.1, 0], color: 0x222244 }
    ]
  };
}
