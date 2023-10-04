import { numOfCards } from './consts';
import { createCardItems } from './stores';
import { describe, expect, it } from 'vitest';
import type { CardInfo } from './types';
describe('createCardItems', () => {
    it('should create items', () => {
        const { cards } = createCardItems();
        console.log(cards().map(card => card.items));
        expect(cards().length).toBe(numOfCards);
    });

    it('should match only one items', () => {
        const { cards: cardList } = createCardItems();
        const cards = cardList();
        for (let i = 0; i < cards.length; i++) {
            for (let j = 0; j < cards.length; j++) {
                if (i === j) continue;
                const card1 = cards[i];
                const card2 = cards[j];
                const matchingCount = countOfMatchingItems(card1, card2);
                if (matchingCount !== 1) {
                    console.log('card1', card1);
                    console.log('card2', card2);
                }
                expect(matchingCount).toBe(1);
            }
        }
    });
});

const countOfMatchingItems = (card1: CardInfo, card2: CardInfo) => {
    let count = 0;
    const itemSet = new Set<number>(card1.items);
    card2.items.forEach(item => {
        if (itemSet.has(item)) {
            count++;
        }
    });
    return count;
};
