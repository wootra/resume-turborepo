import {
    createMemo,
    createSignal,
    type Accessor,
    createComputed,
} from 'solid-js';

type CardItem = {
    image: string;
    id: number;
};
type CardInfo = {
    items: number[];
    itemSet: Set<number>;
};

const getRandomAngle = () => {
    return Math.round(Math.random() * 360);
};
const numOfCards = 28;
const numOfItems = 7;
let maxNum = 0;
const cards: CardInfo[] = [];
type Node = {
    id: number;
    usedCount: number;
};
const graph: Record<number, Node> = {};

const getNewItem = (): CardInfo => ({
    items: [] as number[],
    itemSet: new Set<number>(),
});

for (let i = 0; i < numOfCards; i++) {
    const card = getNewItem();
    cards.push(card);
}

// start from numbers pool
// traversal existing numbers in the cards
// save all numbers that are possibly reused.
// find the minimum used number ( sort first, and use from the smaller one)
// from minimum used numbers, choose maximum matching numbers with existing cards.
// once the number is used for a card, all other numbers should be added in exclude items.
// remove exclude items from all possible numbers
// once the card is matched, remove it from the pool.
// repeat it until all the cards are matching only one item.
// when no more number exist, change start index and repeat from the first.
for (let i = 0; i < numOfItems; i++) {
    cards[0].items.push(i + 1);
    graph[i + 1] = { id: i + 1, usedCount: 1 };
    maxNum = i + 1;
}
const getMatchingNum = (possibleGroup: number[], items: number[]) => {
    return possibleGroup.find(num => items.includes(num));
};

for (let i = 1; i < numOfCards; i++) {
    const currCard = cards[i];
    const allPossibleNumbersArr: number[] = [];
    const allFilledCards = [] as CardInfo[];
    for (let j = 0; j < i; j++) {
        const card = cards[j];
        allFilledCards.push(card);
        allPossibleNumbersArr.push(...card.items);
    }
    const allPossibleNumbers = new Set<number>(allPossibleNumbersArr);
    const allPossibleNumberNodes = [...allPossibleNumbers].map(
        num => graph[num]
    );
    allPossibleNumberNodes
        .sort((a, b) => a.id - b.id)
        .sort((a, b) => a.usedCount - b.usedCount);

    let possibleGroup = [...allPossibleNumberNodes].map(node => node.id);
    while (possibleGroup.length > 0 && allFilledCards.length > 0) {
        const filledCard = allFilledCards.shift()!;
        const matchingNum = getMatchingNum(possibleGroup, filledCard.items);
        if (matchingNum) {
            possibleGroup = possibleGroup.filter(
                num => !filledCard.items.includes(num)
            );
            currCard.items.push(matchingNum);
            graph[matchingNum].usedCount++;
            if (currCard.items.length === numOfItems) {
                break;
            }
        } else {
            throw new Error('no matching number!');
        }
    } //should end with 0 possibleGroup

    while (currCard.items.length < numOfItems) {
        maxNum++;
        currCard.items.push(maxNum);
        graph[maxNum] = { id: maxNum, usedCount: 1 };
    }
}

const oneAngle = 360 / (numOfItems - 1);
const [cardNo, setCardNo] = createSignal<number>(0);
let randomNum = Math.round(Math.random() * 100000);
const shuppledCards = cards
    .map((c, i) => ({ c, i }))
    .sort((a, b) => ((a.i * randomNum) % 10) - ((b.i * randomNum) % 10))
    .map(v => v.c);

const imageNumbers = Array(numOfCards)
    .fill(0)
    .map((_c, i) => i + 1);

const [shuppledImages, setShuppledImages] =
    createSignal<number[]>(imageNumbers);
const shuppleImages = () => {
    const randomNum = Math.round(Math.random() * 100000);
    const sorted = imageNumbers.sort(
        (a, b) => ((a * randomNum) % 10) - ((b * randomNum) % 10)
    );
    setShuppledImages(sorted);
};
shuppleImages();

type FruitButtonProps = {
    index: number;
    items: Accessor<CardItem[]>;
};

const FruitButton = ({ items, index }: FruitButtonProps) => {
    const item = createMemo(() => items()[index]);
    const angle = Math.round(Math.random() * 360);
    let x, y;
    if (index === 0) {
        x = 100;
        y = 120;
    } else {
        const rad = (((index - 1) * oneAngle) / 360.0) * 3.1415 * 2;
        x = Math.cos(rad) * 80 + 100;
        y = Math.sin(rad) * 80 + 120;
    }
    const imgSize = Math.random() * 30 + 30;

    const checkMatching = (id: number) => {
        const card1 = shuppledCards[cardNo()];
        const card2 = shuppledCards[cardNo() + 1];
        console.log('number', id, card1.items, card2.items);
        if (card1.items.includes(+id) && card2.items.includes(+id)) {
            console.log('matched!');
            if (cardNo() + 2 < numOfCards) {
                shuppleImages();
                setCardNo(cardNo() + 2);
            } else {
                console.log('game over');
            }
        } else {
            console.log('not matching!');
        }
    };
    return (
        <button
            style={{
                rotate: `${angle}`,
                left: `${x}px`,
                top: `${y}px`,
            }}
            class='absolute bg-transparent'
            onClick={() => checkMatching(item().id)}
        >
            <div style={{ rotate: `${getRandomAngle()}deg` }}>
                <img
                    src={item().image}
                    alt={item().id + ''}
                    width={imgSize}
                    height={imgSize}
                />
            </div>
        </button>
    );
};
const Card = ({ items }: { items: Accessor<CardItem[]> }) => {
    return (
        <div class='w-72 h-80 p-4 '>
            <div class='w-full h-full rounded-md bg-white shadow-lg relative border border-gray'>
                {Array(numOfItems - 1)
                    .fill(0)
                    .map((_item, i) => {
                        return <FruitButton {...{ index: i + 1, items }} />;
                    })}
                <FruitButton
                    {...{
                        index: 0,
                        items,
                    }}
                />
            </div>
        </div>
    );
};

const cardInfo = (no: Accessor<number>, add: number = 0) => {
    return createMemo(() => {
        const card = shuppledCards[no() + add];
        return card.items.map(num => ({
            image: `/images/snapit/${shuppledImages()[num - 1]}.jpg`,
            id: num, // `image-${num}`,
        }));
    });
};
const SnapIt = () => {
    const cardInfo1 = cardInfo(cardNo);
    const cardInfo2 = cardInfo(cardNo, 1);
    console.log('cardInfo1', cardInfo1, cardNo());
    return (
        <div class='w-full h-full'>
            <h1>Find the difference!</h1>
            <div class='flex flex-row flex-wrap w-full h-full'>
                <Card items={cardInfo1} />
                <Card items={cardInfo2} />
            </div>
        </div>
    );
};

export default SnapIt;
