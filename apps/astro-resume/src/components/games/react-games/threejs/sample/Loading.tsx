import { type CSSProperties } from 'react';
// @ts-ignore
import Styles from './Loading.module.css';
const SIZE = '6rem';
const THICK = '0.5rem';

const Loading = ({ percentage }: { percentage: number }) => {
    return (
        <div
            className={`grid place-items-center rounded-full bg-slate-400 relative ${Styles.loading}`}
            style={{
                width: `${SIZE}`,
                aspectRatio: 1,
            }}
        >
            <div
                className={Styles.loadingIn1}
                style={
                    {
                        '--startPercentage': 0,
                        '--percentage': `${percentage <= 50 ? percentage : 50}`,
                    } as CSSProperties
                }
                data-display={'true'}
            ></div>
            <div
                className={Styles.loadingIn2}
                style={
                    {
                        '--startPercentage': 50,
                        '--percentage': `${
                            percentage > 50 ? percentage - 40 : 0
                        }`,
                    } as CSSProperties
                }
                data-display={percentage > 50}
            ></div>
            <div
                className='rounded-full bg-white grid place-items-center z-10'
                style={{
                    width: `calc(${SIZE}-calc(${THICK}*2))`,
                    aspectRatio: 1,
                }}
            >
                LOADING...
            </div>
        </div>
    );
};

export default Loading;
