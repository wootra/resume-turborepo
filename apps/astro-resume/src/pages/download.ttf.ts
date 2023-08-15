import * as url from 'url';
import pdfMakePrinter from 'pdfmake';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { createPage, createSectionGap } from '../server-utils/pdf-utils';
import type { APIRoute } from 'astro';
// import fs from 'fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { CONTINUE_IN_NEXT_PAGE } from './_pdf-data/consts';

export async function get({ params, request }) {
    const p = new URLSearchParams(request.url.split('?')[1]);
    console.log('params?', params, 'request.url', request.url, 'p', p);
    const path = p.get('path').replace(/_/g, '/');
    console.log('changed:', path);
    // const response = await fs.readFile(path); // await fetch(path);
    const buffer = await fs.readFile(process.cwd() + path); // await fetch(path);
    // const buffer = Buffer.from(await response.arrayBuffer());
    return {
        body: buffer,
        encoding: 'binary',
    };
}

// const __filename = url.fileURLToPath(import.meta.url);
const getUrl = () => {
    return '';
    // if (import.meta.env.VERCEL_URL.includes('localhost')) {
    //     return `http://${import.meta.env.VERCEL_URL}`;
    // } else {
    //     return `https://${import.meta.env.VERCEL_URL}`;
    // }
};
