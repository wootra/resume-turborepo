import svgUtils from './svg-gen-utils'
import {
  CONVERT_TO_MASK,
  MASK_ID,
  USE_MASK,
  keysToExcludeFromAttr,
} from '../consts'

export function exclude(obj, key) {
  const newObj = {}
  for (let nowKey in obj) {
    if (nowKey !== key) newObj[nowKey] = obj[nowKey]
  }
  return newObj
}
export function include(obj, key, value) {
  return {
    ...obj,
    [key]: value,
  }
}

export function excludeArr(obj, keyArr) {
  obj = Object.assign({}, obj)
  keyArr.forEach(key => {
    obj = exclude(obj, key)
  })
  return obj
}

function getRandomString(length) {
  var randomChars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var result = ''
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
  }
  return result
}

export function historyToElements(history, setDesignAreaVals = null) {
  const masks = new Map()
  const uniqId = getRandomString(10)
  const elements = history.reduce((prev, item) => {
    if (item.info[CONVERT_TO_MASK] === 'true') {
      const maskId = item.info[MASK_ID]
      let maskArr

      if (masks.has(maskId)) maskArr = masks.get(maskId)
      else {
        maskArr = []
        masks.set(maskId, maskArr)
      }
      let attr = excludeArr(item.element.attributes, keysToExcludeFromAttr)

      const element = {
        ...item.element,
        attributes: attr,
      }
      maskArr.push(element)
      return prev
    } else if (item.info[USE_MASK] && item.info[USE_MASK].length > 0) {
      const maskId = item.info[USE_MASK]
      let attr = excludeArr(item.element.attributes, keysToExcludeFromAttr)

      const element = {
        ...item.element,
        attributes: {
          ...attr,
          mask: `url(#${maskId + '_' + uniqId})`,
        },
      }
      return [...prev, element]
    } else {
      let attr = excludeArr(item.element.attributes, keysToExcludeFromAttr)
      const element = {
        ...item.element,
        attributes: attr,
      }
      return [...prev, element]
    }
  }, [])
  const maskNames = []
  for (let maskId of masks.keys()) {
    maskNames.push(maskId)
    elements.push(
      svgUtils.renderer.createElementInfo(
        'mask',
        { id: maskId + '_' + uniqId },
        masks.get(maskId),
      ),
    )
  }
  setDesignAreaVals &&
    setDesignAreaVals(state => ({ ...state, maskList: maskNames }))
  return elements
}

export function workingElements(modifyingItem) {
  if (modifyingItem.idx >= 0) {
    let el1 = Object.assign({}, modifyingItem.item.element)
    let el2 = Object.assign({}, modifyingItem.item.element)
    let style1 = el1.attributes.style || {}
    let style2 = el1.attributes.style || {}
    let attr1 = excludeArr(el1.attributes, keysToExcludeFromAttr)
    let attr2 = excludeArr(el2.attributes, keysToExcludeFromAttr)

    el1 = {
      ...el1,
      attributes: {
        ...attr1,
        style: {
          ...style1,
          stroke: 'rgba(255,0,0,0.5)',
          strokeWidth: 2,
          strokeDasharray: [2, 2],
        },
      },
    }
    el2 = {
      ...el2,
      attributes: {
        ...attr2,
        style: {
          ...style2,
          stroke: 'rgba(255,255,255,0.5)',
          strokeWidth: 2,
          strokeDasharray: [2, 4],
        },
      },
    }
    return [el1, el2]
  } else return []
}
