import pdfMakePrinter from 'pdfmake';
import { FONT_DESCRIPTOR } from './consts';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';

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
