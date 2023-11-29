import { numLimit, numOfCards, numOfItems } from './consts';
import type { CardInfo, Node } from './types';
import { colors as colorsPool } from './consts';
import { shuppleImages } from './utils';
import { createSignal } from 'solid-js';

const createNewCard = (): CardInfo => ({
    items: [] as number[],
});

export const [scores, setScores] = createSignal<number[]>([0, 0]);

const addFirstCard = (
    usedCount: Record<number, number>,
    maxNum: number,
    cards: CardInfo[]
) => {
    let newCard = createNewCard();

    for (let i = 0; i < numOfItems; i++) {
        const numToAdd = i + 1;
        newCard.items.push(numToAdd);
        usedCount[numToAdd] = usedCount[numToAdd] ? usedCount[numToAdd] + 1 : 1;
        maxNum = numToAdd;
    }
    cards.push(newCard);
    return maxNum;
};

const isOnlyOneMatching = (card1: CardInfo, card2: CardInfo) => {
    let count = 0;
    const itemSet = new Set<number>(card1.items);
    card2.items.forEach(item => {
        if (itemSet.has(item)) {
            count++;
            if (count > 1) return false;
        }
    });
    return count === 1;
};

export const createCardItems = () => {
    let maxNum = 0;
    const cards: CardInfo[] = [];

    // save used count for each number
    const usedCount: Record<number, number> = {};
    maxNum = addFirstCard(usedCount, maxNum, cards);

    // create a copied version of cards array
    while (cards.length < numOfCards && maxNum < numLimit) {
        let cardsClone: CardInfo[] = JSON.parse(JSON.stringify(cards));
        const avoidNumbers = new Set<number>([]);
        const newCard = createNewCard();
        // iterating the filled cards,
        while (cardsClone.length > 0) {
            if (newCard.items.length === numOfItems) {
                console.log('newCard', newCard);
                console.log('maxNum', maxNum);
                console.log('usedCount', usedCount);
                console.log('total cards', cards.length);
                console.error('no more possible card found!');
                break;
                // throw Error('no more possible card can be found!');
            }
            const card = cardsClone.shift()!;

            // excluding avoidNumbers,
            const possibleNumbers = card.items
                .filter(n => !avoidNumbers.has(n))
                .sort((a, b) => usedCount[a] - usedCount[b]);

            // take one of the least used number from the card items
            const chosenNumber = possibleNumbers.shift();
            if (!chosenNumber) {
                continue;
            }
            // once the number is picked, other numbers will be added in avoidNumbers.
            card.items.forEach(a => {
                avoidNumbers.add(a);
            });
            newCard.items.push(chosenNumber);
            // the usedCount for the number will be increased.
            usedCount[chosenNumber] = usedCount[chosenNumber]
                ? usedCount[chosenNumber] + 1
                : 1;
            // check all other cards and add more numbers if there is the matching number.
            const cardsToRemove = [] as CardInfo[];
            for (const card of cardsClone) {
                if (card.items.includes(chosenNumber)) {
                    card.items.forEach(n => avoidNumbers.add(n));
                    cardsToRemove.push(card);
                }
            }
            cardsClone = cardsClone.filter(c => !cardsToRemove.includes(c));
        }
        if (cards.length > 0 && newCard.items.length === 0) {
            throw new Error('should match at least one item!');
        }
        // when all the cards are iterated, if the card is not filled, add new number.
        while (newCard.items.length < numOfItems) {
            maxNum++;
            newCard.items.push(maxNum);
            usedCount[maxNum] = usedCount[maxNum] ? usedCount[maxNum] + 1 : 1;
        }
        let onlyOneMatching = true;
        for (let i = 0; i < cards.length; i++) {
            const card1 = cards[i];

            if (!isOnlyOneMatching(card1, newCard)) {
                onlyOneMatching = false;
            }
        }
        if (onlyOneMatching) {
            cards.push(newCard);
        }
        // repeat it until cards array has numOfCards items.
    }
    // shuffle the cards array.

    // let randomNum = Math.round(Math.random() * 100000);
    // const shuppledCards = cards
    //     .map((c, i) => ({ c, i }))
    //     .sort((a, b) => ((a.i * randomNum) % 10) - ((b.i * randomNum) % 10))
    //     .map(v => v.c);

    // // return the shuffled cards array.
    // return { maxNum, cards: shuppledCards };
    const colorsOrg = colorsPool.sort(() => Math.random() - 0.5);
    const imagesOrg = shuppleImages(maxNum);
    const [cardsOrg] = createSignal<CardInfo[]>(cards);
    const [images] = createSignal<number[]>(imagesOrg);
    const [colors] = createSignal<string[]>(colorsOrg);

    return { images, cards: cardsOrg, colors, scores, setScores };
};
