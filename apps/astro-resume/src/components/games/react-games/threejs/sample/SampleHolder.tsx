import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Loading from './Loading';

// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// const controls = new OrbitControls( camera, renderer.domElement );
// const loader = new GLTFLoader();
const frameSize = 20;
export default function SampleHolder({
    width,
    height,
    renderer,
    update,
}: {
    width: number;
    height: number;
    renderer: THREE.WebGLRenderer;
    update: (frameSize: number) => void;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const animationRef = useRef<boolean>(true);
    const timing = useRef<number>(0);
    useEffect(() => {
        const animate = (frame: number) => {
            if (animationRef.current) {
                if (frame - timing.current > frameSize) {
                    timing.current = frame;
                    update(frameSize);
                }
                requestAnimationFrame(animate);
            }
        };
        setTimeout(() => {
            if (ref.current) {
                ref.current.innerHTML = '';
                animationRef.current = true;
                timing.current = 0;
                ref.current?.appendChild(renderer.domElement);
                animate(0);
            }
        }, 1000);
        return () => {
            animationRef.current = false;
            //when unmouting
        };
    }, [width, height]);
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
