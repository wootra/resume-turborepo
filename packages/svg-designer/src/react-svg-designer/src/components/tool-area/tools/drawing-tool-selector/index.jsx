import React from 'react';
import { useDynamicContextConsumer } from '../../../../contexts/dynamic-context-utils';
import { ModeContext } from '../../../../contexts/globalContexts';
import css from './style.module.css';
import { DrawingModes } from '../../../../consts';
import { changeMode } from '../../../../utils/mode-handler';
import { useMemo } from 'react';

export default function DrawingToolSelector(props) {
    const [modes, setModes] = useDynamicContextConsumer(ModeContext);
    const { drawingMode } = modes;
    const modeArr = useMemo(() => {
        const arr = [];
        for (const key in DrawingModes) {
            if (typeof DrawingModes[key] !== 'function') arr.push(DrawingModes[key]);
        }
        return arr;
    }, []);


    const iconList = useMemo(() => modeArr.map((item, idx) => {
        let icon = DrawingModes.getIcon(item);
        const btnProps = (item) => ({
            onClick: e => {
                changeMode(setModes, item);
            }
        })
        if (typeof icon === 'object') {
            icon = <img {...icon} className={css.toolImg} alt={icon.alt || "icon"} />
        } else if (typeof icon !== 'string') {
            throw Error('type of icon only can be string or {url:"imageName"}. ')
        }
        return (item === drawingMode) ?
            <div key={idx} className={css.selectedToolBtn} {...btnProps(item)}>{icon}</div> :
            <div key={idx} className={css.unselectedToolBtn} {...btnProps(item)}>{icon}</div>;
    })
        , [drawingMode, modeArr, setModes]);

    return iconList;

}