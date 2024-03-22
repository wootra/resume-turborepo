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
        const cube = basicCube(1, 'mesh-normal');
        scene.add(cube);
        const dirLight = new THREE.DirectionalLight(0xffdd00, 0.4);
        dirLight.position.set(0, 0, 0).normalize();
        scene.add(dirLight);

        const pointLight = new THREE.PointLight(0x00eecc, 4.5, 0, 0);
        pointLight.color.setHSL(Math.random(), 1, 0.5);
        pointLight.position.set(0, 0, 0.3);
        scene.add(pointLight);
        camera.position.z = 5;

        // camera.position.set(0, 400, 700);
        scene.background = new THREE.Color(0x000000);
        scene.fog = new THREE.Fog(0x000000, 250, 1300);
        // camera.position.set(0, 0, 100);
        // camera.lookAt(0, 0, 0);

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
