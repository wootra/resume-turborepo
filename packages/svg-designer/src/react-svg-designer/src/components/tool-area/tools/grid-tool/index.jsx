import React from 'react';
import {
    useDynamicContextConsumer,
    useDynamicContextConsumerSetter,
} from '../../../../contexts/dynamic-context-utils';
import {
    DesignAreaContext,
    ToolHelpContext,
} from '../../../../contexts/globalContexts';
import css from './style.module.css';
import mCss from '../../style.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import gridImage from '../../../../images/grid.svg';

export default function GridTool(props) {
    const [designArea, setDesignArea] =
        useDynamicContextConsumer(DesignAreaContext);
    const setToolHelp = useDynamicContextConsumerSetter(ToolHelpContext);
    const { gridSize, showGrid, stickOnGrid, backColor } = designArea;
    const [gridSizeTxt, setGridSizeTxt] = useState(gridSize);

    const plusMinusProps = (inc, className) => ({
        onClick: e => {
            setDesignArea(state => ({
                ...state,
                gridSize: state.gridSize + inc > 0 ? state.gridSize + inc : 5,
            }));
        },
        className,
    });

    const onShowGridChecked = e => {
        //const value = e.target.checked;
        setDesignArea(state => ({ ...state, showGrid: !state.showGrid }));
    };

    const onStickOnGrid = e => {
        setDesignArea(state => ({ ...state, stickOnGrid: !state.stickOnGrid }));
    };

    const onGridManualChange = e => {
        let value = e.target.value;
        let numVal = Number.parseFloat(value);
        if (value[value.length - 1] !== '.' && !isNaN(numVal) && numVal > 0) {
            setDesignArea(state => ({ ...state, gridSize: numVal }));
        } else {
            setGridSizeTxt(value);
        }
    };

    useEffect(() => {
        setGridSizeTxt(gridSize);
    }, [gridSize]);

    const onBackColorClicked = backColor => {
        setDesignArea(state => ({ ...state, backColor }));
        setToolHelp({
            name: 'backColor',
            txt: 'this back color is only for design. not begin assigned to svg.',
        });
    };
    return (
        <>
            <div className={mCss.title}>Design Env Tool</div>
            <div className={css.elementInfo}>
                <label className={css.itemInfoName}>
                    gridSize
                    <img
                        src={gridImage}
                        className={css.icon}
                        alt='grid'
                        title='gridSize'
                    />
                </label>
                <div {...plusMinusProps(-5, css.gridPlusMinus)}>&lt;&lt;</div>
                <div {...plusMinusProps(-1, css.gridPlusMinusSmall)}>&lt;</div>
                <input
                    type='text'
                    className={css.gridSizeInput}
                    value={gridSizeTxt}
                    onChange={onGridManualChange}
                />
                <div {...plusMinusProps(1, css.gridPlusMinusSmall)}>&gt;</div>
                <div {...plusMinusProps(5, css.gridPlusMinus)}>&gt;&gt;</div>
            </div>
            <div className={css.elementInfo}>
                <label className={css.itemInfoName}>showGrid</label>
                <input
                    type='checkbox'
                    checked={showGrid}
                    onChange={onShowGridChecked}
                />
            </div>
            <div className={css.elementInfo}>
                <label className={css.itemInfoName}>stick on grid</label>
                <input
                    type='checkbox'
                    checked={stickOnGrid}
                    onChange={onStickOnGrid}
                />
            </div>
            <div className={css.elementInfo}>
                <label className={css.itemInfoName}>backColor</label>

                <div
                    className={css.backColorBtn}
                    style={{ backgroundColor: 'black' }}
                    onClick={() => onBackColorClicked('black')}
                />
                <div
                    className={css.backColorBtn}
                    style={{ backgroundColor: 'white' }}
                    onClick={() => onBackColorClicked('white')}
                />
                <div
                    className={css.backColorBtn}
                    style={{ backgroundColor: 'gray' }}
                    onClick={() => onBackColorClicked('gray')}
                />
                <span className={css.arrow}>{`=>`}</span>
                <div
                    className={css.backColorResult}
                    style={{ backgroundColor: backColor }}
                />
            </div>
        </>
    );
}
