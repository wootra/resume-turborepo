import { useDataContext } from './DataContext';
import { Column, Narrow, Row } from './Containers';
import NumberField from './NumberField';
import Header from './Header';
const colors = [
    '#000000',
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#FFFF00',
    '#FF00FF',
    '#00FFFF',
    '#800000',
    '#008000',
    '#000080',
    '#808000',
    '#800080',
    '#008080',
    '#C00000',
];
const DataManager = () => {
    const { data, setData, resetData, selectedIndex, setSelectedIndex } =
        useDataContext();

    return (
        <Narrow>
            <Column>
                <Header>data manager</Header>
                <Row>
                    <NumberField
                        label='selectedIndex'
                        value={selectedIndex}
                        onChange={setSelectedIndex}
                        min={0}
                        max={data.length}
                    />
                </Row>
                <Row>
                    <span className='text-center'>Label</span>
                    <span className='text-center'>Percentage</span>
                </Row>
                {data.map((d, idx) => {
                    return (
                        <Row className='grid-cols-7' key={d.label + idx}>
                            <input
                                className='border border-gray border-solid grid col-span-3'
                                type='text'
                                onChange={e => {
                                    setData(
                                        data.map((d1, idx1) => {
                                            if (idx1 === idx) {
                                                return {
                                                    ...d1,
                                                    label: e.target.value,
                                                };
                                            }
                                            return d1;
                                        })
                                    );
                                }}
                                value={d.label}
                            />
                            <input
                                className='border border-gray border-solid col-span-3'
                                type='number'
                                onChange={e => {
                                    setData(
                                        data.map((d1, idx1) => {
                                            if (idx1 === idx) {
                                                return {
                                                    ...d1,
                                                    percentage:
                                                        e.target.valueAsNumber,
                                                };
                                            }
                                            return d1;
                                        })
                                    );
                                }}
                                value={d.percentage}
                            />
                            <input
                                className='col-span-1'
                                type='color'
                                value={d.color}
                                onChange={e => {
                                    setData(
                                        data.map((d1, idx1) => {
                                            if (idx1 === idx) {
                                                return {
                                                    ...d1,
                                                    color: e.target.value,
                                                };
                                            }
                                            return d1;
                                        })
                                    );
                                }}
                            />
                        </Row>
                    );
                })}
                <Row>
                    <button
                        className='p-4 bg-slate-500 text-white rounded-lg'
                        onClick={() => {
                            setData(data => [
                                ...data,
                                {
                                    label: 'unlabeled',
                                    percentage: 0,
                                    color: colors[data.length % colors.length],
                                },
                            ]);
                        }}
                    >
                        ADD
                    </button>
                    <button
                        className='p-4 bg-slate-500 text-white rounded-lg'
                        onClick={resetData}
                    >
                        Reset
                    </button>
                </Row>
            </Column>
        </Narrow>
    );
};

export default DataManager;
