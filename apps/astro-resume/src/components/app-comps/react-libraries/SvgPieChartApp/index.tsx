import { renderToString } from 'react-dom/server';
import { PieChart } from '@shjeon0730/react-svg-chart/src';
import { useState } from 'react';

const SvgPieChartApp = () => {
    const [data, setData] = useState([
        { label: 'React', percentage: 60 },
        { label: 'Angular', percentage: 30 },
        { label: 'Vue', percentage: 5 },
    ]);
    const [padding, setPadding] = useState({ l: 10, r: 10, t: 10, b: 10 });
    const [innerRadius, setInnerRadius] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [distance, setDistance] = useState(0);
    const [xRotate, setXRotate] = useState(0);

    const svgString = renderToString(
        <PieChart
            width={300}
            height={300}
            type='percentage'
            padding={padding}
            data={data}
            innerRadius={innerRadius}
            selectedIndex={selectedIndex}
            distance={distance}
            xRotate={xRotate}
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
                        data={data}
                    />
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor='paddings'>Paddings</label>
                    <input
                        id='paddings'
                        type='number'
                        onChange={e => {
                            setPadding({
                                l: e.target.valueAsNumber,
                                r: e.target.valueAsNumber,
                                t: e.target.valueAsNumber,
                                b: e.target.valueAsNumber,
                            });
                        }}
                        value={padding.l}
                    />

                    <input
                        type='number'
                        onChange={e => {
                            setInnerRadius(e.target.valueAsNumber);
                        }}
                        value={innerRadius}
                    />
                    <input
                        type='number'
                        onChange={e => {
                            setSelectedIndex(e.target.valueAsNumber);
                        }}
                        value={selectedIndex}
                        min={0}
                        max={data.length}
                    />
                    <input
                        type='number'
                        onChange={e => {
                            setDistance(e.target.valueAsNumber);
                        }}
                        value={distance}
                    />
                    <input
                        type='number'
                        onChange={e => {
                            setXRotate(e.target.valueAsNumber);
                        }}
                        value={xRotate}
                    />
                    <button
                        onClick={() => {
                            setData([
                                { label: 'React', percentage: 60 },
                                { label: 'Angular', percentage: 30 },
                                { label: 'Vue', percentage: 5 },
                            ]);
                        }}
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SvgPieChartApp;
