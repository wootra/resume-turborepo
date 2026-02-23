import type {
    Content,
    ImageDefinition,
    TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { getLineSvg } from './imageHandlers';

export const createPage = (
    content: Content,
    images: Record<string, string | ImageDefinition>
): TDocumentDefinitions => {
    return {
        pageSize: 'LETTER',

        // by default we use portrait, you can change it to landscape if you wish
        pageOrientation: 'portrait',

        // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
        pageMargins: [20, 40],
        content,
        images,
    };
};

export const createTitle = (title: string): Content[] => {
    return [
        { text: '', fontSize: 0, margin: [0, 20, 0, 0] },
        {
            text: title,
            fontSize: 20,
            color: '#0c8a28',
        },
        {
            ...getLineSvg('#0c8a28'),
            width: title.length * 8 + 20,
            alignment: 'left',
            marginTop: -3,
            marginBottom: 5,
        },
    ];
};

export const createSectionGap = (gap: number = 8): Content[] => {
    return [
        {
            text: '',
            margin: [gap, gap],
        },
    ];
};
