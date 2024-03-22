import React, { useCallback, useRef } from 'react';

const usePointerEvents = ({
    onMoving,
    onPress,
    onRelease,
}: {
    onMoving?: (e: PointerEvent) => void;
    onPress?: (e: PointerEvent) => void;
    onRelease?: (e: PointerEvent) => void;
}) => {
    const sampleHolderRef = useRef<HTMLDivElement | null>(null);
    const onMouseMove = useCallback((e: PointerEvent) => {
        onMoving?.(e);
    }, []);
    const onMouseUp = useCallback((e: PointerEvent) => {
        if (e.currentTarget && e.currentTarget === sampleHolderRef.current) {
            sampleHolderRef.current.releasePointerCapture(e.pointerId);
            sampleHolderRef.current.removeEventListener(
                'pointermove',
                onMouseMove
            );
            sampleHolderRef.current.removeEventListener('pointerup', onMouseUp);
            onRelease?.(e);
        }
    }, []);
    const onMouseDown = useCallback((e: PointerEvent) => {
        if (e.currentTarget && e.currentTarget === sampleHolderRef.current) {
            sampleHolderRef.current.setPointerCapture(e.pointerId);
            sampleHolderRef.current.addEventListener(
                'pointermove',
                onMouseMove
            );
            sampleHolderRef.current.addEventListener('pointerup', onMouseUp);
            onPress?.(e);
        }
    }, []);

    const onMount = (ref: HTMLDivElement | null) => {
        if (ref) {
            sampleHolderRef.current = ref;
            sampleHolderRef.current.addEventListener(
                'pointerdown',
                onMouseDown
            );
            // ref?.addEventListener('mousemove', onMouseMove);
            // ref?.addEventListener('mousemove', onMouseUp);
        }
    };
    const onUnmount = (ref: HTMLDivElement | null) => {
        if (sampleHolderRef.current) {
            sampleHolderRef.current.removeEventListener(
                'pointerdown',
                onMouseDown
            );
            sampleHolderRef.current = null;
        }
    };
    return {
        onMount,
        onUnmount,
    };
};

export default usePointerEvents;
