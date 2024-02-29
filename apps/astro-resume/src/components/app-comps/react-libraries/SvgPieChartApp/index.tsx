import { StyleContextProvider } from './StyleContext';
import DataContextProvider from './DataContext';
import PieChartExample from './PieChartExample';

const SvgPieChartApp = () => {
    return (
        <DataContextProvider>
            <StyleContextProvider>
                <PieChartExample />
            </StyleContextProvider>
        </DataContextProvider>
    );
};

export default SvgPieChartApp;
