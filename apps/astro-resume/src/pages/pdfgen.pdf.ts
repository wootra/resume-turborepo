import * as url from 'url';
import pdfMakePrinter from 'pdfmake';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { createPage, createSectionGap } from '../server-utils/pdf-utils';
import type { APIRoute } from 'astro';
import * as topSection from '../components/TopSection/pdf';
import * as leftSection from '../components/LeftSection/pdf';
import path from 'path';
export const get: APIRoute = async () => {
    try {
        const top = await topSection.createPdfMake();
        const left = await leftSection.createPdfMake();
        const topImage = await topSection.getImageMap();
        const leftImage = await leftSection.getImageMap();
        const sectionGap = createSectionGap();
        const dd = createPage([...top, ...sectionGap, ...left], {
            ...topImage,
            ...leftImage,
        });
        const binary = await createPdfBinary(dd);
        const headers = new Headers();
        headers.set('Content-Type', 'application/pdf');
        headers.set(
            'Content-Disposition',
            'attachment; filename=songhyeon-jun.resume.pdf'
        );
        headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        headers.set('Pragma', 'no-cache');
        headers.set('Expires', '0');
        return new Response(binary, {
            status: 200,
            headers,
        });
    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({ error: e }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
            statusText: (e as Error).message,
        });
    }
};

// const __filename = url.fileURLToPath(import.meta.url);

const robotoRegular = path.join(
    process.cwd(),
    'src',
    '/assets/fonts/RobotoCondensed-Regular.ttf'
);
const robotoBold = path.join(
    process.cwd(),
    'src',
    '/assets/fonts/RobotoCondensed-Bold.ttf'
);
const robotoItalic = path.join(
    process.cwd(),
    'src',
    '/assets/fonts/RobotoCondensed-Italic.ttf'
);
const robotoBoldItalic = path.join(
    process.cwd(),
    'src',
    '/assets/fonts/RobotoCondensed-BoldItalic.ttf'
);
const openSansEmoji = path.join(
    process.cwd(),
    'src',
    '/assets/fonts/OpenSansEmoji.ttf'
);

export const FONT_DESCRIPTOR = {
    RobotoCondensed: {
        normal: robotoRegular,
        bold: robotoBold,
        italics: robotoItalic,
        bolditalics: robotoBoldItalic,
    },
    Roboto: {
        normal: robotoRegular,
        bold: robotoBold,
        italics: robotoItalic,
        bolditalics: robotoBoldItalic,
    },

    Emoji: {
        // https://en.wikipedia.org/w/index.php?title=Emoji&oldid=557685103#ref_U1F680_as_of_Unicode_version
        normal: openSansEmoji,
        bold: openSansEmoji,
        italics: openSansEmoji,
        bolditalics: openSansEmoji,
    },
};

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
