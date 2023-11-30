import svgUtils from '../../utils/svg-gen-utils';
import { DrawingModes } from '../../consts';
import { createTextObj } from '../../utils/svg-gen-utils/txtUtils';
import { createPathElement } from './pathDrawer';

export const dist = (pt1, pt2) =>
  Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));

export const createCircle1 = (pt1, pt2, style = {}) => {
  const info = {
    cx: pt1.x,
    cy: pt1.y,
    r: dist(pt1, pt2),
    style,
  };

  return { info, element: svgUtils.renderer.createElementInfo('circle', info) };
};

export const createCircle2 = (pt1, pt2, style = {}) => {
  const info = {
    cx: (pt1.x < pt2.x ? pt1.x : pt2.x) + Math.abs(pt2.x - pt1.x) / 2,
    cy: (pt1.y < pt2.y ? pt1.y : pt2.y) + Math.abs(pt2.y - pt1.y) / 2,
    r: dist(pt1, pt2) / 2,
    style,
  };

  return { info, element: svgUtils.renderer.createElementInfo('circle', info) };
};

export const createEllipse1 = (pt1, pt2, style = {}) => {
  const info = {
    cx: pt1.x,
    cy: pt1.y,
    rx: Math.abs(pt2.x - pt1.x),
    ry: Math.abs(pt2.y - pt1.y),
    style,
  };

  return {
    info,
    element: svgUtils.renderer.createElementInfo('ellipse', info),
  };
};

export const createEllipse2 = (pt1, pt2, style = {}) => {
  const info = {
    cx: (pt1.x < pt2.x ? pt1.x : pt2.x) + Math.abs(pt2.x - pt1.x) / 2,
    cy: (pt1.y < pt2.y ? pt1.y : pt2.y) + Math.abs(pt2.y - pt1.y) / 2,
    rx: Math.abs(pt2.x - pt1.x) / 2,
    ry: Math.abs(pt2.y - pt1.y) / 2,
    style,
  };
  return {
    info,
    element: svgUtils.renderer.createElementInfo('ellipse', info),
  };
};

export const createRect = (pt1, pt2, style = {}) => {
  const info = {
    x: pt1.x < pt2.x ? pt1.x : pt2.x,
    y: pt1.y < pt2.y ? pt1.y : pt2.y,
    width: Math.abs(pt2.x - pt1.x),
    height: Math.abs(pt2.y - pt1.y),
    style,
  };

  return { info, element: svgUtils.renderer.createElementInfo('rect', info) };
};

export const createRectFromCenter = (pt1, pt2, style = {}) => {
  const info = {
    x: pt1.x - Math.abs(pt2.x - pt1.x),
    y: pt1.y - Math.abs(pt2.y - pt1.y),
    width: Math.abs(pt2.x - pt1.x) * 2,
    height: Math.abs(pt2.y - pt1.y) * 2,
    style,
  };
  return { info, element: svgUtils.renderer.createElementInfo('rect', info) };
};

export const drawWrapperImage = ({
  viewport,
  activePt,
  pathElements,
  isDragging,
  keyPressed,
  tempPts,
  drawingMode,
  setTempPts,
  setTempElement,
  setWrapperElements,
  initElement,
  pathBuffer,
  setPathBuffer,
}) => {
  let tempElement1 = null;
  let tempElement2 = null;
  const tempLineWidth = viewport.width / 1000.0;
  const dashOn = tempLineWidth * 5;
  const dashOff = tempLineWidth * 10;
  const strokeDasharray = [dashOn.toFixed(2), dashOff.toFixed(2)].join(',');
  let pt = activePt;
  const prevPts = tempPts.pts;
  if (prevPts.length === 0) return [];
  const prevPt = prevPts[prevPts.length - 1];
  const defaultStyle = {
    fill: 'transparent',
    stroke: 'black',
    strokeWidth: tempLineWidth,
  };
  const defaultAreaStyle = {
    fill: 'transparent',
    stroke: 'black',
    strokeWidth: tempLineWidth,
    strokeDasharray,
  };
  switch (drawingMode) {
    case DrawingModes.CIRCLE:
      if (keyPressed.alt) {
        if (keyPressed.shift) {
          tempElement1 = createCircle2(prevPt, pt, defaultStyle);
          tempElement2 = createRect(prevPt, pt, defaultAreaStyle);
        } else {
          tempElement1 = createCircle1(prevPt, pt, defaultStyle);
          const len = dist(prevPt, pt);
          const pt1 = svgUtils.pt(prevPt.x - len, prevPt.y - len);
          const pt2 = svgUtils.pt(prevPt.x + len, prevPt.y + len);

          tempElement2 = createRect(pt1, pt2, defaultAreaStyle);
        }
      } else if (keyPressed.shift) {
        tempElement1 = createEllipse2(prevPt, pt, defaultStyle);
        tempElement2 = createRect(prevPt, pt, defaultAreaStyle);
      } else {
        tempElement1 = createEllipse1(prevPt, pt, defaultStyle);
        tempElement2 = createRectFromCenter(prevPt, pt, defaultAreaStyle);
      }
      break;
    case DrawingModes.RECT:
      if (keyPressed.alt) {
        //square
        const xLen = Math.abs(prevPt.x - pt.x);
        const yLen = Math.abs(prevPt.y - pt.y);
        const len = xLen > yLen ? xLen : yLen;

        if (keyPressed.shift) {
          //side start

          const pmX = pt.x - prevPt.x > 0 ? 1 : -1;
          const pmY = pt.y - prevPt.y > 0 ? 1 : -1;

          const pt2 = svgUtils.pt(prevPt.x + len * pmX, prevPt.y + len * pmY);

          tempElement1 = createRect(prevPt, pt2, defaultStyle);
        } else {
          //center start
          const pt1 = svgUtils.pt(prevPt.x - len, prevPt.y - len);
          const pt2 = svgUtils.pt(prevPt.x + len, prevPt.y + len);
          tempElement1 = createRect(pt1, pt2, defaultStyle);
        }
      } else {
        if (keyPressed.shift) {
          tempElement1 = createRect(prevPt, pt, defaultStyle);
        } else {
          tempElement1 = createRectFromCenter(prevPt, pt, defaultStyle);
        }
      }

      break;
    case DrawingModes.PATH:
      // if (keyPressed.char === 'c') {
      //   const beforePt = prevPts[prevPts.length - 1];
      //   pt = activePt;

      // }
      if (isDragging) {
        if (prevPts.length >= 2) {
          const pt1 = prevPts[prevPts.length - 2];
          const pt2 = prevPts[prevPts.length - 1];
          const { element, info } = createPathElement(
            pathBuffer,
            keyPressed,
            pt1,
            pt2,
            pt
          );

          const currElements = pathElements.map((i) => i.element);
          tempElement1 = {
            info,
            element: pathBuffer.unclosedRender(
              [...currElements, element],
              'black',
              'transparent',
              tempLineWidth,
              { strokeDasharray }
            ),
          };
        }
      } else {
        const element = pathBuffer.element.line(pt, true);
        const currElements = pathElements.map((i) => i.element);
        tempElement1 = {
          info: { pt },
          element: pathBuffer.unclosedRender(
            [...currElements, element],
            'black',
            'transparent',
            tempLineWidth,
            { strokeDasharray }
          ),
        };
      }

      break;
    default:
      break;
  }

  let wrapperElements = [];

  if (tempElement1) {
    setTempElement(tempElement1);
    if (tempElement2) {
      wrapperElements = [tempElement1.element, tempElement2.element];
    } else {
      wrapperElements = [tempElement1.element];
    }
  }
  return wrapperElements;
};

export function drawGridLine({ designAreaVals, viewport }) {
  const tempLineWidth = viewport.width / 1000.0;
  const dashOn = tempLineWidth * 5;
  const dashOff = tempLineWidth * 5;
  const strokeDasharray = [dashOn.toFixed(2), dashOff.toFixed(2)].join(',');
  const { gridSize, showGrid } = designAreaVals;
  if (showGrid) {
    const rowGrids = [];
    const colGrids = [];
    const pathTool = svgUtils.path;
    const getPt = svgUtils.pt;
    let aLine;
    let pathBuffer;
    const right = viewport.left + viewport.width;
    const bottom = viewport.top + viewport.height;

    for (let i = gridSize + viewport.left; i < right; i += gridSize) {
      pathBuffer = pathTool.pathUtils(getPt(i, viewport.top - dashOn));
      aLine = pathBuffer.element.line(getPt(i, bottom));
      colGrids.push(
        pathBuffer.unclosedRender(
          [aLine],
          'rgba(255,255,255,0.5)',
          'transparent',
          tempLineWidth,
          { strokeDasharray }
        )
      );
    }
    for (let i = gridSize + viewport.top; i < bottom; i += gridSize) {
      pathBuffer = pathTool.pathUtils(getPt(viewport.left - dashOn, i));
      aLine = pathBuffer.element.line(getPt(right, i));
      rowGrids.push(
        pathBuffer.unclosedRender(
          [aLine],
          'rgba(255,255,255,0.5)',
          'transparent',
          tempLineWidth,
          { strokeDasharray }
        )
      );
    }
    for (let i = gridSize + viewport.left; i < right; i += gridSize) {
      pathBuffer = pathTool.pathUtils(getPt(i, viewport.top));
      aLine = pathBuffer.element.line(getPt(i, bottom));
      colGrids.push(
        pathBuffer.unclosedRender(
          [aLine],
          'rgba(0,0,0,0.5)',
          'transparent',
          tempLineWidth,
          { strokeDasharray }
        )
      );
    }
    for (let i = gridSize + viewport.top; i < bottom; i += gridSize) {
      pathBuffer = pathTool.pathUtils(getPt(viewport.left, i));
      aLine = pathBuffer.element.line(getPt(right, i));
      rowGrids.push(
        pathBuffer.unclosedRender(
          [aLine],
          'rgba(0,0,0,0.5)',
          'transparent',
          tempLineWidth,
          { strokeDasharray }
        )
      );
    }
    return [...colGrids, ...rowGrids];
  } else {
    return [];
  }
}
