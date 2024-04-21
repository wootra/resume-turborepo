/// <reference types="astro/client" />

interface ImportMetaEnv {
    VERCEL_URL: string;
    NODE_ENV: 'development' | 'production';
    POSTGRES_DATABASE: string;
    POSTGRES_HOST: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_PRISMA_URL: string;
    POSTGRES_URL: string;
    POSTGRES_URL_NON_POOLING: string;
    POSTGRES_USER: string;
    TURBO_REMOTE_ONLY: string;
    TURBO_RUN_SUMMARY: string;
    VERCEL: string;
    VERCEL_ENV: string;
    VERCEL_GIT_COMMIT_AUTHOR_LOGIN: string;
    VERCEL_GIT_COMMIT_AUTHOR_NAME: string;
    VERCEL_GIT_COMMIT_MESSAGE: string;
    VERCEL_GIT_COMMIT_REF: string;
    VERCEL_GIT_COMMIT_SHA: string;
    VERCEL_GIT_PREVIOUS_SHA: string;
    VERCEL_GIT_PROVIDER: string;
    VERCEL_GIT_PULL_REQUEST_ID: string;
    VERCEL_GIT_REPO_ID: string;
    VERCEL_GIT_REPO_OWNER: string;
    VERCEL_GIT_REPO_SLUG: string;
    VERCEL_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
