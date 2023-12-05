import type { CardInfo } from './types';
import { colors as colorsPool } from './consts';
import { createSpotItDeck, shuppleImages } from './utils';
import { createSignal } from 'solid-js';

export const [scores, setScores] = createSignal<number[]>([0, 0]);
const deck = createSpotItDeck(8);
export const createCardItems = () => {
    // [];
    // const deck = createSpotItDeck(8);
    const cards: CardInfo[] = deck.map(card => ({
        items: card.map(num => num + 1),
    }));
    cards.sort(() => Math.random() - 0.5);
    let maxNum = Math.max(...deck.flat()) + 1;
    // deck.forEach(card => {
    //     cards.push({ items: card });
    // });

    const colorsOrg = colorsPool.sort(() => Math.random() - 0.5);
    const imagesOrg = shuppleImages(maxNum);
    const [cardsOrg] = createSignal<CardInfo[]>(cards);
    const [images] = createSignal<number[]>(imagesOrg);
    const [colors] = createSignal<string[]>(colorsOrg);

    return { images, cards: cardsOrg, colors, scores, setScores };
};
