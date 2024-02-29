import { renderToString } from 'react-dom/server';
import { PieChart } from '@shjeon0730/react-svg-chart/src';
import { useStyleContext } from './StyleContext';
import { useDataContext } from './DataContext';
import { Styles } from './Styles';
import DataManager from './DataManager';
import { Column, Narrow, Row } from './Containers';
import Header from './Header';

const PieChartExample = () => {
    const { padding, innerRadius, distance, xRotate } = useStyleContext();

    const { data, selectedIndex } = useDataContext();

    const svgString = renderToString(
        <PieChart
            width={300}
            height={300}
            type='percentage'
            padding={padding}
            data={data}
            innerRadius={innerRadius}
            selectedIndex={selectedIndex}
            colorSelector={idx => data[idx].color}
            distance={distance}
            xRotate={xRotate}
        />
    );
    return (
        <Column>
            <h1 className='font-extrabold text-4xl'>Pie Chart</h1>
            <Row className='basis-[15rem] gap-4'>
                <Narrow>
                    <Header>Server Side Support</Header>
                    <div dangerouslySetInnerHTML={{ __html: svgString }} />
                </Narrow>

                <Narrow>
                    <Header>Client Side Support</Header>
                    <PieChart
                        width={300}
                        height={300}
                        type='percentage'
                        colorSelector={idx => data[idx].color}
                        data={data}
                    />
                </Narrow>
            </Row>
            <Row className='gap-4'>
                <Styles />
                <DataManager />
            </Row>
        </Column>
    );
};

export default PieChartExample;
