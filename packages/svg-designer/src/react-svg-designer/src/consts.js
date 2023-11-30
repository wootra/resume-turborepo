import circle from './images/circle.svg';
import none from './images/none.svg';
import path from './images/path.svg';
import rect from './images/rect.svg';
import text from './images/text.svg';

export const DrawingModes = Object.freeze({
    NONE: ['none', { src: none, title: 'no drawing', alt: 'N' }],
    PATH: ['path', { src: path, title: 'path', alt: 'Pa' }],
    RECT: ['rect', { src: rect, title: 'rectangle/square', alt: 'Rt' }],
    CIRCLE: ['circle', { src: circle, title: 'circle/ellipse', alt: 'Cr' }],
    TEXT: ['text', { src: text, title: 'text', alt: 'T' }],
    getName: drawingMode => drawingMode[0],
    getIcon: drawingMode => drawingMode[1],
});

export const HELP_HEIGHT = 20;
export const DRAW_OPTIONS_KEY = 'svg-designer-saved-options';
export const HISTORY_KEY = 'svg-designer-history';
export const VIEWBOX_KEY = 'view-box';
export const CONVERT_TO_MASK = 'convertToMask';
export const MASK_ID = 'maskId';
export const USE_MASK = 'mask';
export const DEFAULT_MASK_ID = 'my-mask';
export const keysToExclude = [
    'text',
    CONVERT_TO_MASK,
    'style',
    MASK_ID,
    USE_MASK,
];

export const keysToExcludeFromAttr = [
    'text',
    CONVERT_TO_MASK,
    MASK_ID,
    USE_MASK,
];
