import { createContext, useContext, type Accessor } from 'solid-js';
import { createCardItems } from './stores';

import type { CardInfo } from './types';

export type CardContextType = {
    cards: Accessor<CardInfo[]>;
    colors: Accessor<string[]>;
    images: Accessor<number[]>;
};

const CardContext = createContext<CardContextType>({} as CardContextType);

export function CardProvider(props: { children: any }) {
    const { cards, images, colors } = createCardItems();

    console.log('refreshed!');
    return (
        <CardContext.Provider
            value={{
                cards,
                colors,
                images,
            }}
        >
            {props.children}
        </CardContext.Provider>
    );
}

export function useCards() {
    return useContext(CardContext);
}
