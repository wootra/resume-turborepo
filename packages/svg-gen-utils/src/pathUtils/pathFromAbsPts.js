import { pathUtils } from './pathUtils';
import { pt as getPt, isPt } from '../etcUtils';

export const pt = getPt;

const createPathToolWrapper = (name, state = {}, init = false) => {
    return {
        type: 'path-tool-wrapper',
        name,
        state,
        init,
    };
};

const ARC = 'ARC';
const LINE = 'LINE';

export const PathTools = Object.freeze({
    LINE: Object.freeze({
        name: () => LINE,
        init: () => createPathToolWrapper(LINE, {}, true),
    }),
    ARC: Object.freeze({
        name: () => ARC,
        init: (rad = 5.0, bigArc = 0, positiveArc = 1) =>
            createPathToolWrapper(ARC, { rad, bigArc, positiveArc }, true),
        rad: (rad = 5.0) => createPathToolWrapper(ARC, { rad }),
        bigArc: () => createPathToolWrapper(ARC, { bigArc: 1 }),
        smallArc: () => createPathToolWrapper(ARC, { bigArc: 0 }),
        positiveArc: () => createPathToolWrapper(ARC, { positiveArc: 1 }),
        negativeArc: () => createPathToolWrapper(ARC, { positiveArc: 0 }),
    }),
});

const isPathTool = pathTool => {
    return (
        pathTool.type === 'path-tool-wrapper' &&
        pathTool.name &&
        PathTools[pathTool.name]
    );
};

const throwLog = (logArr = [], errItem = null, logMsg = '') => {
    const last10Log = logArr.length > 0 ? logArr.slice(-10) : logArr;
    const itemToText = curr => {
        if (isPt(curr)) return `{${curr.x},${curr.y}}`;
        else if (isPathTool(curr)) return `[${curr.name}]`;
        else return JSON.stringify(curr);
    };

    const errLogArr = last10Log.map(itemToText);

    throw Error(
        logMsg +
            '\n\nerror at ' +
            logArr.length +
            ' position\n trace:\n' +
            errLogArr.join(' -> ') +
            '\n<<<ERROR AT HERE:>>>' +
            itemToText(errItem)
    );
};

export const pathsFromAbsPts = (
    ptArr,
    strokeColor = 'black',
    fillColor = 'transparent',
    strokeWidth = '1',
    rest = {}
) => {
    const firstPt = ptArr.shift();
    if (!isPt(firstPt))
        throwLog(
            [],
            firstPt,
            'first item of ptArr must be point. use pt(x,y) function'
        );
    const pathUtil = pathUtils(firstPt);
    let tool = null;
    let logArr = [firstPt];
    let savedTools = {};
    const updateToolAndSave = item => {
        tool.state = {
            ...tool.state,
            ...item.state,
        };
        savedTools = {
            ...savedTools,
            [item.name]: tool,
        };
    };
    const saveCurrentTool = item => {
        if (!tool || tool.name !== item.name) {
            if (!item.init) {
                if (!savedTools[item.name]) {
                    throwLog(
                        logArr,
                        item,
                        'when you use PathTool for the first time, use init function at least once.'
                    );
                } else {
                    tool = savedTools[item.name];
                    updateToolAndSave(item);
                }
            } else {
                savedTools = {
                    ...savedTools,
                    [item.name]: item,
                };
                tool = item;
            }
        } else {
            updateToolAndSave(item);
        }
    };
    console.log('before start loop:', { ptArr, tool });
    const elements = [];
    for (let item of ptArr) {
        if (isPathTool(item)) {
            //it is mandatory to set tool.
            saveCurrentTool(item);
            console.log({ tool });
            continue; //it is tool, so do not draw anything but saving the tool.
        }
        if (!tool) {
            //when tool has not been set,
            throwLog(
                logArr,
                item,
                'path tool should be defined before setting the point to go - use PathTools'
            );
        }
        if (!isPt(item)) {
            throwLog(
                logArr,
                item,
                'you need to set pt({x,y}) in the array. use pt(x,y) function'
            );
        }
        const pt = item; //aliasing
        try {
            if (tool.name === ARC) {
                elements.push(
                    pathUtil.element.arc(
                        pt,
                        tool.state.rad,
                        tool.state.bigArc,
                        tool.state.positiveArc
                    )
                );
            } else if (tool.name === LINE) {
                elements.push(pathUtil.element.line(pt));
            } else {
                throw Error(tool.name + ' is not supported yet');
            }
        } catch (e) {
            throwLog(logArr, item, e.message);
        }

        logArr.push(item);
    }

    return pathUtil.render(elements, strokeColor, fillColor, strokeWidth, rest);
};

export const test = () => {
    pathsFromAbsPts([
        pt(1, 1),
        PathTools.ARC.init(3),
        pt(3, 3),
        PathTools.ARC.negativeArc(),
        pt(5, 5),
        PathTools.ARC.positiveArc(),
        pt(7, 7),
        PathTools.ARC.negativeArc(),
        pt(9, 9),
        pt(1, 1),
    ]);
};

export default pathsFromAbsPts;
