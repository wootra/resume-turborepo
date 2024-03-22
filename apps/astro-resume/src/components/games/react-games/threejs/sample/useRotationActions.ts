import React, { useRef } from 'react';
import * as THREE from 'three';
import usePointerEvents from './usePointerEvents';

const useRotationActions = () => {
    const targetAngleYRef = useRef(0);
    const targetAngleYOnPressRef = useRef(0);
    const startXPosRef = useRef(0);
    const targetAngleXRef = useRef(0);
    const targetAngleXOnPressRef = useRef(0);
    const startYPosRef = useRef(0);
    const customMovingRef = useRef(false);
    const onPress = (e: PointerEvent) => {
        customMovingRef.current = true;
        startXPosRef.current = e.clientX;
        startYPosRef.current = e.clientY;
        targetAngleYOnPressRef.current = targetAngleYRef.current;
        targetAngleXOnPressRef.current = targetAngleXRef.current;
    };
    const onRelease = (e: PointerEvent) => {
        customMovingRef.current = false;
    };
    const onMoving = (e: PointerEvent) => {
        const diffX = e.clientX - startXPosRef.current;
        const diffY = e.clientY - startYPosRef.current;
        targetAngleYRef.current = targetAngleYOnPressRef.current + diffX * 0.02;
        targetAngleXRef.current = targetAngleXOnPressRef.current + diffY * 0.02;
    };
    const rotateGroupOnPointer = (
        group: THREE.Group | THREE.Mesh | THREE.Line,
        controls: ('x' | 'y')[] = ['x', 'y'],
        onNoPointer?: () => void
    ) => {
        if (customMovingRef.current) {
            if (controls.includes('y')) {
                group.rotation.y =
                    group.rotation.y +
                    (targetAngleYRef.current - group.rotation.y) * 0.05;
            }
            if (controls.includes('x')) {
                group.rotation.x =
                    group.rotation.x +
                    (targetAngleXRef.current - group.rotation.x) * 0.05;
            }
        } else {
            if (onNoPointer) {
                onNoPointer?.();
            } else {
                if (controls.includes('y')) {
                    group.rotation.y += 0.005;
                }
                if (controls.includes('x')) {
                    group.rotation.x += 0.002;
                }
            }

            targetAngleYRef.current = group.rotation.y % 360;
            targetAngleXRef.current = group.rotation.x % 360;
        }
    };
    const { onMount, onUnmount } = usePointerEvents({
        onPress,
        onMoving,
        onRelease,
    });
    return {
        targetAngleYRef,
        targetAngleYOnPressRef,
        startXPosRef,
        customMovingRef,
        onPress,
        onRelease,
        onMoving,
        rotateGroupOnPointer,
        onMount,
        onUnmount,
    };
};

export default useRotationActions;
