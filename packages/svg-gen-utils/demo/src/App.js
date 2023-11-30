import React from 'react';
import svgUtils from '@shjeon0730/svg-gen-utils';
import HorseShoeChart from './HorseShoeChart'
import './App.css';

function textSample() {
  const centerText = svgUtils.text.drawCenterTexts(["Center", "text"], svgUtils.pt(0, 0), svgUtils.text.createDefaultOption(15, 1, 'red'));
  const textGroup = svgUtils.etc.group(centerText, 'text-group-sample');
  const rect = svgUtils.renderer.createElementInfo('rect', { width: 40, height: 40, x: -20, y: -20, style: { fill: 'yellow', strokeWidth: 0.1, stroke: 'black' } })

  return svgUtils.renderer.svgRender(React.createElement, -50, -50, 100, 100, {}, [rect, textGroup]);
}

function makeAPathPrimitive(color) {
  const pathUtil = svgUtils.path;
  const offsetX = -30;
  const offsetY = -30;

  const arrToPt = arr => ({ x: arr[0] + offsetX, y: arr[1] + offsetY });
  const startPoint = arrToPt([0, 0]);
  const linePtsL2R = [[4, 0], [14, 5], [24, -5], [34, 0]].map(arrToPt);
  const posArcsT2B = [[34, 10], [34, 20], [34, 30], [34, 40]].map(arrToPt);
  const bigArcR2L = [[0, 50]].map(arrToPt);
  const negArcsB2T = posArcsT2B.map(pt => ({ ...pt, x: offsetX })).reverse();

  const instance = pathUtil.default(startPoint);
  const builder = instance.element;
  const elements = [
    ...linePtsL2R.map(pt => builder.line(pt)),
    ...posArcsT2B.map(pt => builder.arc(pt, 7, 0, 1)),
    ...bigArcR2L.map(pt => builder.arc(pt, 20, 1, 1)),
    ...negArcsB2T.map(pt => builder.arc(pt, 5, 0, 0))
  ];
  return instance.render(elements, 'red', color, '1');
}

function primitivePathSample() {
  return svgUtils.renderer.svgRender(React.createElement, -50, -50, 100, 100, {}, [makeAPathPrimitive('yellow')]);
}

function makeAPath(color) {
  const pathUtil = svgUtils.path;

  const { pathsFromAbsPts, PathTools } = pathUtil;
  const offsetX = -30;
  const offsetY = -30;
  const arrToPt = arr => ({ x: arr[0] + offsetX, y: arr[1] + offsetY });
  const startPoint = arrToPt([0, 0]);
  const linePtsL2R = [[4, 0], [14, 5], [24, -5], [34, 0]].map(arrToPt);
  const posArcsT2B = [[34, 10], [34, 20], [34, 30], [34, 40]].map(arrToPt);
  const bigArcR2L = [[0, 50]].map(arrToPt);
  const negArcsB2T = posArcsT2B.map(pt => ({ ...pt, x: offsetX })).reverse();

  return pathsFromAbsPts([
    startPoint,
    PathTools.LINE.init(),
    ...linePtsL2R,
    PathTools.ARC.init(7, 0, 1), //full setting. radius:7, bigArc:0, positiveArc:1
    ...posArcsT2B,
    PathTools.ARC.rad(20),//chang radius to 20
    PathTools.ARC.bigArc(),//use big arc.
    ...bigArcR2L,
    PathTools.ARC.rad(5),//change radius to 5
    PathTools.ARC.negativeArc(),//use negative arc
    ...negArcsB2T
  ], 'black', color, 1);
}

function pathSample() {

  return svgUtils.renderer.svgRender(React.createElement, -50, -50, 100, 100, {}, [makeAPath('green')]);
}


function makeAStroke(color) {
  const pathUtil = svgUtils.path;

  const { pathsFromAbsPts, PathTools } = pathUtil;
  const offsetX = -30;
  const offsetY = -30;
  const arrToPt = arr => ({ x: arr[0] + offsetX, y: arr[1] + offsetY });
  const startPoint = arrToPt([0, 0]);
  const linePtsL2R = [[4, 0], [14, 5], [24, -5], [34, 0]].map(arrToPt);
  const posArcsT2B = [[34, 10], [34, 20], [34, 30], [34, 40]].map(arrToPt);
  const bigArcR2L = [[0, 50]].map(arrToPt);

  return pathsFromAbsPts([
    startPoint,
    PathTools.LINE.init(),
    ...linePtsL2R,
    PathTools.ARC.init(7, 0, 1), //full setting. radius:7, bigArc:0, positiveArc:1
    ...posArcsT2B,
    PathTools.ARC.rad(20),//chang radius to 20
    PathTools.ARC.bigArc(),//use big arc.
    ...bigArcR2L,
  ], color, 'none', 5, { strokeDasharray: "15,10,10,15", strokeLinecap: 'round' });
}

function strokeSample() {

  return svgUtils.renderer.svgRender(React.createElement, -50, -50, 100, 100, {}, [makeAStroke('green')]);
}

function maskSample() {

  const circle = (color) => {
    return svgUtils.renderer.createElementInfo('circle', {
      r: 50,
      cx: 0,
      cy: 0,
      style: { fill: color, strokeWidth: 0.1, stroke: 'black' },
      ...svgUtils.mask.useMask('sample-mask')
    });
  }
  const rect = color => { //positive mask(white)
    return svgUtils.renderer.createElementInfo('rect', {
      width: 90, height: 90, x: -45, y: -45,
      style: { fill: color, strokeWidth: 0.1, stroke: 'black' }
    })
  }
  const path = makeAPath('black');//negative mask(black)
  ///, 
  const mask = svgUtils.mask.createMaskElement([rect('white'), path], 'sample-mask');

  const maskGroup = svgUtils.etc.group([circle('blue'), mask], 'mask-group-sample');

  return svgUtils.renderer.svgRender(React.createElement, -50, -50, 100, 100, {}, [maskGroup]);
}

function App() {
  const wrapper = (name, children) => {
    return (
      <div style={{ display: 'inline-block', width: "100px", height: "130px", border: 'solid 1px black' }}>
        <div style={{ height: '30px', fontSize: '8pt', textAlign: 'center', verticalAlign: 'middle', display: 'block', position: 'relative' }}>
          <span style={{ display: 'block', position: 'absolute', top: '25%', width: '100%' }}>
            {name}
          </span>
        </div>
        <div style={{ display: 'inline-block', width: "100px", height: "100px" }}>
          {children}
        </div>
      </div>
    );
  }
  const centerTexts = ["hey", "I am a chart"];
  return (
    <div className="App">
      <div style={{ display: 'flow-root', width: '400px' }}>
        {wrapper('textSample', textSample())}
        {wrapper('maskSample', maskSample())}
        {wrapper('pathSample', pathSample())}
        {wrapper('primitivePathSample', primitivePathSample())}
        {wrapper('strokeSample', strokeSample())}
        {wrapper('chartSample', <HorseShoeChart centerTexts={centerTexts} />)}

      </div>
    </div>
  );
}

export default App;
