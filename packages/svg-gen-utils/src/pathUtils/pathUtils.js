import { createElementInfo } from '../renderUtils';
import { isPt, pt } from '../etcUtils';

const getArcRad = rad => {
    if (typeof rad === 'number') return [rad.toFixed(3), rad.toFixed(3)];
    if (typeof rad === 'object') {
        if (rad.length === 2) return rad;
        else if (
            typeof rad.width === 'number' &&
            typeof rad.height === 'number'
        )
            return [rad.width.toFixed(3), rad.height.toFixed(3)];
        else if (typeof rad.w === 'number' && typeof rad.h === 'number')
            return [rad.w.toFixed(3), rad.h.toFixed(3)];
        else throw Error('use number or [w,h] or {w,h} or {width, height}');
    } else throw Error('use number or array or object');
};

export const pathUtils = startPt => {
    let currPt = startPt;

    // const getFromPt = (to, withoutSaving) => {
    //     if (withoutSaving) return currPt;
    //     const from = currPt;
    //     currPt = to;
    //     return from;
    // };

    return {
        startPt: () => startPt,
        render: (pathElements, strokeColor, fillColor, strokeWidth, rest) => {
            // render function will render path tag based on the path elements which comes from element.{line|arc}
            // parameters:
            // pathElements :
            //   array of strings that are created by element.{line|arc} methods
            // strokeColor:
            //   color string - ex> red | #ff0000 | rgb(0,0,0) | rgba(0,0,0,0.5)
            // fillColor : color String
            // strokeWidth : number - ex> 1 | 0.1
            // rest : object for more property in path tag

            let d = pathElements.join(' ');
            d =
                'M ' +
                startPt.x.toFixed(3) +
                ',' +
                startPt.y.toFixed(3) +
                ' ' +
                d;
            return createElementInfo('path', {
                d: d + ' Z',
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                ...rest,
            });
        },
        unclosedRender: (
            pathElements,
            strokeColor,
            fillColor,
            strokeWidth,
            rest
        ) => {
            // render function will render path tag based on the path elements which comes from element.{line|arc}
            // parameters:
            // pathElements :
            //   array of strings that are created by element.{line|arc} methods
            // strokeColor:
            //   color string - ex> red | #ff0000 | rgb(0,0,0) | rgba(0,0,0,0.5)
            // fillColor : color String
            // strokeWidth : number - ex> 1 | 0.1
            // rest : object for more property in path tag

            let d = pathElements.join(' ');
            d =
                'm ' +
                startPt.x.toFixed(3) +
                ',' +
                startPt.y.toFixed(3) +
                ' ' +
                d;
            return createElementInfo('path', {
                d: d,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                ...rest,
            });
        },
        pt,
        element: {
            line: to => {
                // line functiioni create a line element for path tag calculating the relatvie position from the starting point
                // parameters:
                // to : the absolute point {x:number,y:number} which the line will end.
                if (!isPt(to))
                    throw Error(
                        'argument to should be pt. use pt(x,y) function'
                    );

                const lineTo = [to.x.toFixed(3), to.y.toFixed(3)].join(',');
                return 'L' + lineTo;
            },
            arc: (to, arcRad, bigArc, positiveArc) => {
                if (!isPt(to))
                    throw Error(
                        'argument to should be pt. use pt(x,y) function'
                    );
                // arc function creates an arc element for path tag calculating the relative position from the starting point.
                // parameters:
                // to: the absolute point {x:number,y:number} for the end point of the arc.
                //    start point will be the last ending point of previous action.
                //    but this class will manage the previous point.
                // arcRad : should be one of these
                //    radius : number - will draw an arc from a circle with radius
                //    {w:number, h:number} or {width:number, height:number} - will draw an arc from an ellipse with width=w, height=h
                //    [w:number,h:number] - same with above. but arcRad[0] is width, arcRad[1] is height.
                // bigArc :
                //    1: if distance from starting point to end point is shorter than radius, draw bigger side of circle or ellipse.
                //    0: take shorter side
                // positiveArc :
                //    1: arc hat side is +. if direction is left to right, hat side will be up. if direction is bottom to top, hat siide will be left.
                //    0: arc hat side is -.

                const arcTo = [to.x.toFixed(3), to.y.toFixed(3)].join(',');
                const aRad = getArcRad(arcRad).join(',');
                const arcStyle = [bigArc, positiveArc].join(',');
                const angle = 0; //always 0
                return ['A' + aRad, angle, arcStyle, arcTo].join(' ');
            },
            qCurve: (to, mid1) => {
                const curveEndPt = [to.x.toFixed(3), to.y.toFixed(3)].join(',');
                const curveMid1Pt = [mid1.x.toFixed(3), mid1.y.toFixed(3)].join(
                    ','
                );

                return ['Q', curveMid1Pt, curveEndPt].join(' ');
            },
            cCurve: (to, mid1, mid2) => {
                const curveEndPt = [to.x.toFixed(3), to.y.toFixed(3)].join(',');
                const curveMid1Pt = [mid1.x.toFixed(3), mid1.y.toFixed(3)].join(
                    ','
                );
                const curveMid2Pt = [mid2.x.toFixed(3), mid2.y.toFixed(3)].join(
                    ','
                );

                return ['C', curveMid1Pt, curveMid2Pt, curveEndPt].join(' ');
            },
            sCurve: (to, mid1) => {
                const curveEndPt = [to.x.toFixed(3), to.y.toFixed(3)].join(',');
                const curveMid1Pt = [mid1.x.toFixed(3), mid1.y.toFixed(3)].join(
                    ','
                );

                return ['S', curveMid1Pt, curveEndPt].join(' ');
            },
        },
    };
};

export default pathUtils;
