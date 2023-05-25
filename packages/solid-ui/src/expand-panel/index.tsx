import { Component, createSignal, createMemo } from 'solid-js';
import './index.css';
import { ResolvedChildren } from 'solid-js/types/reactive/signal';

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

    const isOverflowHidden = createMemo(() => {
        return (isExpanded() && !isShown()) || (!isExpanded() && isShown());
    });
    const onClick = () => {
        const expanded = isExpanded();
        if (expanded) {
            setIsShown(true);
            setIsExpanded(!expanded);
        } else {
            setIsShown(false);
            setIsExpanded(!expanded);
        }
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
            <h3 class='title' data-expanded={isExpanded()} onClick={onClick}>
                {title}
            </h3>
            {isExpanded() || (isShown() && !isExpanded()) ? (
                <div
                    class='panel'
                    data-expanded={isExpanded()}
                    data-overflow-hidden={isOverflowHidden()}
                    onAnimationEnd={() => {
                        if (isExpanded()) {
                            setIsShown(true);
                        } else {
                            setIsShown(false);
                        }
                    }}
                >
                    {props.children}
                </div>
            ) : null}
        </div>
    );
};
