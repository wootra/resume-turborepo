import React, { Suspense, type ComponentType, useEffect, useRef } from 'react';
// import GrayButton from '../../../../../src/components/app-comps/react-libraries/components/GrayButton';
import WebGL from 'three/addons/capabilities/WebGL.js';
import GrayButton from '@/components/app-comps/react-libraries/components/GrayButton';
const CubeExample = React.lazy(
    () =>
        import('./sample/CubeExample') as Promise<{
            default: ComponentType<any>;
        }>
);
const ArrpwExample = React.lazy(
    () =>
        import('./sample/ArrowExample') as Promise<{
            default: ComponentType<any>;
        }>
);

type Components = 'cube' | 'arrow' | 'none';
const examples: {
    compoType: Components;
    label: string;
    component: React.LazyExoticComponent<React.ComponentType<any>>;
}[] = [
    {
        compoType: 'cube',
        label: 'Cube',
        component: CubeExample,
    },
    {
        compoType: 'arrow',
        label: 'Arrow',
        component: ArrpwExample,
    },
];

export const ThreeJsSamples = () => {
    const [compo, setCompo] = React.useState<Components>('none');
    const [size, setSize] = React.useState({ w: 100, h: 100 });
    const sizeRef = useRef<{ w: number; h: number }>(size);
    sizeRef.current = size;
    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (ref.current) {
            setSize({
                w: ref.current.clientWidth,
                h: ref.current.clientHeight,
            });
        }
        const resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                if (entry.contentBoxSize && ref.current) {
                    if (
                        sizeRef.current.w !== ref.current.clientWidth ||
                        sizeRef.current.h !== ref.current.clientHeight
                    ) {
                        setSize({
                            w: ref.current.clientWidth,
                            h: ref.current.clientHeight,
                        });
                    }
                }
            }
        });
        if (ref.current) {
            resizeObserver.observe(ref.current);
        }
        return () => {
            if (ref.current) {
                resizeObserver.disconnect();
            }
        };
    }, []);
    return (
        <div className='flex flex-col gap-4 min-w-[calc(100vw-8rem)] min-h-[calc(100vh-8rem)]'>
            <div className='flex flex-row gap-2'>
                {examples.map(({ compoType, label }) => (
                    <GrayButton
                        onClick={() => setCompo(compoType)}
                        selected={compo === compoType}
                    >
                        {label}
                    </GrayButton>
                ))}

                <GrayButton
                    onClick={() => setCompo('none')}
                    selected={compo === 'none'}
                    className={compo === 'none' ? 'bg-lime-400' : ''}
                >
                    None
                </GrayButton>
                <span>
                    Size: {size.w}/{size.h}
                </span>
            </div>
            <div
                className='w-full h-full flex-1 relative border border-gray'
                ref={ref}
            >
                <div className='absolute inset-0'>
                    {examples.map(
                        ({ compoType, component: Component }) =>
                            compo === compoType &&
                            WebGL.isWebGL2Available() && (
                                <Suspense fallback={<div>loading...</div>}>
                                    <Component width={size.w} height={size.h} />
                                </Suspense>
                            )
                    )}

                    {compo === 'none' && WebGL.isWebGL2Available() && (
                        <div className='grid place-items-center h-full'>
                            Please select one
                        </div>
                    )}
                    {!WebGL.isWebGL2Available() && (
                        <div className='grid place-items-center h-full'>
                            WebGL is not available in this browser...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
