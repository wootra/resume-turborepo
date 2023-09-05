import pdfMakePrinter from 'pdfmake';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { createPage, createSectionGap } from '../../server-utils/pdf-utils';
import type { APIRoute } from 'astro';
import * as topSection from './_pdf-data/top-info';
import * as introduction from './_pdf-data/introduction';
import * as career from './_pdf-data/career';
import * as education from './_pdf-data/education';
import * as skillLevels from './_pdf-data/skill-levels';
import * as moreAchievements from './_pdf-data/more-achievements';
import path from 'node:path';
import { CONTINUE_IN_NEXT_PAGE } from './_pdf-data/consts';

export const get: APIRoute = async () => {
    try {
        const top = await topSection.createPdfMake();
        const introductionDoc = await introduction.createPdfMake();
        const careerDoc = await career.createPdfMake();
        const educationDoc = await education.createPdfMake();
        const skillLevelsDoc = await skillLevels.createPdfMake();
        const moreAchievementsDoc = await moreAchievements.createPdfMake();
        const topImage = await topSection.getImageMap();

        const sectionGap = createSectionGap();
        const dd = createPage(
            [
                ...top,
                ...sectionGap,
                ...introductionDoc,
                ...careerDoc,
                ...educationDoc,
                {
                    text: '...continue in the next page',
                    pageBreak: 'after',
                    fontSize: 10,
                    margin: [0, 20, 0, 0],
                },
                ...skillLevelsDoc,
                CONTINUE_IN_NEXT_PAGE,
                ...moreAchievementsDoc,
            ],
            {
                ...topImage,
            }
        );
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

export async function createPdfBinary(
    pdfDoc: TDocumentDefinitions
): Promise<Buffer> {
    const robotoRegular = path.join(
        process.cwd(),
        import.meta.env.DEV ? '' : 'apps/astro-resume',
        'assets/fonts/RobotoCondensed-Regular.ttf'
    );
    const robotoBold = path.join(
        process.cwd(),
        import.meta.env.DEV ? '' : 'apps/astro-resume',
        'assets/fonts/RobotoCondensed-Bold.ttf'
    );
    const robotoItalic = path.join(
        process.cwd(),
        import.meta.env.DEV ? '' : 'apps/astro-resume',
        'assets/fonts/RobotoCondensed-Italic.ttf'
    );
    const robotoBoldItalic = path.join(
        process.cwd(),
        import.meta.env.DEV ? '' : 'apps/astro-resume',
        'assets/fonts/RobotoCondensed-BoldItalic.ttf'
    );
    const openSansEmoji = path.join(
        process.cwd(),
        import.meta.env.DEV ? '' : 'apps/astro-resume',
        'assets/fonts/OpenSansEmoji.ttf'
    );

    const FONT_DESCRIPTOR = {
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

    return new Promise((res, _rej) => {
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
