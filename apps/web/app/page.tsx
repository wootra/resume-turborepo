import { Button, Header } from 'ui';
import { LeftContents } from 'common-data';
import { ExpandPanel } from '../components/expand-panel';
export default function Page() {
    return (
        <>
            <Header text='Web' />
            <Button />
            <ExpandPanel title='hey' isInitiallyExpanded={true}>
                <div>Left Contents</div>
                <pre>{JSON.stringify(LeftContents, null, 2)}</pre>
            </ExpandPanel>
        </>
    );
}
