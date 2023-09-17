import { numLimit, numOfCards, numOfItems } from './consts';
import type { CardInfo, Node } from './types';
const createNewCard = (): CardInfo => ({
    items: [] as number[],
});

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
    addFirstCard(usedCount, maxNum, cards);

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
                throw Error('no more possible card can be found!');
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
        if (newCard.items.length === 0) {
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

    // console.log('cards:', cards);
    // console.log('maxNum is', maxNum);

    let randomNum = Math.round(Math.random() * 100000);
    const shuppledCards = cards
        .map((c, i) => ({ c, i }))
        .sort((a, b) => ((a.i * randomNum) % 10) - ((b.i * randomNum) % 10))
        .map(v => v.c);

    // return the shuffled cards array.
    return { maxNum, cards: shuppledCards };

    // for (let i = 0; i < numOfCards; i++) {
    //     const card = createNewCard();
    //     cards.push(card);
    // }

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
    // for (let i = 0; i < numOfItems; i++) {
    //     const numToAdd = i + 1;
    //     cards[0].items.push(numToAdd);
    //     graph[numToAdd] = { id: numToAdd, usedCount: 1 };
    //     maxNum = numToAdd;
    // }
    // const getMatchingNum = (possibleGroup: Node[], items: number[]) => {
    //     const maxUsed = possibleGroup[0].usedCount;
    //     let found = possibleGroup
    //         .filter(num => num.id !== maxUsed)
    //         .find(num => items.includes(num.id));
    //     if (found) return found.id; // return second most used.
    //     found = possibleGroup.find(num => items.includes(num.id));
    //     return found?.id || 0;
    // };

    // for (let i = 1; i < numOfCards; i++) {
    //     const currCard = cards[i];
    //     const allPossibleNumbersArr: number[] = [];
    //     let allFilledCards = [] as CardInfo[];
    //     for (let j = 0; j < i; j++) {
    //         const card = cards[j];
    //         allFilledCards.push(card);
    //         allPossibleNumbersArr.push(...card.items);
    //     }
    //     const allPossibleNumbers = new Set<number>(allPossibleNumbersArr);
    //     const allPossibleNumberNodes = [...allPossibleNumbers].map(
    //         num => graph[num]
    //     );
    //     allPossibleNumberNodes
    //         .sort((a, b) => a.id - b.id)
    //         .sort((a, b) => a.usedCount - b.usedCount); // sort by the least used

    //     let possibleGroup = [...allPossibleNumberNodes];
    //     // save count of matchings
    //     // only matching numbers can be used as candidate.
    //     // if no matching, use new number to avoid redundancy.

    //     const matchingNumbers = possibleGroup.reduce((acc, curr)=>{
    //         const node = { id: curr.id, usedCount: 0};
    //         for(const card of allFilledCards){
    //             if(card.items.includes(curr.id)){
    //                 node.usedCount++;
    //             }
    //         }
    //         if(node.usedCount > 0){
    //           acc.push(node);
    //         }
    //         return acc;
    //     }, [] as Node[]);
    //     matchingNumbers
    //       .sort((a,b)=>a.id - b.id) // smaller number first
    //       .sort((a, b) => a.usedCount - b.usedCount); // least used first

    //     const currCardClone = JSON.parse(JSON.stringify(currCard));
    //     const matchingNumClone = JSON.parse(JSON.stringify(matchingNumbers));

    //     while(matchingNumClone.length > 0){
    //       const num = matchingNumClone.shift()!;
    //       currCardClone.items.push(num.id);

    //       const removedCards = [] as CardInfo[];
    //       const removedNumbers = new Set<number>();
    //       for(const card of allFilledCards){
    //         if(card.items.includes(num.id)){
    //          removedCards.push(card);
    //          card.items.forEach(n=>removedNumbers.add(n));
    //         }
    //       }
    //       allFilledCards = allFilledCards.filter(c=>!removedCards.includes(c));
    //       matchingNumClone.filter(n=>!removedNumbers.has(n.id));

    //       if (currCardClone.items.length === numOfItems) {
    //           break;
    //       }

    //     }
    //     let tempMaxNum = maxNum;

    //     // validate if this numbers are matching with all previous cards.
    //     // add graph all used.
    //     // replace clone with currCard
    //     // update maxNum with tempMaxNum;

    //     let matchingNum;
    //     while (possibleGroup.length > 0 && allFilledCards.length > 0) {
    //         const filledCard = allFilledCards.shift()!;
    //         // if (!filledCard.items.includes(matchingNum || 0)) {
    //         // }
    //         matchingNum = getMatchingNum(possibleGroup, filledCard.items);
    //         console.log('matchingNum', { matchingNum, graph, allFilledCards });
    //         debugger;
    //         if (matchingNum) {
    //             const otherMatchings = new Set<CardInfo>();
    //             const otherMatchings = new Set<CardInfo>();
    //             for (let c = 0; c < allFilledCards.length; c++) {
    //                 if (allFilledCards[c].items.includes(matchingNum)) {
    //                     otherMatchings.add(allFilledCards[c]);
    //                 }
    //             }
    //             allFilledCards = allFilledCards.filter(
    //                 c => !otherMatchings.has(c)
    //             );
    //             possibleGroup = possibleGroup.filter(
    //                 node => !filledCard.items.includes(node.id)
    //             );
    //             currCard.items.push(matchingNum);
    //             graph[matchingNum].usedCount++;
    //             if (currCard.items.length === numOfItems) {
    //                 break;
    //             }
    //         } else {
    //             console.error(
    //                 'no matching number',
    //                 possibleGroup,
    //                 filledCard.items
    //             );
    //             // throw new Error('no matching number!');
    //         }
    //     } //should end with 0 possibleGroup

    //     while (currCard.items.length < numOfItems) {
    //         maxNum++;
    //         currCard.items.push(maxNum);
    //         graph[maxNum] = { id: maxNum, usedCount: 1 };
    //     }
    // }
};
