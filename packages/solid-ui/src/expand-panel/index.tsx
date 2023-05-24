import { Component, createSignal, createEffect } from 'solid-js';
import './index.css';
import type { ResolvedChildren } from 'solid-js/types/reactive/signal';

const DURATION = 300;

export const ExpandPanel: Component<{
    class?: string;
    title: string;
    children: ResolvedChildren | ResolvedChildren[];
    isInitiallyExpanded?: boolean;
}> = props => {
    const { class: classList, title, isInitiallyExpanded } = props;
    const [isExpanded, setIsExpanded] = createSignal(
        isInitiallyExpanded || false
    );
    const [isShown, setIsShown] = createSignal(isInitiallyExpanded || false);
    createEffect(() => {
        if (!isExpanded()) {
            setTimeout(() => {
                setIsShown(false);
            }, DURATION);
        } else {
            setIsShown(true);
        }
    });
    const onClick = () => {
        setIsExpanded(!isExpanded());
    };
    const id = `expand-panel_${Math.random().toString(36).substring(7)}`;
    return (
        <div
            class={[classList, 'resume-expand-panel', 'gridContainer']
                .filter(v => v)
                .join(' ')}
            data-expanded={isExpanded()}
            id={id}
        >
            <h3 class={'title'} data-expanded={isExpanded()} onClick={onClick}>
                {title}
            </h3>
            {isShown() && (
                <div class={'panel'} data-expanded={isExpanded()}>
                    {props.children}
                </div>
            )}
        </div>
    );
};
