export const getRandomAngle = () => {
    return Math.round(Math.random() * 360);
};

export const shuppleImages = (maxNum: number) => {
    const imageNumbers = Array(maxNum)
        .fill(0)
        .map((_c, i) => i);

    const randomNum = Math.round(Math.random() * 100000);
    const sorted = imageNumbers.sort(
        (a, b) => ((a * randomNum) % 10) - ((b * randomNum) % 10)
    );
    return sorted;
};
