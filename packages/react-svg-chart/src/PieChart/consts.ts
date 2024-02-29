import { Paddings } from '@/types';

const defaultColors = ['red', 'blue', 'green'] as const;
const getDefaultColor = (idx: number) => {
    return defaultColors[idx % defaultColors.length];
};

export const DefaultChart = Object.freeze({
    padding: {
        l: 10,
        t: 10,
        r: 10,
        b: 10,
    } as Paddings,
    colorSelector: getDefaultColor,
    innerRadius: 0,
});
