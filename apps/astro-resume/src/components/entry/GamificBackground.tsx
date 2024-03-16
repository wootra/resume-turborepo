import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { checkVisible } from '@/utils/checkVisible';
type Pos = {
    key: string;
    x: number;
    y: number;
    colorBase: number;
    color: string;
    size: number;
};
const NUM_OF_BOXES = 10;
const OPEN_RADIUS = NUM_OF_BOXES * 0.5;
const init = (setPoints: React.Dispatch<React.SetStateAction<Pos[]>>) => {
    const rows = Array(NUM_OF_BOXES)
        .fill(null)
        .map((_, i) => {
            return Array(NUM_OF_BOXES)
                .fill(null)
                .map((_, j) => {
                    const colorBase = Math.random() * 360;
                    const d = {
                        key: `${i}-${j}`,
                        x: i,
                        y: j,
                        size: 1,
                        colorBase,
                        color: `hsl(${colorBase}, 100%, 100%)`,
                    };

                    return d;
                });
        })
        .flat();
    return rows;
};

const GamificBackground = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [points, setPoints] = useState<Pos[]>([]);
    const pointLen = useRef<number>(0);
    pointLen.current = points.length;
    useEffect(() => {
        // if (ref.current) {
        if (pointLen.current === 0) {
            setPoints(init(setPoints));
        }
        setPoints(init(setPoints));
        const handler = () => {
            if (!checkVisible(ref.current)) {
                if (pointLen.current > 0) {
                    setPoints([]);
                }
                return;
            } else {
                if (pointLen.current === 0) {
                    setPoints(init(setPoints));
                }
            }
        };
        document.addEventListener('scrollend', handler);
        return () => {
            document.removeEventListener('scrollend', handler);
        };
        // }
    }, []);
    const onMouseMove: React.MouseEventHandler<HTMLDivElement> = useCallback(
        e => {
            if (ref.current) {
                if (!checkVisible(ref.current)) {
                    console.count('ignored!');
                    return;
                }
                const [px, py] = d3.pointer(e);

                const element = ref.current;
                const wid = element.clientWidth;
                const hig = element.clientHeight;
                const widScale = d3.scaleLinear([0, wid], [0, NUM_OF_BOXES]);
                const higScale = d3.scaleLinear([0, hig], [0, NUM_OF_BOXES]);
                const [sx, sy] = [widScale(px), higScale(py)];
                const newPoints: Pos[] = points.map(pos => {
                    const { x, y, size, colorBase } = pos;
                    const nSize = Math.min(
                        1,
                        Math.sqrt(
                            Math.pow(Math.abs(x - sx), 2) +
                                Math.pow(Math.abs(y - sy), 2)
                        ) / OPEN_RADIUS
                    );

                    if (nSize !== size) {
                        return {
                            ...pos,
                            color:
                                nSize === 1
                                    ? '#ffffff'
                                    : `hsl(${colorBase}, ${100 * size}%, ${
                                          100 * size
                                      }%)`,
                            size: nSize,
                        };
                    }

                    return pos;
                });

                setPoints(newPoints);
            }
        },
        [points]
    );

    return (
        <div
            ref={ref}
            className='absolute inset-0 z-50 flex items-center justify-center'
            onMouseMoveCapture={onMouseMove}
        >
            <svg
                className='w-full rounded-full'
                viewBox={`0 0 ${NUM_OF_BOXES} ${NUM_OF_BOXES}`}
            >
                {points.map(d => {
                    let size = d.size === 1 ? 1 : d.size * d.size * d.size;
                    if (size < 0.1) size = 0;
                    const x = d.size === 1 ? d.x : d.x + 1 / 2 - size / 2;
                    const y = d.size === 1 ? d.y : d.y + 1 / 2 - size / 2;

                    return (
                        <g
                            key={d.key}
                            transform={`translate(${x + 1 / 2},${y + 1 / 2})`}
                        >
                            <rect
                                x={-0.5}
                                y={-0.5}
                                rx={size === 1 ? 0 : 0.5 - size / 2}
                                ry={size === 1 ? 0 : 0.5 - size / 2}
                                style={
                                    size === 1
                                        ? {}
                                        : {
                                              transform: `rotate(${(
                                                  -90 * d.size
                                              ).toFixed(2)}deg)`,
                                          }
                                }
                                width={size * 1.1}
                                height={size * 1.1}
                                fill={d.color}
                                strokeWidth={0}
                                // stroke={d.color}
                                // strokeWidth={size}
                            />
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};

export default GamificBackground;
