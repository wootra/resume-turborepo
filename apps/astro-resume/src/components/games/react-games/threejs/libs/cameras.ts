import * as THREE from 'three';

export const initBasicCamera = ({
    width,
    height,
    fieldOfView = 75,
    aspectRatio,
    near = 0.1,
    far = 1000,
}: {
    width: number;
    height: number;
    fieldOfView?: number;
    aspectRatio?: number;
    near?: number;
    far?: number;
}) => {
    aspectRatio = aspectRatio ?? width / height;
    const camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        near,
        far
    );
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);
    return camera;
};
