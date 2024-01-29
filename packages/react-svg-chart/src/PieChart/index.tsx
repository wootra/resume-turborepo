import React from 'react';

type PipeDataCommon = {
    label: string;
    fill?: string;
    distance?: number;
};

type PieDataPercentage = PipeDataCommon & {
    percentage: number;
};

type PieDataAngle = PipeDataCommon & {
    angle: number;
};

type PieChartAutoPositions = {
    xAutoPos?: 'center' | 'left' | 'right';
    yAutoPos?: 'center' | 'top' | 'bottom';
};

type Padding = {
    l: number;
    t: number;
    r: number;
    b: number;
};

type PieData =
    | {
          type: 'percentage';
          data: PieDataPercentage[];
      }
    | {
          type: 'angle';
          data: PieDataAngle[];
      };

type Props = PieData &
    PieChartAutoPositions & {
        padding?: Padding;
        width: number;
        height: number;
        xRotate?: number;
    };

const defaultPadding: Padding = {
    l: 10,
    t: 10,
    r: 10,
    b: 10,
};

const colors = ['red', 'blue', 'green'];

export const PieChart = (props: Props) => {
    const {
        width,
        height,
        xRotate = 0,
        padding = defaultPadding,
        data,
    } = props;
    const renderPie = [];
    let angleSum = 0;
    for (let d of data) {
        if (props.type === 'percentage') {
            const { percentage, ...rest } = d as PieDataPercentage;
            const angle = percentage * 3.6;
            renderPie.push({
                startAngle: angleSum,
                endAngle: angleSum + angle,
                ...rest,
            });
            angleSum += angle;
        } else if (props.type === 'angle') {
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

    const yRatio = Math.cos((xRotate * Math.PI) / 180);
    const getDefaultColor = (idx: number) => {
        return colors[idx % colors.length];
    };

    return (
        <svg
            width={width}
            height={height}
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            viewBox={`0 0 ${width} ${height}`}
            // style={{ border: '1px solid #ccc' }}
        >
            <svg
                width={width - padding.l - padding.r}
                height={height - padding.t - padding.b}
                transform={`translate(${padding.l}, ${padding.t})`}
                viewBox='-55 -55 110 110'
                // viewBox={`0 0 ${width / 2} ${height / 2}`}
                preserveAspectRatio={getPreserveAspectRatio(props)}
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
            >
                {renderPie.map((d, idx) => {
                    return (
                        <PieByAngle
                            key={d.label}
                            {...d}
                            yRatio={yRatio}
                            fill={d.fill ?? getDefaultColor(idx)}
                        />
                    );
                })}
            </svg>
        </svg>
    );
};

const PieByAngle = (props: {
    startAngle: number;
    endAngle: number;
    label: string;
    fill?: string;
    distance?: number;
    yRatio: number;
}) => {
    const { startAngle, endAngle, label, fill, distance = 0, yRatio } = props;
    const radius = 50;
    const cx = 0;
    const cy = 0;
    const x1 = cx + radius * Math.cos((-startAngle * Math.PI) / 180);
    const y1 = cy + radius * Math.sin((-startAngle * Math.PI) / 180) * yRatio;
    const x2 = cx + radius * Math.cos((-endAngle * Math.PI) / 180);
    const y2 = cy + radius * Math.sin((-endAngle * Math.PI) / 180) * yRatio;
    const dx =
        cx +
        distance * Math.cos(((-(startAngle + endAngle) / 2) * Math.PI) / 180);
    const dy =
        cy +
        distance *
            Math.sin((-(startAngle + endAngle) * Math.PI) / 180) *
            yRatio;
    return (
        <path
            d={`M ${x1},${y1} A ${radius},${
                radius * yRatio
            } 0 0 0 ${x2},${y2} L ${cx},${cy} Z`}
            fill={fill}
            transform={`translate(${dx} ${dy})`}
            data-path={`[{'M':[${cx},${cy}]}, {'L':[${x1},${y1}]}, {'A':[${radius},${
                radius * yRatio
            },0,1,1, ${x2},${y2}]}}`}
        />
    );
};

const getPreserveAspectRatio = ({
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
