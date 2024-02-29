import { Paddings } from './../types';

export type PipeDataCommon = {
    label: string;
    fill?: string;
    distance?: number;
};

export type PieDataPercentage = PipeDataCommon & {
    percentage: number;
};

export type PieDataAngle = PipeDataCommon & {
    angle: number;
};

export type PieChartAutoPositions = {
    xAutoPos?: 'center' | 'left' | 'right';
    yAutoPos?: 'center' | 'top' | 'bottom';
};

export type PieData =
    | {
          type: 'percentage';
          data: PieDataPercentage[];
      }
    | {
          type: 'angle';
          data: PieDataAngle[];
      };
export type DistanceProps =
    | {
          selectedIndex: number;
          distance?: number;
      }
    | {
          selectedIndex?: undefined;
      };
export type PieChartProps = PieData &
    PieChartAutoPositions &
    DistanceProps & {
        padding?: Paddings;
        width: number;
        height: number;
        xRotate?: number;
        innerRadius?: number;
        colorSelector?: (idx: number) => string;
    };
