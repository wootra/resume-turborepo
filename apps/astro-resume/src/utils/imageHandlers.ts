export const convertPngToBase64 = async (
    url: string,
    width?: number,
    height?: number
): Promise<string> => {
    return new Promise((res, rej) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        const timeoutId = setTimeout(() => {
            rej('timeout while loading image');
        }, 1000);
        img.onload = () => {
            clearTimeout(timeoutId);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.height = width ?? img.naturalHeight;
            canvas.width = height ?? img.naturalWidth;
            ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL();
            res(dataUrl);
        };
        img.src = url;
    });
};

let lineImg: string;
export const getLineImage = async () => {
    if (lineImg) return lineImg;
    lineImg = await convertPngToBase64('/line.svg', 300, 10);
    return lineImg;
};
