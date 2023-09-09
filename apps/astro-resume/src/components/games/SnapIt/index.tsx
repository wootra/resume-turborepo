import { createMemo, createSignal } from 'solid-js';

type CardItem = {
    image: string;
    name: string;
};
type CardInfo = {
    items: number[];
    itemSet: Set<number>;
};

const getRandomAngle = () => {
    return Math.round(Math.random() * 360);
};
const numOfCards = 28;
const numOfItems = 8;
const cards: CardInfo[] = [];
const totalNumSet = new Set<number>();

const getNewItem = (): CardInfo => ({
    items: [] as number[],
    itemSet: new Set<number>(),
});
const addNumInItem = (card: CardInfo, num: number) => {
    card.items.push(num);
    card.itemSet.add(num);
    totalNumSet.add(num);
};
for (let i = 0; i < numOfCards; i++) {
    const card = getNewItem();
    cards.push(card);
}

// fill all cards with numbers in items array.
// each card should not have more than 1 duplicate number.
type Node = {
    id: number;
    edges: Set<number>;
};
const graph: Node[] = [];
Array(numOfCards * 2)
    .fill(0)
    .forEach((_, i) => {
        graph.push({
            id: i + 1,
            edges: new Set(),
        });
    });

for (let i = 0; i < numOfCards; i++) {
    let pt = Math.floor(Math.random() * (numOfCards - 1));
    const currCard = cards[i];
    const val = graph[pt].id;
    addNumInItem(currCard, val);

    while (currCard.items.length < numOfItems) {
        let nextEdgeNum = pt + 1;
        while (graph[pt].edges.has(nextEdgeNum)) {
            nextEdgeNum++;
        }
        if (nextEdgeNum >= numOfCards) {
            console.log('error out of boundary');
            break;
        }
        addNumInItem(currCard, graph[nextEdgeNum].id);
        graph[pt].edges.add(nextEdgeNum);
    }
}

const oneAngle = 360 / (numOfItems - 1);
const Card = ({ items }: { items: CardItem[] }) => {
    const angle = Math.round(Math.random() * 360);
    const centerItem = items.splice(0, 1)[0];
    let centerImgSize = Math.random() * 20 + 20;
    return (
        <div class='w-52 h-52 rounded-md bg-white shadow-lg relative'>
            {items.map((item, i) => {
                const rad = ((i * oneAngle) / 360.0) * 3.1415 * 2;
                const x = Math.cos(rad) * 60 + 100;
                const y = Math.sin(rad) * 60 + 100;
                let imgSize = Math.random() * 20 + 20;
                return (
                    <button
                        style={{
                            rotate: `${angle}`,
                            left: `${x}px`,
                            top: `${y}px`,
                        }}
                        class='absolute bg-transparent'
                    >
                        <div style={{ rotate: `${getRandomAngle()}deg` }}>
                            <img
                                src={item.image}
                                alt={item.name}
                                width={imgSize}
                                height={imgSize}
                            />
                        </div>
                    </button>
                );
            })}
            <button
                class='absolute bg-transparent'
                style={{
                    left: `${90}px`,
                    top: `${90}px`,
                }}
            >
                <div
                    style={{
                        rotate: `${getRandomAngle()}deg`,
                    }}
                >
                    <img
                        src={centerItem.image}
                        alt={centerItem.name}
                        width={centerImgSize}
                        height={centerImgSize}
                    />
                </div>
            </button>
        </div>
    );
};

const random1 = () => Math.round(Math.random() * (numOfCards - 1));
const random2 = (num1: number) => {
    let num2 = Math.round(Math.random() * (numOfCards - 1));
    while (num2 === num1) {
        num2 = Math.round(Math.random() * (numOfCards - 1));
    }
    return num2;
};
const SnapIt = () => {
    const [cardNo1, setCardNo1] = createSignal<number>(random1());
    const [cardNo2, setCardNo2] = createSignal<number>(random2(cardNo1()));
    const cardInfo1 = createMemo(() => {
        const card = cards[cardNo1()];
        return card.items.map(num => ({
            image: `/images/snapit/${num}.jpg`,
            name: `image-${num}`,
        }));
    });
    const cardInfo2 = createMemo(() => {
        const card = cards[cardNo2()];
        return card.items.map(num => ({
            image: `/images/snapit/${num}.jpg`,
            name: `image-${num}`,
        }));
    });

    return (
        <div>
            <h1>Find the difference!</h1>
            <div>
                <Card items={cardInfo1()} />
                <Card items={cardInfo2()} />
            </div>
        </div>
    );
};

export default SnapIt;
