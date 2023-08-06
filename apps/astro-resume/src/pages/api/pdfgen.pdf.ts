import {
    createPage,
    createPdfBinary,
    createSectionGap,
} from '../../server-utils/pdf-utils';
import type { APIRoute } from 'astro';
import * as topSection from '../../components/TopSection/pdf';
import * as leftSection from '../../components/LeftSection/pdf';
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
