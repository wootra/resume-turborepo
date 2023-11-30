/*******************************************************************************
 * Copyright (C) 2020
 * Songhyeon Jun(shjeon0730@gmail.com)
 * All Rights Reserved
 *
 * File: HorseShoeChart.js
 *******************************************************************************/
import React from 'react';
import svgUtil from '@shjeon0730/svg-gen-utils';

const createElementInfo = (...args) => {
    return svgUtil.renderer.createElementInfo(...args);
}

const parseColor = (colorItem, idx, totalArr) => {
    if (typeof colorItem === 'object') {
        if (colorItem.length !== null) {
            //colorItem is array
            if (colorItem.length === totalArr.length) {
                //array of colors for all levels
                colorItem = colorItem[idx];
                if (typeof colorItem !== 'string') {
                    throw Error(
                        'color should one of these : {(array of color:string) | (array of {boundary:[min:number,max:number], color:string}) | color:string '
                    );
                }
            } else if (colorItem.length > 0) {
                for (let item of colorItem) {
                    const { boundary, maxIdx, color } = item;
                    if (
                        !color ||
                        (!(
                            boundary &&
                            boundary.length === 2 &&
                            typeof boundary[0] === 'number' &&
                            typeof boundary[1] === 'number'
                        ) &&
                            !(maxIdx && typeof maxIdx === 'number'))
                    ) {
                        throw Error(
                            'wrong format: {boundary:[min:number,max:number], color:string} or {maxIdx:number, color:string}  is needed.'
                        );
                    }
                    if (boundary && idx >= boundary[0] && idx <= boundary[1]) return color;
                    if (idx <= maxIdx) return color;
                }
                return '#efefef'; //default color
            } else {
                throw Error('if you want to set colors for boundary, item should be more than 2');
            }
        }
    }

    if (typeof colorItem === 'string') return colorItem;
    else throw Error('color item should to be array or string');
};

const drawHorseShoe = (config = {}) => {
    const points = [];
    const toRad = ang => (ang / 180.0) * Math.PI;
    const angCos = ang => Math.cos(toRad(ang));
    const angSin = ang => Math.sin(toRad(ang));
    const levelBorderWidth = config.levelBorderWidth === undefined ? 1 : config.levelBorderWidth;

    const centerGap = config.centeGap || 60;
    const numOfUnits = config.numOfUnits || 8;
    const unitAngle = ((360 - centerGap + levelBorderWidth) * 1.0) / numOfUnits;
    const outRadius = config.outRadius || 50;
    const inRadius = config.inRadius || 40;
    const startAngle = 90 + centerGap / 2.0;
    const roundEdgeSize = (outRadius - inRadius) / 2.0;
    const filled = config.filled || 2;
    const offsetX = config.offsetX === undefined ? outRadius / 2.0 : config.offsetX;
    const offsetY = config.offsetY === undefined ? outRadius / 2.0 : config.offsetY;
    const selColor = config.selColor || '#12395b';
    const backColor = config.backColor || '#d8d8d8';
    const ptMulAdd = (pt, mul = 1, addX = 0, addY = undefined) => {
        addY = addY === undefined || addY === null ? addX : addY;
        return { x: pt.x * mul + addX, y: pt.y * mul + addY };
    };
    const getPt = svgUtil.pt;

    for (let i = 0; i < numOfUnits; i++) {
        points.push({
            start: getPt(angCos(startAngle + i * unitAngle), angSin(startAngle + i * unitAngle)),
            end: getPt(
                angCos(startAngle + (i + 1) * unitAngle - levelBorderWidth),
                angSin(startAngle + (i + 1) * unitAngle - levelBorderWidth)
            )
        });
    }

    // this graph has outbound, inbound, and startPt, endPt.
    // startPt and endPt is calculated based on the angle.
    // startAngle starts from 90 deg + gap/2.
    // 90 deg is bottom direction. each direction's axis is like thiis:
    // left: (-1,0), right: (1,0), top:(0, -1), bottom(0, 1).
    // when you multiply radius with the points which is calculated above, it will be the point in x-y plain.
    // ptMulAdd function is used to create a point with the distance from base point.
    return points.map((pt, idx, arr) => {
        let color = idx < filled ? selColor : backColor;
        let strokeColor = idx < filled ? 'black' : 'gray';
        color = parseColor(color, idx, arr);
        const key = 'level-' + idx;
        const moreProps = { key };
        if (idx === 0) {
            const startX = pt.start.x * inRadius + offsetX;
            const startY = pt.start.y * inRadius + offsetY;

            const pathUtil = svgUtil.path.default(getPt(startX, startY));
            const builder = pathUtil.element;

            const elements = [
                builder.arc(ptMulAdd(pt.start, outRadius, offsetX, offsetY), roundEdgeSize, 0, 1),
                builder.arc(ptMulAdd(pt.end, outRadius, offsetX, offsetY), outRadius, 0, 1),
                builder.line(ptMulAdd(pt.end, inRadius, offsetX, offsetY)),
                builder.arc(ptMulAdd(pt.start, inRadius, offsetX, offsetY), inRadius, 0, 0)
            ];
            return pathUtil.render(elements, strokeColor, color, '0.1', moreProps);
        } else if (idx === arr.length - 1) {
            const startX = pt.start.x * outRadius + offsetX;
            const startY = pt.start.y * outRadius + offsetY;

            const pathUtil = svgUtil.path.default(getPt(startX, startY));
            const builder = pathUtil.element;

            const elements = [
                builder.arc(ptMulAdd(pt.end, outRadius, offsetX, offsetY), outRadius, 0, 1),
                builder.arc(ptMulAdd(pt.end, inRadius, offsetX, offsetY), roundEdgeSize, 0, 1),
                builder.arc(ptMulAdd(pt.start, inRadius, offsetX, offsetY), inRadius, 0, 0),
                builder.line(ptMulAdd(pt.start, outRadius, offsetX, offsetY))
            ];
            return pathUtil.render(elements, strokeColor, color, '0.1', moreProps);
        } else {
            const startX = pt.start.x * outRadius + offsetX;
            const startY = pt.start.y * outRadius + offsetY;

            const pathUtil = svgUtil.path.default(getPt(startX, startY));
            const builder = pathUtil.element;

            const elements = [
                builder.arc(ptMulAdd(pt.end, outRadius, offsetX, offsetY), outRadius, 0, 1),
                builder.line(ptMulAdd(pt.end, inRadius, offsetX, offsetY)),
                builder.arc(ptMulAdd(pt.start, inRadius, offsetX, offsetY), inRadius, 0, 0),
                builder.line(ptMulAdd(pt.start, outRadius, offsetX, offsetY))
            ];
            return pathUtil.render(elements, strokeColor, color, '0.1', moreProps);
        }
    });
};

const drawCenterTexts = (centerTexts = [], offsetX = 0, offsetY = 0) => {
    const txtUtil = svgUtil.text;
    if (centerTexts.length) {
        return txtUtil.drawCenterTexts(centerTexts, { x: offsetX, y: offsetY });
    } else if (centerTexts.items && centerTexts.defaultOptions) {
        return txtUtil.drawCenterTexts(centerTexts.items, { x: offsetX, y: offsetY }, centerTexts.defaultOptions);
    } else {
        throw Error("centerTexts must be [textItem1, ...] or {items:[string,...], defaultOptions:{...}}. \n received:" + JSON.stringify(centerTexts));
    }

};


export const horseShoeChart = (props = { children: [] }) => {
    let { config, centerTexts, ...rest } = props;
    const propConfig = config || {};
    config = {
        outRadius: 50,
        inRadius: 40,
        numOfUnits: 8,
        levelBorderWidth: 2,
        filled: 2,
        centeGap: 60,
        offsetX: 0,
        offsetY: 0,
        rotate: 0,
        selColor: [{ boundary: [0, 7], color: '#12395b' }],
        backColor: [
            { maxIdx: 1, color: '#fff0f0' },
            { maxIdx: 5, color: '#fffeef' },
            { maxIdx: 7, color: '#efffef' }
        ],
        ...propConfig
    };
    const transform = 'rotate(' + config.rotate + ' 0 0)';

    const viewBoxWidth = config.outRadius * 2 + 2; //2 is right/left margin
    const viewBoxHeight = config.outRadius * 2 + 2; //2 is top/bottom margin
    const id = props.id || 'horseShoe' + Math.round(Math.random() * 100000);
    const descId = 'desc-id';
    const titleId = 'title-id';
    const left = -config.outRadius - 1; //-1 is left margin
    const top = -config.outRadius - 1; // -1 is top margin
    return svgUtil.renderer.renderSvgInfo(left, top, viewBoxWidth, viewBoxHeight, {
        id,
        'aria-labelledby': [titleId, descId].join(' '),
        ...rest
    }, [
        createElementInfo('title', { id: titleId }, 'svg shoechart'),
        createElementInfo('desc', { id: descId }, 'svg shoehorse'),
        createElementInfo('g', { id: "horseShoe", transform }, drawHorseShoe(config)),
        centerTexts ? createElementInfo('g', { id: "centerText", focusable: "true" }, drawCenterTexts(centerTexts, config.offsetX, config.offsetY)) : ""
    ]);
};

export default function (props) {
    const chart = horseShoeChart(props);
    return svgUtil.renderer.svgRender(React.createElement, 0, 0, 100, 100, {}, [chart]);
};
