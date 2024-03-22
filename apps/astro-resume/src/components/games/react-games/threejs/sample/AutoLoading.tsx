import { useState, useEffect } from 'react';
// @ts-ignore
import Styles from './Loading.module.css';
import Loading from './Loading';
const SIZE = '6rem';
const THICK = '0.5rem';

const AutoLoading = ({ loadingTime }: { loadingTime: number }) => {
    const [percentage, setPercentage] = useState(0);
    const inc = loadingTime / 100;
    useEffect(() => {
        const id = setInterval(() => {
            setPercentage(p => (p + inc) % 110);
        }, 100);
        return () => {
            clearInterval(id);
        };
    }, [inc]);
    return (
        <div className='w-full h-full grid place-items-center'>
            <Loading percentage={percentage} />
        </div>
    );
};

export default AutoLoading;
