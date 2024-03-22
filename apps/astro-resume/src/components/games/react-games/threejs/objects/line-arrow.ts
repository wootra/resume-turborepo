import * as THREE from 'three';
import { initMaterial } from '../libs/materials';
import type { Materials } from '../libs/types';

export const basicLineArrow = (
    size: number = 1,
    material: Materials = 'line-basic'
) => {
    const points = [
        [-size, 0, 0],
        [0, size, 0],
        [size, 0, 0],
    ].map(col => new THREE.Vector3(...col));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const meterial = initMaterial(material);
    const line = new THREE.Line(geometry, meterial);
    return line;
};
