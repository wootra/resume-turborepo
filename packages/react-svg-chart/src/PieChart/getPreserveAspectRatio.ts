import { PieChartAutoPositions } from './types';

export const getPreserveAspectRatio = ({
    xAutoPos,
    yAutoPos,
}: PieChartAutoPositions) => {
    let x = 'Mid';
    let y = 'Mid';
    switch (xAutoPos) {
        case 'center':
            x = 'Mid';
            break;
        case 'left':
            x = 'Min';
            break;
        case 'right':
            x = 'Max';
            break;
        default:
            break;
    }

    switch (yAutoPos) {
        case 'center':
            y = 'Mid';
            break;
        case 'top':
            y = 'Min';
            break;
        case 'bottom':
            y = 'Max';
            break;
        default:
            break;
    }
    return `x${x}Y${y} meet`;
};
