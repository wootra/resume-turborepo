import { createMemo, createSignal, onMount } from 'solid-js';
import type { CardInfo, FruitButtonProps, Node } from './types';
import { numOfCards, numOfItems, oneAngle } from './consts';
import { cardInfo, cardNo, setCardNo } from './signals';
import { getRandomAngle } from './utils';
import { CardProvider, useCards } from './CardProvider';
let cardRef: HTMLDivElement | undefined = undefined;
const FruitButton = ({ items, index, rotation }: FruitButtonProps) => {
    const item = createMemo(() => items()[index]);
    const angle = getRandomAngle();
    const { cards } = useCards();
    const [imgSize, setImgSize] = createSignal(0);
    const [pos, setPos] = createSignal({ x: 120, y: 120 });
    const checkMatching = () => {
        const id = item().id;
        const cardNum = cardNo();
        const card1 = cards()[cardNum];
        const card2 = cards()[cardNum + 1];
        if (card1.items.includes(+id) && card2.items.includes(+id)) {
            if (cardNum + 2 < numOfCards) {
                setCardNo(cardNum + 2);
            } else {
                console.log('game over');
            }
        } else {
            console.log('not matching!');
        }
    };
    let x, y;
    let btn: HTMLButtonElement = null as unknown as HTMLButtonElement;
    onMount(() => {
        let halfSizeOrg = (cardRef?.getBoundingClientRect().width || 0) / 2;
        let halfSize = halfSizeOrg * 0.8;

        console.log(cardRef, halfSize);
        if (index === 0) {
            x = halfSize + halfSizeOrg * 0.1;
            y = halfSize + halfSizeOrg * 0.1;
        } else {
            const radiusBase = index % 2 === 0 ? halfSize : halfSize / 2 + 20;
            const rad =
                (((index - 1) * oneAngle + rotation) / 360.0) * 3.1415 * 2;
            const radius = radiusBase - Math.random() * 10;
            x = Math.cos(rad) * radius + halfSize;
            y = Math.sin(rad) * radius + halfSize;
        }
        console.log('button pos:', { x, y });
        setImgSize(Math.random() * 30 + 30);
        setPos({ x, y });
    });

    return (
        <button
            ref={btn}
            style={{
                rotate: `${angle}deg`,
                left: `${pos().x}px`,
                top: `${pos().y}px`,
            }}
            class='absolute bg-transparent transition-all rounded-full hover:border-4'
            onClick={() => checkMatching()}
        >
            <div
                class='shadow-lg rounded-full hover:outline-2 hover:outline-red-500'
                style={{
                    // rotate: `${getRandomAngle()}deg`,
                    border: `5px solid ${item().color}`,
                }}
            >
                <img
                    class='rounded-full aspect-1'
                    src={item().image}
                    alt={item().id + ''}
                    width={imgSize()}
                    height={imgSize()}
                />
            </div>
        </button>
    );
};
const Card = ({ add = 1 }: { add?: number }) => {
    const [addNum] = createSignal(add);
    const items = cardInfo(addNum);
    const rotation = getRandomAngle();
    return (
        <div ref={cardRef} class='min-w-[20rem] w-1/2 max-w-[30rem] aspect-1'>
            <div class='w-full h-full rounded-full bg-white shadow-lg relative border border-gray'>
                {Array(numOfItems - 1)
                    .fill(0)
                    .map((_item, i) => {
                        return (
                            <FruitButton
                                {...{ index: i + 1, rotation, items }}
                            />
                        );
                    })}
                <FruitButton
                    {...{
                        index: 0,
                        items,
                        rotation,
                    }}
                />
            </div>
        </div>
    );
};

const Score = ({ team }: { team: number }) => {
    return (
        <div class='h-full px-4 w-full bg-yellow bg-opacity-20 p-2 rounded-md select-none pointer-events-none'>
            <h1>Team {team + 1}</h1>
            <div>
                <h2>Score</h2>
            </div>
        </div>
    );
};

const SlapIt = () => {
    return (
        <>
            <h1 class='hidden md:block py-4'>
                Find the matching a color & image!
            </h1>
            <h2 class='w-full h-4 text-center'>
                Cards left: {numOfCards - cardNo()}
            </h2>
            <div class='w-full h-full relative flex flex-row flex-wrap'>
                <CardProvider>
                    <div class='flex flex-row flex-wrap w-full h-full items-center justify-center mx-auto'>
                        <Card add={0} />
                        <Card add={1} />
                    </div>
                    <div class='w-1/2 md:absolute md:h-full md:left-0 md:top-0 md:w-32 md:pointer-events-none'>
                        <Score team={0} />
                    </div>
                    <div class='w-1/2 md:absolute md:h-full md:right-0 md:top-0 md:w-32 md:pointer-events-none'>
                        <Score team={1} />
                    </div>
                </CardProvider>
            </div>
        </>
    );
};

export default SlapIt;
