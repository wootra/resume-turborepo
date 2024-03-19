import path from 'node:path';
import fs from 'node:fs/promises';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async context => {
    console.log('loading image:');
    const img = context.params.image ?? 'f-texture.png';
    const jpg = path.join(
        process.cwd(),
        import.meta.env.DEV ? '' : '', // 'apps/astro-resume',
        `assets/textures/${img}`
    );
    const binary = await fs.readFile(jpg);
    const imgType = img.includes('.jpg') ? 'image/jpeg' : 'image/png';
    const headers = new Headers();
    headers.set('Content-Type', imgType);
    headers.set('Content-Disposition', `attachment; filename=${img}`);
    headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    headers.set('Pragma', 'no-cache');
    headers.set('Expires', '0');
    return new Response(binary, {
        status: 200,
        headers,
    });
};
