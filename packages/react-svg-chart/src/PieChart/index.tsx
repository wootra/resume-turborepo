import React from 'react';
import { PieByAngle } from './PieByAngle';
import { DefaultChart } from './consts';
import { PieChartProps } from './types';
import { getPreserveAspectRatio } from './getPreserveAspectRatio';
import { getPieAngles } from './getPieAngles';

export const PieChart: React.FC<PieChartProps> = props => {
    const {
        width,
        height,
        xRotate = 0,
        padding = DefaultChart.padding,
        colorSelector = DefaultChart.colorSelector,
        innerRadius = DefaultChart.innerRadius,
        data,
    } = props;
    const renderPie = getPieAngles(data, props.type);
    const yRatio = Math.cos((xRotate * Math.PI) / 180);

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
                x={padding.l}
                y={padding.t}
                viewBox='-120 -120 240 240'
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
                            distance={
                                props.selectedIndex === idx ? props.distance : 0
                            }
                            innerRadius={innerRadius}
                            yRatio={yRatio}
                            fill={d.fill ?? colorSelector(idx)}
                        />
                    );
                })}
            </svg>
        </svg>
    );
};
