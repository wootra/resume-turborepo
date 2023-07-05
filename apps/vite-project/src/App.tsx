import './App.css';
import { ExpandPanel } from './components/expand-panel';

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
                <ExpandPanel title='oh-no'>
                    <div>Left Contents</div>
                </ExpandPanel>
            </div>
        </>
    );
}

export default App;
