import { createElementInfo } from './renderUtils';

function createGroup(children, id, props = {}) {
    return createElementInfo('g', { ...props, id }, children);
}

export const group = createGroup;
export const pt = (x, y) => ({ x, y });
export const isPt = pt => {
    return pt.x !== undefined && pt.y !== undefined;
};
