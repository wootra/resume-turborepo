/// <reference types="astro/client" />

interface ImportMetaEnv {
    VERCEL_URL: string;
    NODE_ENV: 'development' | 'production';
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
