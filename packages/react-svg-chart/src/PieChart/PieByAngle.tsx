import React from 'react';

const createD = ({
    radius,
    startAngle,
    endAngle,
    innerRadius,
    yRatio,
    distance,
}: {
    radius: number;
    startAngle: number;
    endAngle: number;
    innerRadius: number;
    yRatio: number;
    distance: number;
}) => {
    const dx =
        distance *
        Math.cos((-(startAngle + (endAngle - startAngle) / 2) * Math.PI) / 180);
    const dy =
        distance *
        Math.sin(
            (-(startAngle + (endAngle - startAngle) / 2) * Math.PI) / 180
        ) *
        yRatio;

    const startAngleRadian = (-startAngle * Math.PI) / 180;
    const cx1 = innerRadius * Math.cos(startAngleRadian) + dx;
    const cy1 = innerRadius * Math.sin(startAngleRadian) * yRatio + dy * yRatio;
    const cx2 = innerRadius * Math.cos((-endAngle * Math.PI) / 180) + dx;
    const cy2 =
        innerRadius * Math.sin((-endAngle * Math.PI) / 180) * yRatio +
        dy * yRatio;
    const x1 = radius * Math.cos(startAngleRadian) + dx;
    const y1 = radius * Math.sin(startAngleRadian) * yRatio + dy * yRatio;
    const x2 = radius * Math.cos((-endAngle * Math.PI) / 180) + dx;
    const y2 =
        radius * Math.sin((-endAngle * Math.PI) / 180) * yRatio + dy * yRatio;

    const isAngleOverHalf = endAngle - startAngle > 180;
    const bigArc = isAngleOverHalf ? 1 : 0;
    if (innerRadius === 0) {
        const d = `M ${x1},${y1} A ${radius},${
            radius * yRatio
        } 0 ${bigArc} 0 ${x2},${y2} L ${cx2},${cy2} Z`;

        const dataPath = `[{'M':[${cx1},${cy1}]}, {'A':[${radius},${
            radius * yRatio
        },0,${bigArc},0, ${x2},${y2}]}, {'L':[${x1},${y1}]}}`;
        return { d, dataPath };
    } else {
        const d = `M ${x1},${y1} A ${radius},${
            radius * yRatio
        } 0 ${bigArc} 0 ${x2},${y2} L ${cx2},${cy2} A ${innerRadius},${
            innerRadius * yRatio
        } 0 ${bigArc} 1 ${cx1},${cy1} Z`;

        const dataPath = `[{'M':[${cx1},${cy1}]}, {'L':[${x1},${y1}]}, {'A':[${radius},${
            radius * yRatio
        },0,${bigArc},0, ${x2},${y2}]}}`;
        return { d, dataPath };
    }
};

const radius = 100;
type Props = {
    startAngle: number;
    endAngle: number;
    label: string;
    fill?: string;
    distance?: number;
    yRatio: number;
    innerRadius?: number;
};

export const PieByAngle: React.FC<Props> = props => {
    const {
        startAngle,
        endAngle,
        label,
        fill,
        distance = 0,
        yRatio = 1,
        innerRadius = 0,
    } = props;

    const { d, dataPath } = createD({
        radius,
        startAngle,
        endAngle,
        innerRadius,
        yRatio,
        distance,
    });

    return (
        <path
            d={d}
            data-label={label}
            fill={fill}
            transform={`translate(${0} ${0})`}
            data-path={dataPath}
        />
    );
};
