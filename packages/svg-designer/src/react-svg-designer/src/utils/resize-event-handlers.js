import { useEffect } from 'react';

export const useResizeEvent = ({ onResize }) => {
    useEffect(() => {

        const onResizeCallback = (e) => {
            onResize(e);
        };

        window.addEventListener('resize', onResizeCallback);
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener('resize', onResizeCallback);
        };
    }, [onResize]); // Empty array ensures that effect is only run on mount and unmount

}