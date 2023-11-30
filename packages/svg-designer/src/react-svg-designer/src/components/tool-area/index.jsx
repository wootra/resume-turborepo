import React from 'react';
import css from './style.module.css';
import History from './tools/history';
import DrawingTools from './tools/drawing-tool-selector';
import DrawingOptions from './tools/drawing-options';
import GridTool from './tools/grid-tool';
import PathLogger from './tools/path-logger';
import Viewport from './tools/viewport';
import Magnify from './tools/magnify';
import ToolHelp from './tools/tool-help';
import SavTool from './tools/sav-tool';
import { ToolHelpContext } from '../../contexts/globalContexts';
import { useDynamicContextProvider } from '../../contexts/dynamic-context-utils';
const appVersion = 'v0.0.1';
export default function (props) {
    const toolboxHelpValue = useDynamicContextProvider({ name: '', txt: '' });
    const { state: helpData, setState: setHelp } = toolboxHelpValue;
    const isHelpOn = helpData.name.length > 0;
    const toolBoxWrapperClass = isHelpOn
        ? css.toolboxWrapperWithHelp
        : css.toolboxWrapper;
    return (
        <div className={toolBoxWrapperClass}>
            <ToolHelpContext.Provider value={toolboxHelpValue}>
                <div className={css.viewportTool}>
                    <div className={css.title}>{appVersion}</div>
                    <div className={css.title}>Viewport Tool</div>
                    <Viewport />
                    <Magnify />
                    <SavTool />
                </div>
                <div className={css.drawingTools}>
                    <div className={css.title}>Drawing Tool Selector</div>
                    <DrawingTools />
                </div>
                <div className={css.drawingOptins}>
                    <DrawingOptions />
                </div>
                <div className={css.gridTool}>
                    <GridTool />
                </div>
                <div className={css.historyTool}>
                    <History />
                </div>
                <div className={css.pathLoggerTool}>
                    <PathLogger />
                </div>
                <ToolHelp />
            </ToolHelpContext.Provider>
        </div>
    );
}
