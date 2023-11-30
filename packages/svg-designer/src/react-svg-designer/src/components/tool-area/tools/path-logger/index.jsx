import React, { useEffect } from 'react';
import css from './style.module.css';
import mCsss from '../../style.module.css';
import { useState } from 'react';
import { useDynamicContextConsumer } from '../../../../contexts/dynamic-context-utils';
import { PathElementsContext } from '../../../../contexts/globalContexts';
import pathParser from 'svg-path-parser';

const ptToString = pt => {
    return '(' + [pt.x.toFixed(2), pt.y.toFixed(2)].join(',') + ')';
}

const logPath = (item, pathsFromProps) => {
    let itemToShow;
    if (!pathsFromProps) {

        if (item.element.includes('NaN')) {
            console.log("logPath: wrong path item - ", item.element);
            itemToShow = { command: 'wrong', element: item.element };
        } else {
            const parsed = pathParser("M0,0" + item.element);
            itemToShow = parsed[1];
        }

    } else {
        itemToShow = item;
    }

    const { code, command, ...rest } = itemToShow;
    return (command + ":" + JSON.stringify(rest)).replace(/"|\{|\}/g, ' ');

}

const pathItemRenderer = (opened, pathsFromProps, item, idx, onExpandClicked, onDeleteBtnClicked) => {

    return (<div key={idx} className={css.pathItemWrapper}>
        <div className={css.pathItemTitleRow}>
            <div className={css.expandBtn} onClick={onExpandClicked}>{opened ? '-' : '+'}</div>
            <div className={css.pathItemName}>
                {logPath(item, pathsFromProps)}
            </div>
            <div className={css.deleteHistory} onClick={onDeleteBtnClicked}>X</div>
        </div>
        {
            opened ?
                (
                    <div className={css.elementInfo}>

                    </div>
                ) : null
        }
    </div>);
}

export default function PathLogger(props) {
    const [modifyingPath, setModifyingPath] = useState({ idx: -1, item: null });
    let { pathElements, setPathElements } = props;
    const pathsFromProps = (pathElements && setPathElements);
    const partialProps = (pathElements || setPathElements);
    if (partialProps && !pathsFromProps) throw Error("use PathLogger with pathElements and setPathElements or empty attributes")
    const [pathElementsContext, setPathElementsContext] = useDynamicContextConsumer(PathElementsContext);
    if (!pathsFromProps) {
        pathElements = pathElementsContext;
        setPathElements = setPathElementsContext;
    }
    const onDeleteBtnClicked = idx => e => {
        setPathElements(elements => elements.filter((p, pi) => pi !== idx))
        if (idx === modifyingPath.idx) {
            setModifyingPath({ idx: -1, item: null });
        }
    }
    const onExpandClicked = idx => e => {
        if (idx >= 0 && modifyingPath.idx === idx) {
            setModifyingPath({ idx: -1, item: null });
        }
        else {
            const clonedItem = Object.assign({}, pathElements[idx])
            console.log("path-logger item:", { clonedItem })
            setModifyingPath({ idx, item: clonedItem });
        }
    }
    useEffect(() => {

    }, [modifyingPath, pathElements])

    return (
        <div className={css.pathLoggerWrapper}>
            <div className={mCsss.title}>Path logger</div>
            {
                pathElements.map((i, idx) => {

                    if (modifyingPath.idx === idx) {
                        return pathItemRenderer(true, pathsFromProps, modifyingPath.item, idx, onExpandClicked(idx), onDeleteBtnClicked(idx))
                    } else {
                        return pathItemRenderer(false, pathsFromProps, i, idx, onExpandClicked(idx), onDeleteBtnClicked(idx))
                    }
                })
            }
        </div>);
}