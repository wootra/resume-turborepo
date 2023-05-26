import { ResolvedChildren } from 'solid-js/types/reactive/signal';
import { Component, createSignal, createMemo, onCleanup } from 'solid-js';
import './index.css';
const groups: { [group: string]: () => void } = {};

export const ExpandPanel: Component<{
    class?: string;
    title: string;
    children: ResolvedChildren | ResolvedChildren[];
    isInitiallyExpanded?: boolean;
    group?: string;
    maxHeight?: string;
    [key: `data-${string}`]: string;
}> = props => {
    const { class: classList, title, group, maxHeight, ...rest } = props;
    let isInitiallyExpanded = props.isInitiallyExpanded || false;
    if (isInitiallyExpanded && group && groups[group]) {
        // if group is already loaded, expand just one.
        isInitiallyExpanded = false;
    }

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
        if (group) {
            if (groups[group] && groups[group] !== onClick) {
                groups[group]();
            }
            groups[group] = onClick;
        }
    };
    if (isInitiallyExpanded && group && !groups[group]) {
        groups[group] = onClick;
    }
    onCleanup(() => {
        if (group && groups[group] === onClick) {
            delete groups[group];
        }
    });

    const id = `expand-panel_${Math.random().toString(36).substring(7)}`;
    return (
        <div
            class={[classList, 'resume-expand-panel', 'gridContainer']
                .filter(v => v)
                .join(' ')}
            data-expanded={isExpanded()}
            {...rest}
            id={id}
        >
            <h3 class='title' data-expanded={isExpanded()} onClick={onClick}>
                {title}
            </h3>
            {isExpanded() || (isShown() && !isExpanded()) ? (
                <div
                    class='panel'
                    data-expanded={isExpanded()}
                    data-overflow-hidden={
                        maxHeight ? 'auto' : isOverflowHidden()
                    }
                    onAnimationEnd={() => {
                        if (isExpanded()) {
                            setIsShown(true);
                        } else {
                            setIsShown(false);
                        }
                    }}
                    style={maxHeight ? `max-height:${maxHeight}` : ''}
                >
                    {props.children}
                </div>
            ) : null}
        </div>
    );
};
