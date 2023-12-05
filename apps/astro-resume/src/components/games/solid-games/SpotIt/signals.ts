import { createMemo, createSignal, type Accessor } from 'solid-js';
import type { CardItem } from './types';
import { useCards } from './CardProvider';

const [cardNo, setCardNo] = createSignal<number>(0);
const maxImageNo = 53;
const cardInfo = (add: Accessor<number>) => {
    const { cards, colors, images } = useCards();
    return createMemo(() => {
        const card = cards()[cardNo() + add()];
        return card.items.map(num => {
            const imageNum = +images()[num - 1];
            const imgName = (imageNum % maxImageNo) + 1;
            const imageExt = imgName < 29 ? 'jpg' : 'png';
            return {
                image: `/images/spotit/${imgName}.${imageExt}`,
                id: num, // `image-${num}`,
                color: colors()[parseInt(`${imageNum / maxImageNo}`)],
            } as CardItem;
        });
    });
};

export { cardNo, setCardNo, cardInfo };
