import * as THREE from 'three';
import type { TextureName } from '../libs/types';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { Font, FontLoader } from 'three/addons/loaders/FontLoader.js';

const getTextureImage = (textureName: TextureName) => {
    switch (textureName) {
        case 'stone':
            return '/textures/stone.jpg';
        default:
            return '/textures/stone.jpg';
    }
};

export const basicText = async (
    size: number = 1,
    textureName: TextureName = 'stone'
) => {
    const image = getTextureImage(textureName);
    const texture = await new THREE.TextureLoader().loadAsync(image);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    const loader = new FontLoader();
    const font = await loader.loadAsync(
        '/fonts3d/droid_sans_bold.typeface.json'
    );
    const textGeo = new TextGeometry('Hi!', {
        font: font as Font,
        size: 10,
        height: 4,
    });
    textGeo.computeBoundingBox();
    const centerOffset =
        -(
            (textGeo.boundingBox?.max?.x ?? 0) -
            (textGeo.boundingBox?.min?.x ?? 0)
        ) / 2;
    const materials = [
        new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
        new THREE.MeshPhongMaterial({ color: 0xffffff }), // side
    ];

    const textMesh1 = new THREE.Mesh(textGeo, materials);
    textMesh1.position.x = centerOffset;
    textMesh1.position.y = 30;
    textMesh1.position.z = 0;

    return textMesh1;
};
