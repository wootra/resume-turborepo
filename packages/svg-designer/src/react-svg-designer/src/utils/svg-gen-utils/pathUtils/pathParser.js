import parser from 'svg-path-parse';
import { PathObjects } from './consts';

export const parse = str => {
    const parsed = parser.pathParse(str).getSegments();
    if (parsed.err && parsed.err.length > 0) throw Error(parsed.err);
    else {
        return parsed.segments.map(seg => {
            switch (seg[0]) {
                case PathObjects.MOVE:
                    return {
                        type: seg[0],
                        x: seg[1],
                        y: seg[2],
                        seg,
                    };
                case PathObjects.LINE:
                    return {
                        type: seg[0],
                        x: seg[1],
                        y: seg[2],
                        seg,
                    };
                case PathObjects.ARC:
                    return {
                        type: seg[0],
                        x: seg[6],
                        y: seg[7],
                        width: seg[1],
                        height: seg[2],
                        bigArc: seg[4],
                        positive: seg[5],
                        seg,
                    };
                case PathObjects.CLOSE_PATH:
                default:
                    return {
                        type: seg[0],
                        seg,
                    };
            }
        });
    }
};
