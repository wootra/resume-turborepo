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

export function createSpotItDeck(n: number) {
    let p = n - 1;
    let cards = new Array(p ** 2 + p + 1).fill(0).map(() => [] as number[]);

    cards[0].push(0);
    for (let i = 0; i <= p; i++) {
        for (let j = 0; j < p; j++) {
            cards[1 + i * p + j].push(i);
            cards[i].push(1 + i * p + j);
        }
    }

    for (let i = 0; i < p; i++) {
        for (let j = 0; j < p; j++) {
            for (let k = 0; k < p; k++) {
                cards[1 + p + i * p + k].push(
                    1 + p + j * p + ((((i * j - k) % p) + p) % p)
                );
            }
        }
    }

    return cards;
}
