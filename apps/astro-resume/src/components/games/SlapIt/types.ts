import type { Accessor } from 'solid-js';

export type Node = {
    id: number;
    usedCount: number;
};

export type CardItem = {
    image: string;
    id: number;
    color: string;
};

export type CardInfo = {
    items: number[];
};

export type FruitButtonProps = {
    index: number;
    rotation: number;
    items: Accessor<CardItem[]>;
};
