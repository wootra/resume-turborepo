import * as THREE from 'three';
import type { Materials } from './types';

export const initMaterial = (materialType: Materials) => {
    let material: THREE.Material;
    if (materialType === 'mesh-basic') {
        material = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            opacity: 0.5,
            transparent: true,
        });
    }
    if (materialType === 'mesh-normal') {
        material = new THREE.MeshNormalMaterial({
            opacity: 0.7,
            transparent: true,
        });
    } else if (materialType === 'line-basic') {
        material = new THREE.LineBasicMaterial({
            color: 0x00ff00,
        });
    } else {
        material = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            opacity: 0.5,
            transparent: true,
        });
    }
    return material;
};
