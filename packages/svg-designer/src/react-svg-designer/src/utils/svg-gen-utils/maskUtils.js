import { createElementInfo } from './renderUtils';
const maskType = 'maskObj';

export function useMask(id) {
    return { mask: 'url(#' + id + ')' };
}

const unmaskables = ['g'];

const fromElement = (elementInfo, transparency = 0.0) => {
    if (elementInfo.children && elementInfo.children.length) {
        elementInfo.children = elementInfo.children.map(child =>
            fromElement(child, transparency)
        );
    } else {
        //add fill
        return unmaskables.includes(elementInfo.tagName)
            ? elementInfo
            : createElementInfo(elementInfo.tagName, {
                  ...elementInfo.attributes,
                  fill: `rgb(${transparency},${transparency},${transparency})`,
              });
    }
};

export const maskElements = {
    rect: (x, y, width, height, transparency = 0.0) => {
        return {
            type: maskType,
            transparency,
            element: createElementInfo('rect', {
                x,
                y,
                width,
                height,
                fill: `rgb(${transparency},${transparency},${transparency})`,
            }),
        };
    },
    fromElement,
};

export function createMaskElement(element, id) {
    if (element && element.length) {
        return createElementInfo('mask', { id }, element);
    } else {
        return createElementInfo('mask', { id }, [element]);
    }
}
