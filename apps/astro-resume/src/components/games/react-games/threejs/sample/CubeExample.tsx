import { useMemo } from 'react';
import * as THREE from 'three';
import { initBasicCamera } from '../libs/cameras';
import { initBasicRenderer } from '../libs/renders';
import { basicCube } from '../objects/cube';
import SampleHolder from './SampleHolder';
import useRotationActions from './useRotationActions';

// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// const controls = new OrbitControls( camera, renderer.domElement );
// const loader = new GLTFLoader();

export default function ThreeExample({
    width,
    height,
}: {
    width: number;
    height: number;
}) {
    const { onMount, onUnmount, rotateGroupOnPointer } = useRotationActions();
    const { renderer, update } = useMemo(() => {
        const scene = new THREE.Scene();
        const camera = initBasicCamera({ width, height });

        const renderer = initBasicRenderer(width, height);
        const cube = basicCube();
        scene.add(cube);
        camera.position.z = 5;

        const update = () => {
            rotateGroupOnPointer(cube, ['x', 'y'], () => {
                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;
            });
            renderer.render(scene, camera);
        };
        return { renderer, update };
    }, [width, height]);

    return (
        <SampleHolder
            onMount={onMount}
            onUnmount={onUnmount}
            width={width}
            height={height}
            renderer={renderer}
            update={update}
        />
    );
}
