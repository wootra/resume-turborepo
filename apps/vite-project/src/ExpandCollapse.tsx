import { ExpandPanel } from 'solid-ui/src/expand-panel';
import {
    ReactToSolidBridge,
    ReactToSolidBridgeProvider,
} from 'react-solid-bridge';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
    className?: string;
    title: string;
    isInitiallyExpanded?: boolean;
    group?: string;
    maxHeight?: string;
    allowCollapseFromBody?: boolean;
    [key: `data-${string}`]: string;
}>;

export const ExpandCollapse = ({ children, className, ...props }: Props) => {
    return (
        <ReactToSolidBridgeProvider>
            <ReactToSolidBridge
                props={props}
                getSolidComponent={({ getChildren, props }) =>
                    ExpandPanel({
                        get children() {
                            return getChildren?.();
                        },
                        get class() {
                            return props.className?.();
                        },
                        get title() {
                            return props.title?.();
                        },
                    })
                }
            >
                {children}
            </ReactToSolidBridge>
        </ReactToSolidBridgeProvider>
    );
};
