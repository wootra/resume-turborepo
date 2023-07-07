import './App.css';
import { ExpandPanel } from './components/expand-panel';
import { ExpandCollapse } from './ExpandCollapse';
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
                <ExpandCollapse title='oh-no'>
                    <div>Left Contents</div>
                </ExpandCollapse>
            </div>
        </>
    );
}

export default App;
