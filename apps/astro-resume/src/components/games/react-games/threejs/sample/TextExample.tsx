import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { initBasicRenderer } from '../libs/renders';
import SampleHolder from './SampleHolder';
import { addLight } from '../libs/lights';
import { basicText } from '../objects/text';
import type { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import AutoLoading from './AutoLoading';
import usePointerEvents from './usePointerEvents';

export default function ThreeExample({
    width,
    height,
}: {
    width: number;
    height: number;
}) {
    const [text, setText] = useState<THREE.Mesh<
        TextGeometry,
        THREE.MeshPhongMaterial[],
        THREE.Object3DEventMap
    > | null>(null);
    const groupRef = useRef(new THREE.Group());
    const sceneRef = useRef(new THREE.Scene());
    const cameraRef = useRef(
        new THREE.PerspectiveCamera(
            7,
            window.innerWidth / window.innerHeight,
            1,
            1500
        )
    );
    const targetAngleRef = useRef(0);
    const targetAngleOnPressRef = useRef(0);
    const startPosRef = useRef(0);
    const customMovingRef = useRef(false);
    const onPress = (e: PointerEvent) => {
        console.log('press...');
        customMovingRef.current = true;
        startPosRef.current = e.clientX;
        targetAngleOnPressRef.current = targetAngleRef.current;
    };
    const onRelease = (e: PointerEvent) => {
        customMovingRef.current = false;
        console.log('release...');
    };
    const onMoving = (e: PointerEvent) => {
        const diff = e.clientX - startPosRef.current;
        targetAngleRef.current = targetAngleOnPressRef.current + diff * 0.02;
    };
    const { onMount, onUnmount } = usePointerEvents({
        onPress,
        onMoving,
        onRelease,
    });
    useEffect(() => {
        basicText('Hello!', 'f-texture').then(txt => {
            setText(txt);
        });
    }, [width, height]);
    const { renderer, update } = useMemo(() => {
        if (text) {
            const scene = sceneRef.current;
            scene.clear();
            const camera = cameraRef.current;
            camera.aspect = window.innerWidth / window.innerHeight;

            camera.position.set(0, 400, 700);
            const cameraTarget = new THREE.Vector3(0, 150, 0);
            scene.background = new THREE.Color(0x000000);
            scene.fog = new THREE.Fog(0x000000, 250, 1300);
            camera.lookAt(cameraTarget);
            addLight(scene);

            const group = groupRef.current;
            group.position.y = 100;
            group.position.z = 0;
            group.position.x = 0;
            group.rotation.y = 100;

            scene.add(group);

            // add plane
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

            group.add(text);

            const renderer = initBasicRenderer(width, height);

            const update = () => {
                if (customMovingRef.current) {
                    group.rotation.y =
                        group.rotation.y +
                        (targetAngleRef.current - group.rotation.y) * 0.05;
                } else {
                    group.rotation.y += 0.005;
                    targetAngleRef.current = group.rotation.y % 360;
                }

                // renderer.clear();
                renderer.render(scene, camera);
            };
            return { renderer, update };
        } else {
            return {};
        }
    }, [width, height, text]);

    return renderer && update ? (
        <SampleHolder
            onMount={onMount}
            onUnmount={onUnmount}
            width={width}
            height={height}
            renderer={renderer}
            update={update}
        />
    ) : (
        <AutoLoading loadingTime={1000} />
    );
}
