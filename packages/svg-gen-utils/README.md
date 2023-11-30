# SVG-gen-utils

## Overview 
This utilility helps to create an SVG image.

---

DEMO
![demo - I know they are not very pretty, but I believe you will make awesome result using this library](https://gitlab.com/shjeon0730/svg-gen-utils/-/raw/master/demo.png)

## supported functionalities
- path
- text(centered text)
- mask
- render

---

### path
  - arc
  - line

example code:
```js
import svgUtils from '@shjeon0730/svg-gen-utils';
...
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
```

---

## pathsWithAbsPts
this api is for lazy users. With this api, you can continue your previous action just with next point.
even though you want to change one of the feature of your previous action, you don't have to define everything once more. 
```js

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

```
Since it is saving the previous option, you don't have to setup arc option all again like above example. 
But you can setup the tool setting all again by using init function if you want to.

---

## mask
```js

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

```
making mask is not hard even if you make mask element using the primitive functionality. But I added this for a convenience.

---

## text
  - center text
  - center link
  - multiple lines
  - color/fontSize settings
  - additional properties

example code:
```js
import svgUtil from '@shjeon0730/svg-gen-utils';
...
const txtUtil = svgUtil.text;

const centerTexts = {
    defaultOptions: svgUtil.text.createDefaultOption(5,1 ,'red'),
    items:["hey", "I am a", "chart"]
}
const txt1 = txtUtil.drawCenterText(centerTexts.items, {x: offsetX, y: offsetY}, centerTexts.defaultOptions)

const linkTexts = [
    createLinkObj("go to google", 9, null, 'blue', 'http://www.google.com', 
        {
            style:{textDecoration:'none'},
            target: "_blank"
        }),
    createTextObj('normalText', 7, 1, 'red')
];
const txt2 = txtUtil.drawCenterText(centerTexts, {x: offsetX, y: offsetY});

const defaultTexts = ['text1','text2'];

```
---
## renderer

This library doesn't render HTML element directly since I did not use any specific framework (ex> React, Vue.js, or Angular). So once you have results from path or text utils, you need to render using your own render function that your framework supports.

But I made renderer utils for you to render easily.
```js
// if your framework is React
import svgUtil from '@shjeon0730/svg-gen-utils';
...
const renderer = svgUtil.renderer;
const svgInfo = renderer.renderSvgInfo(left, top, viewBoxWidth, viewBoxHeight, {
        id, 
        'aria-labelledby':[titleId, descId].join(' ')
    }, [ 
        renderer.createElementInfo('title',{id:titleId},'svg shoechart'),
        renderer.createElementInfo('desc',{id:descId}, 'svg shoehorse'),
        renderer.createElementInfo('g', {}, [elementInfo1, elementInfo2]),
        createElementInfo('g', {}, [textInfo1, textInfo2])
    ]);
renderer.render(React.createElement, svgInfo);
```

Make sure your render function has 3 arguments like this:
```js
function myRenderFunction(tagName, attributes, children=[]){
    return React.CreateElement(tagName, attributes, children);
}
```

If your framework looks different, you need to create one like above and pass the function reference to render function.

```js
renderer.render(myRenderFunction, svgInfo);
```