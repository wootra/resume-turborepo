import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Loading from './Loading';

// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// const controls = new OrbitControls( camera, renderer.domElement );
// const loader = new GLTFLoader();
export default function SampleHolder({
    width,
    height,
    renderer,
    update,
    onMount,
    onUnmount,
}: {
    width: number;
    height: number;
    renderer: THREE.WebGLRenderer;
    update: () => void;
    onMount?: (el: HTMLDivElement | null) => void;
    onUnmount?: (el: HTMLDivElement | null) => void;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const animationRef = useRef<boolean>(true);
    const timing = useRef<number>(0);
    useEffect(() => {
        const animate = (frame: number) => {
            if (animationRef.current) {
                timing.current = frame;
                update();
                requestAnimationFrame(animate);
            }
        };
        const mountedRef = ref.current;
        if (mountedRef) {
            onMount && onMount(mountedRef);
            mountedRef.innerHTML = '';
            animationRef.current = true;
            timing.current = 0;
            mountedRef.appendChild(renderer.domElement);
            requestAnimationFrame(animate);
        }
        return () => {
            animationRef.current = false;
            timing.current = 0;
            if (mountedRef) {
                onUnmount && onUnmount(mountedRef);
            }
            //when unmouting
        };
    }, [width, height, update, renderer]);
    const [percentage, setPercentage] = useState(0);
    useEffect(() => {
        const id = setInterval(() => {
            setPercentage(p => (p + 10) % 110);
        }, 100);
        return () => {
            clearInterval(id);
        };
    }, []);
    return (
        <div className='w-full h-full grid place-items-center' ref={ref}>
            <Loading percentage={percentage} />
        </div>
    );
}
