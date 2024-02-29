import { Column, Narrow, Row } from './Containers';
import Header from './Header';
import NumberField from './NumberField';
import { useStyleContext } from './StyleContext';

export const Styles = () => {
    const {
        padding,
        setPadding,
        innerRadius,
        setInnerRadius,
        distance,
        setDistance,
        xRotate,
        setXRotate,
    } = useStyleContext();

    return (
        <Column>
            <Header>styles</Header>
            <Row>
                <NumberField
                    label='padding'
                    value={padding.l}
                    onChange={num => {
                        setPadding({
                            l: num,
                            r: num,
                            t: num,
                            b: num,
                        });
                    }}
                />
            </Row>
            <Row>
                <NumberField
                    label='innerRadius'
                    value={innerRadius}
                    onChange={setInnerRadius}
                />
            </Row>

            <Row>
                <NumberField
                    label='distance'
                    value={distance}
                    onChange={setDistance}
                />
            </Row>
            <Row>
                <NumberField
                    label='xRotate'
                    value={xRotate}
                    onChange={setXRotate}
                />
            </Row>
        </Column>
    );
};
