import path from 'node:path';
import fs from 'node:fs/promises';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async context => {
    const jpg = path.join(
        process.cwd(),
        import.meta.env.DEV ? '' : '',
        `assets/fonts3d/${context.params.font}`
    );
    const binary = await fs.readFile(jpg);
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Content-Disposition', 'attachment; filename=stone.jpg');
    headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    headers.set('Pragma', 'no-cache');
    headers.set('Expires', '0');
    return new Response(binary, {
        status: 200,
        headers,
    });
};

export function getStaticPaths() {
    return [{ params: { font: 'droid_sans_bold.typeface.json' } }];
}
