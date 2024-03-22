import * as THREE from 'three';
// import * as TC from 'three/src/constants';
import type { TextureName } from '../libs/types';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { Font, FontLoader } from 'three/addons/loaders/FontLoader.js';

const getTextureImage = (textureName: TextureName) => {
    switch (textureName) {
        case 'stone':
            return '/textures/stone.jpg';
        case 'f-texture':
        default:
            return '/textures/f-texture.png';
    }
};

export const basicText = async (
    text: string,
    textureName: TextureName = 'f-texture'
) => {
    const image = getTextureImage(textureName);
    const texture = await new THREE.TextureLoader().loadAsync(image);
    texture.repeat.set(64, 64);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.needsUpdate = true;
    texture.mapping = THREE.EquirectangularReflectionMapping;
    // texture.format = TC.CompressedPixelFormat;
    const loader = new FontLoader();
    const font = await loader.loadAsync(
        '/fonts3d/droid_sans_bold.typeface.json'
    );
    const textGeo = new TextGeometry(text, {
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
        // new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
        // new THREE.MeshPhongMaterial({ color: 0xffffff }), // side
        new THREE.MeshNormalMaterial({
            wireframe: false,
            bumpMap: texture,
            // color: 'white',
            // flatShading: true,
            // map: texture,
        }), // front
        new THREE.MeshPhongMaterial({
            color: 'white',
            flatShading: true,
            map: texture,
        }), // front
        new THREE.MeshPhongMaterial({
            color: 'white',
            flatShading: false,
            map: texture,
        }), // front
    ];

    const textMesh1 = new THREE.Mesh(textGeo, materials);
    textMesh1.position.x = centerOffset;
    textMesh1.position.y = 30;
    textMesh1.position.z = 0;

    return textMesh1;
};
