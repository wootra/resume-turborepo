import * as THREE from 'three';
import type { Materials } from './types';

export const initMeterial = (
    materialType: Materials,
    color: number = 0x00ff00
) => {
    let meterial: THREE.Material;
    if (materialType === 'mesh-basic') {
        meterial = new THREE.MeshBasicMaterial({
            color,
        });
    } else if (materialType === 'line-basic') {
        meterial = new THREE.LineBasicMaterial({
            color,
        });
    } else {
        //default
        meterial = new THREE.MeshBasicMaterial({
            color,
        });
    }
    return meterial;
};
