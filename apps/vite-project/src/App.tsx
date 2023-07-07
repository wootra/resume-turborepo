import React, { PropsWithChildren, useLayoutEffect } from 'react';
import './App.css';
import { ExpandPanel } from './components/expand-panel';
import { ExpandPanel as SvelteExpandCreator } from 'svelte-ui';
import type { ExpandPanelProps } from 'svelte-ui/src/types';
import { renderToStaticMarkup } from 'react-dom/server';
const withSvelte = (Component: any, props = {}, children) => {
    const ref = React.useRef(null);
    useLayoutEffect(() => {
        if (ref.current) {
            ref.current.innerHTML = '';
            new Component({
                target: ref.current,
                props: {
                    title: 'hey',
                    ...props,
                    test: () => renderToStaticMarkup(children),
                },
                children,
            });
        }
    }, []);
    return <div ref={ref}></div>;
};
const ExpandSveltePanel = ({
    children,
    ...props
}: PropsWithChildren<ExpandPanelProps>) =>
    withSvelte(SvelteExpandCreator, props, children);

function App() {
    return (
        <>
            <div style={{ width: '500px' }}>
                <ExpandPanel title='hey'>
                    <div>Left Contents</div>
                </ExpandPanel>
                <ExpandPanel title='you'>
                    <div>Left Contents</div>
                </ExpandPanel>
                <ExpandSveltePanel title='oh-no'>
                    <div>Left Contents</div>
                </ExpandSveltePanel>
            </div>
        </>
    );
}

export default App;
