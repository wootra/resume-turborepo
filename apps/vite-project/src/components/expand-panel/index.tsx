'use client';

import {
    createSignal,
    createMemo,
    onCleanup,
    withSolid,
} from 'react-solid-state';
import './index.css';
import { PropsWithChildren } from 'react';
const groups: { [group: string]: () => void } = {};
type Props = PropsWithChildren<{
    class?: string;
    title: string;
    isInitiallyExpanded?: boolean;
    group?: string;
    maxHeight?: string;
    allowCollapseFromBody?: boolean;
    [key: `data-${string}`]: string;
}>;

export const ExpandPanel = withSolid<Props>((props: Props) => {
    const {
        class: classList,
        title,
        group,
        maxHeight,
        allowCollapseFromBody,
        ...rest
    } = props;
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
        console.log('onClick', expanded);
        if (expanded) {
            setIsShown(true);
            setIsExpanded(!expanded);
            console.log('onClick2', isExpanded());
        } else {
            setIsShown(false);
            setIsExpanded(!expanded);
            console.log('onClick2', isExpanded());
        }
        if (group) {
            if (groups[group] !== onClick) {
                if (groups[group]) {
                    groups[group]();
                }
                groups[group] = onClick;
            } else {
                delete groups[group];
            }
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
    return () => (
        <div
            className={[classList, 'resume-expand-panel', 'gridContainer']
                .filter(v => v)
                .join(' ')}
            data-expanded={isExpanded()}
            {...rest}
            id={id}
            onClick={allowCollapseFromBody ? onClick : () => {}}
        >
            <h3
                className='title'
                data-expanded={isExpanded()}
                onClick={allowCollapseFromBody ? () => {} : onClick}
            >
                {title}
            </h3>
            {isExpanded() || (isShown() && !isExpanded()) ? (
                <div
                    className='panel'
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
                    style={maxHeight ? { maxHeight } : {}}
                >
                    {props.children}
                </div>
            ) : null}
        </div>
    );
});
