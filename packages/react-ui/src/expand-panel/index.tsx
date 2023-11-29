import { PropsWithChildren } from 'react';
import { useExpandPanelGroups } from './ExpandPanelProvider';
export * from './ExpandPanelProvider';
import './index.css';

type Props = {
    className?: string;
    title: string;
    isInitiallyExpanded?: boolean;
    group?: string;
    maxHeight?: string;
    allowCollapseFromBody?: boolean;
    [key: `data-${string}`]: string;
};

export const ExpandPanel = (props: PropsWithChildren<Props>) => {
    const {
        className: classList,
        title,
        group,
        maxHeight,
        allowCollapseFromBody,
        isInitiallyExpanded = false,
        ...rest
    } = props;
    const { expanded, shown, onClick, onAnimationEnd, isOverflowHidden } =
        useExpandPanelGroups(group, isInitiallyExpanded);

    const id = `expand-panel_${Math.random().toString(36).substring(7)}`;
    return (
        <div
            className={[classList, 'resume-expand-panel', 'gridContainer']
                .filter(v => v)
                .join(' ')}
            data-expanded={expanded}
            {...rest}
            id={id}
            onClick={allowCollapseFromBody ? onClick : () => {}}
        >
            <h3
                className='title'
                data-expanded={expanded}
                onClick={allowCollapseFromBody ? () => {} : onClick}
            >
                {title}
            </h3>
            {expanded || (shown && !expanded) ? (
                <div
                    className='panel'
                    data-expanded={expanded}
                    data-overflow-hidden={maxHeight ? 'auto' : isOverflowHidden}
                    onAnimationEnd={onAnimationEnd}
                    style={maxHeight ? { maxHeight } : {}}
                >
                    {props.children}
                </div>
            ) : null}
        </div>
    );
};
