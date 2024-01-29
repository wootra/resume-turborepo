import React from 'react';

type PieDataPercentage = {
    label: string;
    percentage: number;
};

type PieDataAngle = {
    label: string;
    percentage: number;
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

type Props = PieData & {
    width: number;
    height: number;
    xRotate?: number;
};

export const PieChart = ({ width, height, xRotate = 0, type, data }: Props) => {
    return (
        <svg width={width} height={height}>
            <svg viewBox='0 0 100 100' width='100%' height='100%'>
                <path d='M50 50 L50 10 A40 40 0 0 1 90 50 Z' fill='red' />
                <path d='M50 50 L90 50 A40 40 0 0 1 50 90 Z' fill='blue' />
                <path d='M50 50 L50 90 A40 40 0 0 1 10 50 Z' fill='green' />
                <path d='M50 50 L10 50 A40 40 0 0 1 50 10 Z' fill='yellow' />
            </svg>
        </svg>
    );
};
