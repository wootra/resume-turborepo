export type ExpandPanelProps = {
    class?: string;
    title: string;
    isInitiallyExpanded?: boolean;
    group?: string;
    maxHeight?: string;
    allowCollapseFromBody?: boolean;
    [key: `data-${string}`]: string;
};
