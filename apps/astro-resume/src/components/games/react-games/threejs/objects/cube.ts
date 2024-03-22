import * as THREE from 'three';
import { initMaterial } from '../libs/materials';
import type { Materials } from '../libs/types';

export const basicCube = (
    size: number = 1,
    materialType: Materials = 'mesh-normal'
) => {
    const geometry = new THREE.BoxGeometry(size, size, size);

    const material = initMaterial(materialType);
    const cube = new THREE.Mesh(geometry, material);
    return cube;
};
