import { Button, Header } from 'ui';
import { ExpandPanel } from 'expand-panel';
import { LeftContents } from 'common-data';
export default function Page() {
    return (
        <>
            <Header text='Web' />
            <Button />
            <ExpandPanel />
            <pre>{JSON.stringify(LeftContents, null, 2)}</pre>
        </>
    );
}
