import svgUtils from '../../utils/svg-gen-utils';
import { DrawingModes } from '../../consts';
import { dist } from './drawers';
import { createPathElement } from './pathDrawer';

let pressedTime = null;
let pressedPt = null;

const getPtFromEvent = (viewport, keyPressed, e) => {
  const offsets = e.target.getBoundingClientRect();
  const ratio =
    e.target && e.target.clientWidth
      ? viewport.width / e.target.clientWidth
      : 1.0;
  if (!e.target || !e.target.clientWidth)
    console.trace('why?', { target: e.target, client: e.target.clientWidth });
  return svgUtils.pt(
    (window.scrollX - offsets.left + e.clientX) * ratio + viewport.left,
    (window.scrollY - offsets.top + e.clientY) * ratio + viewport.top
  );
};

const getClientPt = (e) => {
  const offsets = e.target.getBoundingClientRect();
  return svgUtils.pt(
    window.scrollX - offsets.left + e.clientX,
    window.scrollY - offsets.top + e.clientY
  );
};

const returnPtByGrid = ({ designAreaVals, pt }) => {
  const convertToUnit = (floatVal, unit) => Math.round(floatVal / unit) * unit;

  if (designAreaVals.stickOnGrid) {
    const unit = designAreaVals.gridSize;
    return svgUtils.pt(convertToUnit(pt.x, unit), convertToUnit(pt.y, unit));
  } else return pt;
};

function get_now() {
  return new Date().getTime();
}

function get_time_diff(time1, time2) {
  const milisec_diff = Math.abs(time1 - time2);
  const days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));
  const date_diff = new Date(milisec_diff);
  return {
    mils: milisec_diff,
    d: days,
    h: date_diff.getHours(),
    m: date_diff.getMinutes(),
    s: date_diff.getSeconds(),
  };
}

export const createMouseDownHandler = ({
  designAreaVals,
  keyPressed,
  viewport,
  setActivePt,
  pathBuffer,
  setPathBuffer,
  setIsDragging,
  drawingMode,
  setTempPts,
}) => (e) => {
  const pt = getPtFromEvent(viewport, keyPressed, e);
  pressedPt = getClientPt(e);
  //if (drawingMode === DrawingModes.PATH) {
  pressedTime = get_now();
  const tempPt = returnPtByGrid({ designAreaVals, pt });
  setTempPts((state) => ({ ...state, pts: [...state.pts, tempPt] }));

  if (!pathBuffer) {
    setPathBuffer(svgUtils.path.pathUtils(tempPt));
  }
  // } else {
  //     setTempPts(state => ({ ...state, pts: [...state.pts, pt] }));
  // }
  setIsDragging(true);
  setActivePt(pt);
};

export const createMouseMoveHandler = ({
  designAreaVals,
  drawingMode,
  viewport,
  keyPressed,
  setActivePt,
}) => (e) => {
  const pt = getPtFromEvent(viewport, keyPressed, e);
  if (drawingMode === DrawingModes.PATH) {
    setActivePt(pt);
  } else {
    const tempPt = returnPtByGrid({ designAreaVals, pt });
    setActivePt(tempPt);
  }
};

export const createMouseUpHandler = ({
  viewport,
  designAreaVals,
  setActivePt,
  pathBuffer,
  setPathBuffer,
  setPathElements,
  keyPressed,
  pathElements,
  setIsDragging,
  drawingMode,
  setHistory,
  tempPts,
  setTempPts,
  tempElement,
  initElement,
  setTempElement,
}) => (e) => {
  let pt = getPtFromEvent(viewport, keyPressed, e);
  //if (drawingMode !== DrawingModes.PATH || tempPts.pts.length>0 && ) {

  //}
  const now = get_now();
  const timeDiff = get_time_diff(pressedTime, now);
  if (drawingMode === DrawingModes.PATH) {
    console.log('time diff:', timeDiff.mils);
    if (timeDiff.mils < 1000) {
      //click
      const tempPt = returnPtByGrid({ designAreaVals, pt });
      pt = tempPt;
    } else {
      //drag
      //pt = pt
    }
  } else {
    const tempPt = returnPtByGrid({ designAreaVals, pt });
    pt = tempPt;
  }

  const prevPts = tempPts.pts;
  if (tempPts.length === 0) {
    setTempElement(null);
    return;
  }
  let info = {};
  switch (drawingMode) {
    case DrawingModes.TEXT:
      info = {
        y: pt.y,
        x: pt.x,
        fontSize: 5,
        fill: 'black',
      };
      setHistory((state) => [
        ...state,
        {
          drawingMode,
          info: {
            ...info,
            text: 'SampleText',
          },
          element: svgUtils.renderer.createElementInfo(
            'text',
            info,
            'SampleText'
          ),
        },
      ]);

      break;
    case DrawingModes.CIRCLE:
    case DrawingModes.ELLIPSE:
    case DrawingModes.ELLIPSE_BY_WH:
    case DrawingModes.RECT:
      if (dist(prevPts[prevPts.length - 1], pt) > 1.0) {
        if (tempElement) {
          setHistory((state) => [
            ...state,
            {
              drawingMode,
              info: tempElement.info,
              element: tempElement.element,
            },
          ]);
        }
      }
      setTempPts((state) => ({ ...state, pts: [] }));
      setTempElement(null);
      break;
    case DrawingModes.PATH:
      if (prevPts.length >= 2) {
        const upPt = getClientPt(e);

        if (timeDiff.mils < 500 && dist(pressedPt, upPt) < 2) {
          //line
          if (dist(prevPts[prevPts.length - 2], pt) >= 1.0) {
            //prevPts[prevPts.length - 1] is the same spot with pt
            const element = pathBuffer.element.line(pt);
            setPathElements((state) => [...state, { element }]);
            setTempPts((state) => ({ ...state, pts: [pt] })); //leave the last pt
          } else {
            setTempPts((state) => ({ ...state, pts: [pt] })); //leave the last pt
          }
        } else {
          //arc
          const pt1 = prevPts[prevPts.length - 2];
          const pt2 = prevPts[prevPts.length - 1];
          const { element } = createPathElement(
            pathBuffer,
            keyPressed,
            pt1,
            pt2,
            pt
          );

          setPathElements((state) => [...state, { element }]);
          setTempPts((state) => ({ ...state, pts: [pt2] })); //leave the last pt
        }
      } else {
        setTempPts((state) => ({ ...state, pts: [...state.pts, pt] }));
      }

      break;
    default:
      break;
  }

  setIsDragging(false);
  //setActivePt(null);
};
