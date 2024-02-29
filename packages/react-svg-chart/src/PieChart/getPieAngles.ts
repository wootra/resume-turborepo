import { PieDataAngle, PieDataPercentage } from './types';

export const getPieAngles = (
    data: PieDataPercentage[] | PieDataAngle[],
    type: 'percentage' | 'angle'
) => {
    const renderPie = [];
    let angleSum = 0;
    for (let d of data) {
        if (type === 'percentage') {
            const { percentage, ...rest } = d as PieDataPercentage;
            const angle = percentage * 3.6; // 360/100 = 3.6
            renderPie.push({
                startAngle: angleSum,
                endAngle: angleSum + angle,
                ...rest,
            });
            angleSum += angle;
        } else if (type === 'angle') {
            const { angle, ...rest } = d as PieDataAngle;
            renderPie.push({
                startAngle: angleSum,
                endAngle: angleSum + angle,
                ...rest,
            });
            angleSum += angle;
        } else {
            throw new Error('Invalid data type');
        }
    }
    return renderPie;
};
