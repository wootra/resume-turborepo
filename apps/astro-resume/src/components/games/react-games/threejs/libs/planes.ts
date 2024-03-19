import * as THREE from 'three';

export const addPlain = (scene: THREE.Scene) => {
    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(10000, 10000),
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
            opacity: 0.5,
            transparent: true,
        })
    );
    plane.position.y = 100;
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);
};
