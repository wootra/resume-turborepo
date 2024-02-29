const NumberField = ({
    label: labelStr,
    value,
    onChange,
    min,
    max,
}: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
}) => {
    const minMaxProps =
        typeof min !== 'undefined' && typeof max !== 'undefined'
            ? { min, max }
            : {};
    return (
        <>
            <label htmlFor={`${labelStr}-id`}>{labelStr}</label>
            <input
                className='border border-gray border-solid'
                type='number'
                id={`${labelStr}-id`}
                onChange={e => {
                    onChange(e.target.valueAsNumber);
                }}
                value={value}
                {...minMaxProps}
            />
        </>
    );
};

export default NumberField;
