import { Button, Header } from 'ui';
import { ExpandPanel } from 'expand-panel';
import { resumeObj } from 'common-data';
export default function Page() {
    return (
        <>
            <Header text='Web' />
            <Button />
            <ExpandPanel />
            <pre>{JSON.stringify(resumeObj, null, 2)}</pre>
        </>
    );
}
