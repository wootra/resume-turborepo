import { renderToString } from 'react-dom/server';
import { PieChart } from 'react-svg-chart';

const SvgPieChartApp = () => {
    const svgString = renderToString(
        <PieChart
            width={300}
            height={300}
            type='percentage'
            data={[
                { label: 'React', percentage: 50 },
                { label: 'Angular', percentage: 30 },
                { label: 'Vue', percentage: 20 },
            ]}
        />
    );
    return (
        <div>
            <h1>Pie Chart</h1>
            <div className='flex basis-[30rem] flex-row'>
                <div>
                    <h2>Server Side Support</h2>
                    <div dangerouslySetInnerHTML={{ __html: svgString }} />
                </div>

                <div>
                    <h2>Client Side Support</h2>
                    <PieChart
                        width={300}
                        height={300}
                        type='percentage'
                        data={[
                            { label: 'React', percentage: 50 },
                            { label: 'Angular', percentage: 30 },
                            { label: 'Vue', percentage: 20 },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default SvgPieChartApp;
