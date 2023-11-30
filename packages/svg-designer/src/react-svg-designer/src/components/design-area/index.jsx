import React, { useMemo, useState } from 'react';
import css from './style.module.css';
import {
  DesignAreaContext,
  ViewportContext,
  ModeContext,
  HistoryContext,
  PathElementsContext,
  ModifyingItemContext,
  PressedKeyContext,
} from '../../contexts/globalContexts';
import {
  useDynamicContextConsumerState,
  useDynamicContextConsumer,
} from '../../contexts/dynamic-context-utils';
import svgUtils from '../../utils/svg-gen-utils';
import { useEffect } from 'react';
import {
  createMouseDownHandler,
  createMouseMoveHandler,
  createMouseUpHandler,
} from './mouse-handlers';
import { DrawingModes } from '../../consts';
import { drawWrapperImage, drawGridLine } from './drawers';
import { useKeyEvents } from '../../utils/key-event-handlers';
import {
  workingElements,
  historyToElements,
} from '../../utils/element-handlers';
// design-area/index.html

export default function DesignArea(props) {
  const [designAreaVals, setDesignAreaVals] = useDynamicContextConsumer(
    DesignAreaContext
  );
  const viewport = useDynamicContextConsumerState(ViewportContext);
  const [modes, setModes] = useDynamicContextConsumer(ModeContext);
  const [history, setHistory] = useDynamicContextConsumer(HistoryContext);
  const [pathElements, setPathElements] = useDynamicContextConsumer(
    PathElementsContext
  );
  const modifyingItem = useDynamicContextConsumerState(ModifyingItemContext);
  const [tempElement, setTempElement] = useState(null);
  const [tempSvg, setTempSvg] = useState([]);
  const [actualSvg, setActualSvg] = useState([]);
  const [tempPts, setTempPts] = useState({ pts: [] });
  const [pathBuffer, setPathBuffer] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [keyPressed, setKeyPressed] = useDynamicContextConsumer(
    PressedKeyContext
  );

  const [activePt, setActivePt] = useState(null);
  //const [pathElements, setPathElements] = useState([]);

  const { drawingMode, prevDrawingMode } = modes;
  const tempLineWidth = viewport.width / 1000.0;
  const dashOn = tempLineWidth * 5;
  const dashOff = tempLineWidth * 10;
  const strokeDasharray = [dashOn.toFixed(2), dashOff.toFixed(2)].join(',');
  const designAreaStyle = useMemo(
    () =>
      designAreaVals.rate === 1.0
        ? {
            width: designAreaVals.width * designAreaVals.rate - 15 + 'px',
            height:
              (designAreaVals.width - 15) *
                designAreaVals.rate *
                (viewport.height / viewport.width) +
              'px',
          }
        : {
            width: designAreaVals.width * designAreaVals.rate + 'px',
            height:
              designAreaVals.width *
                designAreaVals.rate *
                (viewport.height / viewport.width) +
              'px',
          },
    [designAreaVals, viewport]
  );
  const grid = useMemo(() => drawGridLine({ designAreaVals, viewport }), [
    designAreaVals,
    viewport,
  ]);

  const backSvg = useMemo(
    () => {
      const rect = svgUtils.renderer.createElementInfo('rect', {
        x: viewport.left - 1,
        y: viewport.top - 1,
        width: viewport.width + 2,
        height: viewport.height + 2,
        style: { fill: designAreaVals.backColor, strokeWidth: 0 },
      });
      return svgUtils.renderer.svgRender(
        React.createElement,
        viewport.left,
        viewport.top,
        viewport.width,
        viewport.height,
        {},
        [rect, ...grid]
      );
    },
    [viewport, grid, designAreaVals.backColor]
  );

  const frontSvg = useMemo(
    () => {
      return svgUtils.renderer.svgRender(
        React.createElement,
        viewport.left,
        viewport.top,
        viewport.width,
        viewport.height,
        {},
        grid
      );
    },
    [viewport, grid]
  );

  const workingElement = useMemo(
    () => {
      return workingElements(modifyingItem);
    },
    [modifyingItem, designAreaVals.rate]
  );

  const designAreaWrapperStyle = useMemo(
    () => ({
      width: designAreaVals.width + 'px',
      height: designAreaVals.height - 15 + 'px',
    }),
    [designAreaVals]
  );

  const initElement = [
    svgUtils.renderer.createElementInfo('rect', {
      x: viewport.left - 1,
      y: viewport.top - 1,
      width: viewport.width + 2,
      height: viewport.height + 2,
      style: { fill: 'transparent', stroke: 'red', strokeWidth: 1 },
    }),
  ];

  const hooksContextVals = {
    designAreaVals,
    viewport,
    setModes,
    setKeyPressed,
    modes,
    setActivePt,
    activePt,
    pathElements,
    setPathElements,
    keyPressed,
    isDragging,
    setIsDragging,
    drawingMode,
    setHistory,
    setTempPts,
    tempPts,
    tempElement,
    initElement,
    setTempElement,
    pathBuffer,
    setPathBuffer,
  };

  useEffect(
    () => {
      const elements = historyToElements(history, setDesignAreaVals);
      const svg = svgUtils.renderer.svgRender(
        React.createElement,
        viewport.left,
        viewport.top,
        viewport.width,
        viewport.height,
        {},
        elements
      );
      setActualSvg(svg);
    },
    [history, viewport]
  );

  useEffect(
    () => {
      setTempPts({ pts: [] }); //when drawing mode is changed, set tempPts to empty.
      setTempElement(null);

      if (drawingMode !== DrawingModes.PATH) {
        if (pathBuffer) {
          const elements = pathElements.map((i) => i.element);
          if (elements.length > 0) {
            const info = {
              stroke: 'black',
              fill: 'transparent',
              strokeWidth: tempLineWidth,
            };
            const paths = pathBuffer.render(
              elements,
              info.stroke,
              info.fill,
              info.strokeWidth
            );

            setHistory((state) => [
              ...state,
              { drawingMode: prevDrawingMode, info, element: paths },
            ]);
          }
        }
      }
      setPathBuffer(null);
      setPathElements([]); //initialize path
      setActivePt(null);
    },
    [drawingMode]
  ); //when drawing mode is changed..

  const mouseProps = {
    onMouseDown: createMouseDownHandler(hooksContextVals),
    onMouseMove: createMouseMoveHandler(hooksContextVals),
    onMouseUp: createMouseUpHandler(hooksContextVals),
  };
  useEffect(
    () => {
      const baseElements = [...initElement, ...workingElement];
      if (activePt) {
        const wrapperElements = drawWrapperImage(hooksContextVals);
        const pathElementArr = pathElements.map((i) => i.element);
        const tempPaths =
          pathBuffer && pathElements.length > 0
            ? [
                pathBuffer.unclosedRender(
                  pathElementArr,
                  'black',
                  'transparent',
                  tempLineWidth,
                  { strokeDasharray }
                ),
              ]
            : [];

        const elementsToShow = [
          ...baseElements,
          ...wrapperElements,
          ...tempPaths,
        ];
        const svg = svgUtils.renderer.svgRender(
          React.createElement,
          viewport.left,
          viewport.top,
          viewport.width,
          viewport.height,
          {},
          elementsToShow
        );
        setTempSvg(svg);
      } else {
        const svg = svgUtils.renderer.svgRender(
          React.createElement,
          viewport.left,
          viewport.top,
          viewport.width,
          viewport.height,
          {},
          [...baseElements]
        );
        setTempSvg(svg);
      }
    },
    [
      activePt,
      viewport,
      tempPts,
      keyPressed,
      pathElements,
      designAreaVals,
      modifyingItem,
    ]
  );

  useKeyEvents(hooksContextVals);
  return (
    <div
      className={css.designAreaWrapper}
      style={designAreaWrapperStyle}
      {...mouseProps}
    >
      <div className={css.backArea} style={designAreaStyle}>
        {backSvg}
      </div>
      <div className={css.actualArea} style={designAreaStyle}>
        {actualSvg}
      </div>
      <div className={css.designArea} style={designAreaStyle}>
        {tempSvg}
      </div>
      <div className={css.designArea} style={designAreaStyle}>
        {drawingMode !== DrawingModes.NONE ? frontSvg : null}
      </div>
      <div className={css.designAreaCover} style={designAreaStyle} />
      {/* this area is event collector. don't add anything. */}
    </div>
  );
}
