import { useMemo } from 'react';
import * as THREE from 'three';
import { initBasicCamera } from '../libs/cameras';
import { initBasicRenderer } from '../libs/renders';
import { basicLineCube } from '../objects/cube';
import SampleHolder from './SampleHolder';

export default function ThreeExample({
    width,
    height,
}: {
    width: number;
    height: number;
}) {
    const { renderer, update } = useMemo(() => {
        const scene = new THREE.Scene();
        const camera = initBasicCamera({ width, height });

        const renderer = initBasicRenderer(width, height);
        const cube = basicLineCube();
        scene.add(cube);
        camera.position.z = 5;

        const update = (frame: number) => {
            cube.rotation.x += 0.05;
            cube.rotation.y += 0.1;
            renderer.render(scene, camera);
        };
        return { renderer, update };
    }, [width, height]);

    return (
        <SampleHolder
            width={width}
            height={height}
            renderer={renderer}
            update={update}
        />
    );
}
