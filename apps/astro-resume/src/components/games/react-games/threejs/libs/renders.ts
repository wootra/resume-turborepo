import * as THREE from 'three';

export const initBasicRenderer = (width: number, height: number) => {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    return renderer;
};
