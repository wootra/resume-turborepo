import { createMemo, createSignal, type Accessor } from 'solid-js';
import type { CardInfo, CardItem, Node } from './types';
import { numOfCards, numOfItems } from './consts';
import { createCardItems } from './stores';

const getRandomAngle = () => {
    return Math.round(Math.random() * 360);
};

const oneAngle = 360 / (numOfItems - 1);
const [cardNo, setCardNo] = createSignal<number>(0);

const [shuppledImages, setShuppledImages] = createSignal<number[]>([]);
const shuppleImages = (maxNum: number) => {
    const imageNumbers = Array(maxNum)
        .fill(0)
        .map((_c, i) => i + 1);

    const randomNum = Math.round(Math.random() * 100000);
    const sorted = imageNumbers.sort(
        (a, b) => ((a * randomNum) % 10) - ((b * randomNum) % 10)
    );
    setShuppledImages(sorted);
};

type FruitButtonProps = {
    index: number;
    items: Accessor<CardItem[]>;
};
let shuppledCards: CardInfo[];
let colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple'];

const FruitButton = ({ items, index }: FruitButtonProps) => {
    const item = createMemo(() => items()[index]);
    const angle = Math.round(Math.random() * 360);
    let x, y;
    if (index === 0) {
        x = 120;
        y = 120;
    } else {
        const radiusBase = index % 2 === 0 ? 120 : 80;
        const rad = (((index - 1) * oneAngle) / 360.0) * 3.1415 * 2;
        const radius = radiusBase - Math.random() * 10;
        x = Math.cos(rad) * radius + 120;
        y = Math.sin(rad) * radius + 120;
    }
    const imgSize = Math.random() * 30 + 30;

    const checkMatching = (id: number) => {
        const card1 = shuppledCards[cardNo()];
        const card2 = shuppledCards[cardNo() + 1];
        console.log('number', id, card1.items, card2.items);
        if (card1.items.includes(+id) && card2.items.includes(+id)) {
            console.log('matched!');
            if (cardNo() + 2 < numOfCards) {
                // shuppleImages();
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
                rotate: `${angle}deg`,
                left: `${x}px`,
                top: `${y}px`,
            }}
            class='absolute bg-transparent rounded-full hover:border-4'
            onClick={() => checkMatching(item().id)}
        >
            <div
                class='shadow-lg rounded-full hover:outline-2 hover:outline-red-500'
                style={{
                    rotate: `${getRandomAngle()}deg`,
                    border: `5px solid ${item().color}`,
                }}
            >
                <img
                    class='rounded-full aspect-1'
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
        <div class='w-80 h-80 p-4 '>
            <div class='w-full h-full rounded-full bg-white shadow-lg relative border border-gray'>
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

const Score = ({ team }: { team: number }) => {
    return (
        <div class='w-72 px-4'>
            <h1>Team {team + 1}</h1>
            <div>
                <h2>Score</h2>
            </div>
        </div>
    );
};
const cardInfo = (no: Accessor<number>, add: number = 0) => {
    return createMemo(() => {
        const card = shuppledCards[no() + add];
        return card.items.map(num => {
            const imageNum = +shuppledImages()[num - 1];
            const imgName = (imageNum % 52) + 1;
            const imageExt = imgName < 29 ? 'jpg' : 'png';
            return {
                image: `/images/slapit/${imgName}.${imageExt}`,
                id: num, // `image-${num}`,
                color: colors[parseInt(`${imageNum / 52}`)],
            } as CardItem;
        });
    });
};
const SlapIt = () => {
    const { cards, maxNum } = createCardItems();
    console.log('maxNum:', maxNum);
    shuppledCards = cards;
    colors = colors.sort(() => Math.random() - 0.5);
    shuppleImages(maxNum);
    const cardInfo1 = cardInfo(cardNo);
    const cardInfo2 = cardInfo(cardNo, 1);
    return (
        <div class='w-full h-full'>
            <h1>Find the difference!</h1>
            <div class='w-full h-full'>
                <div class='flex flex-row flex-wrap w-max h-1/2 items-center justify-center mx-auto'>
                    <Card items={cardInfo1} />
                    <Card items={cardInfo2} />
                </div>
                <div class='w-full h-auto flex-wrap flex flex-row items-center justify-center mx-auto'>
                    <Score team={0} />
                    <Score team={1} />
                </div>
            </div>
        </div>
    );
};

export default SlapIt;
