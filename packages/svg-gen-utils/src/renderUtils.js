export const createElementInfo = (tagName, attributes = {}, children = []) => {
  return {
    tagName,
    attributes,
    children
  };
}

const __render = (renderFunc, obj, idx) => {
  if (typeof obj === 'object') {
    if (typeof obj.children === 'object') {
      if (obj.children.length !== undefined) {
        let childrenElements = obj.children.map((child, idx) => __render(renderFunc, child, idx));
        const attr = {
          key: 'ele-' + idx,
          ...obj.attributes
        }
        if (childrenElements.length === 0) childrenElements = "";
        return renderFunc(obj.tagName, attr, childrenElements);
      } else {
        throw Error("children should be an array of objects or string. yours :" + JSON.stringify(obj.children));
      }

    } else {
      const child = obj.children ? obj.children : "";
      return renderFunc(obj.tagName, obj.attributes, child);
    }
  }
  else return obj || "";
}

export const render = (renderFunc, obj) => {
  if (!obj.tagName || obj.tagName !== 'svg') {
    throw Error("please use renderer.renderSvgInfo() for the obj argument")
  }
  return __render(renderFunc, obj, 0);
}

export const renderSvgInfo = (left, top, viewboxWid, viewboxHig, props, children = []) => {
  return createElementInfo(
    'svg',
    {
      viewBox: `${left} ${top} ${viewboxWid} ${viewboxHig}`,
      xmlns: "http://www.w3.org/2000/svg",
      ...props
    },
    children
  );
}

export const svgRender = (renderFunc, left, top, viewboxWid, viewboxHig, props, children = []) => {
  const svgInfo = renderSvgInfo(left, top, viewboxWid, viewboxHig, props, children);
  return render(renderFunc, svgInfo);
}