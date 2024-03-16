import { checkVisible } from '@/utils/checkVisible';
import React, {
    useCallback,
    useEffect,
    useRef,
    type RefObject,
    useState,
} from 'react';
import * as d3 from 'd3';
type BallInfo = {
    xSpeed: number;
    ySpeed: number;
    x: number;
    y: number;
};
type Scales = {
    xScale: d3.ScaleLinear<number, number>;
    yScale: d3.ScaleLinear<number, number>;
    w: number;
    h: number;
};
const FRAME_LEN = 20;
const INIT_YACC = 0.09;
const SPEED_RESOLUTION = 0.01;
const MARGIN = 4;
const getScales = (ref: RefObject<HTMLDivElement | null>): Scales => {
    if (ref.current) {
        const size = {
            w: ref.current.clientWidth - MARGIN * 2,
            h: ref.current.clientHeight - MARGIN * 2,
        };
        if (size.w > size.h) {
            return {
                xScale: d3.scaleLinear([0, 100], [MARGIN, size.w]),
                yScale: d3.scaleLinear(
                    [0, (100 * size.h) / size.w],
                    [MARGIN, size.h]
                ),
                w: 100,
                h: (100 * size.h) / size.w,
            };
        } else {
            return {
                xScale: d3.scaleLinear(
                    [0, (100 * size.w) / size.h],
                    [MARGIN, size.w]
                ),
                yScale: d3.scaleLinear([0, 100], [MARGIN, size.h]),
                w: (100 * size.w) / size.h,
                h: 100,
            };
        }
    }
    throw new Error('ref cannot be null');
};

const getNextBallInfo = (
    prevBallInfo: BallInfo,
    timeDiff: number,
    acc: { x: number; y: number },
    scales: Scales
) => {
    const { xScale, yScale, w, h } = scales;

    const { xSpeed, ySpeed, x, y } = prevBallInfo;
    const x2 = x + xSpeed * timeDiff * SPEED_RESOLUTION;
    const y2 = y + ySpeed * timeDiff * SPEED_RESOLUTION;
    const xDir = x2 > w || x2 < -1 ? -1 : 1;
    const yDir = y2 > h || y2 < -1 ? -1 : 1;
    const ballInfo = {
        x:
            xDir > 0
                ? x2 // direction same
                : x2 < 0
                  ? 0
                  : w,
        y: yDir > 0 ? y2 : y2 < 0 ? 0 : h,
        xSpeed: (xSpeed + acc.x * timeDiff * SPEED_RESOLUTION) * xDir,
        ySpeed: (ySpeed + acc.y * timeDiff * SPEED_RESOLUTION) * yDir,
    };
    return ballInfo;
};

const GamificBackgroundPulse = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const animationRef = useRef<boolean>(false);
    const [isAnimnationOn, setIsAnimationOn] = useState(true);
    const isAnimnationOnRef = useRef<boolean>(isAnimnationOn);
    isAnimnationOnRef.current = isAnimnationOn;
    const prevFrameTime = useRef<number>(0);
    const ballRef = useRef<HTMLDivElement | null>(null);
    const ballInfoRef = useRef<BallInfo>({
        xSpeed: 1,
        ySpeed: 1,
        x: 0,
        y: 0,
    });
    const acc = useRef<{ x: number; y: number }>({ x: 0, y: INIT_YACC });
    const scalesRef = useRef<Scales | null>(null);
    const pulseCb = useCallback((frame: number) => {
        if (animationRef.current && containerRef.current && scalesRef.current) {
            const timeDiff = frame - prevFrameTime.current;
            if (timeDiff > FRAME_LEN) {
                ballInfoRef.current = getNextBallInfo(
                    ballInfoRef.current,
                    timeDiff,
                    acc.current,
                    scalesRef.current
                );
                if (ballRef.current && isAnimnationOnRef.current) {
                    const { xScale, yScale } = scalesRef.current;
                    ballRef.current.setAttribute(
                        'style',
                        `left: ${xScale(
                            ballInfoRef.current.x
                        )}px; top: ${yScale(ballInfoRef.current.y)}px`
                    );
                }
                prevFrameTime.current = frame;
            }
            window.requestAnimationFrame(pulseCb);
        }
    }, []);
    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                if (entry.contentBoxSize) {
                    const contentBoxSize = entry.contentBoxSize[0];
                    contentBoxSize.inlineSize;
                    const scales = getScales(containerRef);
                    scalesRef.current = scales;
                }
            }
        });

        const handler = () => {
            if (!checkVisible(containerRef.current)) {
                if (animationRef.current) {
                    animationRef.current = false;
                    resizeObserver.disconnect();
                }
                return;
            } else {
                if (!animationRef.current) {
                    animationRef.current = true;
                    window.requestAnimationFrame(pulseCb);
                    ballInfoRef.current = {
                        xSpeed: 1,
                        ySpeed: 1,
                        x: 0,
                        y: 0,
                    };
                    if (containerRef.current) {
                        const scales = getScales(containerRef);
                        scalesRef.current = scales;
                        resizeObserver.observe(containerRef.current);
                    }
                }
            }
        };
        if (containerRef.current) {
            const scales = getScales(containerRef);
            scalesRef.current = scales;
        }
        document.addEventListener('scrollend', handler);
        return () => {
            resizeObserver.disconnect();
            document.removeEventListener('scrollend', handler);
        };
    }, []);
    return (
        <div className='absolute inset-0' ref={containerRef}>
            <button
                onClick={() => setIsAnimationOn(state => !state)}
                className='absolute w-12 h-8 z-50 left-2 top-2 bg-red-200 text-black rounded-md hover:bg-red-50'
            >
                {isAnimnationOn ? 'OFF' : 'ON'}
            </button>
            <div
                ref={ballRef}
                className='bg-gradient-to-br from-slate-100 to-lime-900 w-4 h-4 absolute rounded-full z-50 animate-size-pulse'
            />
        </div>
    );
};

export default GamificBackgroundPulse;
