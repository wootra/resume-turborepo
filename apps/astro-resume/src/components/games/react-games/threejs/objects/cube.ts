import * as THREE from 'three';
import { initMeterial } from '../libs/materials';
import type { Materials } from '../libs/types';

export const basicCube = (
    size: number = 1,
    material: Materials = 'line-basic'
) => {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const meterial = initMeterial(material);
    const cube = new THREE.Mesh(geometry, meterial);
    return cube;
};
