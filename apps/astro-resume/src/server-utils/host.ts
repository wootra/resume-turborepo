export const getHost = () => {
    const hostUrl = import.meta.env.VERCEL_URL;
    if (hostUrl.includes('localhost')) return `http://${hostUrl}`;
    else return `https://${hostUrl}`;
};
