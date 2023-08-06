import pdfMakePrinter from 'pdfmake';
import { FONT_DESCRIPTOR } from './consts';
import type {
    Content,
    ImageDefinition,
    TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { getLineSvg } from './imageHandlers';

export async function createPdfBinary(
    pdfDoc: TDocumentDefinitions
): Promise<Buffer> {
    return new Promise((res, rej) => {
        var fontDescriptors = FONT_DESCRIPTOR;

        const printer = new pdfMakePrinter(fontDescriptors);

        const doc = printer.createPdfKitDocument(pdfDoc);
        const chunks: any[] = [];
        let result;

        doc.on('data', function (chunk) {
            chunks.push(chunk);
        });
        doc.on('end', function () {
            result = Buffer.concat(chunks);
            res(result);
        });
        doc.end();
    });
}

export const createPage = (
    content: Content,
    images: Record<string, string | ImageDefinition>
): TDocumentDefinitions => {
    return {
        pageSize: 'LETTER',

        // by default we use portrait, you can change it to landscape if you wish
        pageOrientation: 'portrait',

        // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
        pageMargins: [20, 10],
        content,
        images,
    };
};

export const createTitle = (title: string): Content[] => {
    return [
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
