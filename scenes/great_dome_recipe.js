export default {
  seed: 20250810,
  motifs: [
    {
      kind: 'ringInstances',
      id: 'column',
      count: 36,
      radius: 14.2,
      y: 0,
      jitterAngle: 0.01,
      jitterRadius: 0.05,
      align: 'outward',
      base: {
        geometry: { kind: 'cylinder', params: { radiusTop: 0.35, radiusBottom: 0.4, height: 8, radialSegments: 12 }},
        material: { kind: 'standard', color: '#d9d4c7', roughness: 0.7, metalness: 0.0 },
        tags: ['great_dome','colonnade']
      }
    },
    {
      kind: 'ringInstances',
      id: 'oculus_lights',
      count: 12,
      radius: 10.5,
      y: 6.2,
      base: {
        geometry: { kind: 'sphere', params: { radius: 0.15, widthSegments: 8, heightSegments: 6 }},
        material: { kind: 'emissive', color: '#ffdca8', emissiveIntensity: 2.4 },
        tags: ['oculus','light']
      }
    },
    {
      kind: 'poissonScatter',
      id: 'trees',
      count: 120,
      bbox: [-40, 40, -40, 40],
      minDist: 2.0,
      noiseMask: { freq: 0.05, threshold: 0.55 },
      base: {
        geometry: { kind: 'sphere', params: { radius: 0.6 }},
        material: { kind: 'standard', color: '#5a7c4a', roughness: 1.0 },
        randomScale: [0.8, 1.4],
        tags: ['vegetation']
      }
    }
  ]
};
