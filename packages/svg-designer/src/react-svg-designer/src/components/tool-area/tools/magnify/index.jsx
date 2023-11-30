import React from 'react';
import { useDynamicContextConsumer } from '../../../../contexts/dynamic-context-utils';
import { DesignAreaContext } from '../../../../contexts/globalContexts';
import css from './style.module.css';
import mCss from '../../style.module.css';
import maginfier from '../../../../images/magnify.svg';

export default function Magnify(props) {
    const [designArea, setDesignArea] = useDynamicContextConsumer(DesignAreaContext);
    const increaseDesignArea = e => {
        setDesignArea(state => ({ ...state, rate: state.rate < 10 ? state.rate + 1 : 10 }))
    }
    const decreaseDesignArea = e => {
        setDesignArea(state => ({ ...state, rate: state.rate > 1 ? state.rate - 1 : 1 }))
    }
    const designAreaRateTxt = (designArea.rate).toFixed(1);

    return (<div>
        <img src={maginfier} className={css.magnifier} alt="magnify" />
        <label className={mCss.itemInfoName}>x</label>
        <span className={css.magnifyRate}>{designAreaRateTxt}</span>
        <button onClick={increaseDesignArea}>+</button>
        <button onClick={decreaseDesignArea}>-</button>
    </div>);
}