export const getHost = () => {
    const hostUrl = import.meta.env.VERCEL_URL ?? 'https://sh-jun.com';
    if (hostUrl.includes('localhost')) return `http://${hostUrl}`;
    else return `https://${hostUrl}`;
};
