const dist = (pt1, pt2) =>
  Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));

const createArcElement = (keyPressed, pt1, pt2, pt3) => {
  const midPt = { x: (pt1.x + pt2.x) / 2, y: (pt1.y + pt2.y) / 2 };

  const baseLen = dist(pt1, pt2);
  const addSize =
    dist(midPt, pt3) < 3.0 ? 0 : (dist(midPt, pt3) - 3.0) * (baseLen / 4.0);
  const arcRad = baseLen / 2.0 + addSize;

  const isPositiveArc = () => {
    const a = (pt2.y - pt1.y) / (pt2.x - pt1.x);
    const b = pt1.y - pt1.x * a;
    const y1 = a * pt3.x + b;
    const xDirection = pt2.x - pt1.x;

    if (y1 >= pt3.y) {
      return xDirection > 0 ? 1 : 0;
    } else {
      return xDirection > 0 ? 0 : 1;
    }
  };
  return {
    to: pt2,
    arcRad,
    bigArc: keyPressed.shift ? 1 : 0,
    isPositiveArc: isPositiveArc(),
  };
};

export function createPathElement(pathBuffer, keyPressed, pt1, pt2, pt) {
  let element;
  let info;
  if (keyPressed.char === 'a') {
    const arc = createArcElement(keyPressed, pt1, pt2, pt);
    element = pathBuffer.element.arc(
      arc.to,
      arc.arcRad,
      arc.bigArc,
      arc.isPositiveArc,
      true
    );
    info = arc;
  } else if (keyPressed.char === 'c') {
    //c
    //curve
    element = pathBuffer.element.cCurve(pt2, pt, pt);
    info = {
      to: pt2,
      middle1: pt,
      middle2: pt,
    };
  } else if (keyPressed.char === 's') {
    //s
    //curve
    element = pathBuffer.element.sCurve(pt2, pt);
    info = {
      to: pt2,
      middle: pt,
    };
  } else {
    //q
    //curve
    element = pathBuffer.element.qCurve(pt2, pt, pt);
    info = {
      to: pt2,
      middle: pt,
    };
  }
  return { element, info };
}
