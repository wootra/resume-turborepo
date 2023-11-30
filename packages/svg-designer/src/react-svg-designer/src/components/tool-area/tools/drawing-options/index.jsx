import React from 'react'
import { useDynamicContextConsumer } from '../../../../contexts/dynamic-context-utils'
import { ModeContext } from '../../../../contexts/globalContexts'
import css from './style.module.css'
import { DrawingModes, DRAW_OPTIONS_KEY } from '../../../../consts'
import { RenderElementInfo } from '../common/RenderElementInfo'
import { ItemInputGroup } from '../common/ItemInputGroup'

const defaultStyles = {
  [DrawingModes.NONE[0]]: {},
  [DrawingModes.CIRCLE[0]]: {
    fill: 'transparent',
    stroke: 'black',
    strokeWidth: null,
  },
  [DrawingModes.RECT[0]]: {
    fill: 'transparent',
    stroke: 'black',
    strokeWidth: null,
  },
  [DrawingModes.PATH[0]]: {
    fill: 'transparent',
    stroke: 'black',
    strokeWidth: null,
  },
  [DrawingModes.TEXT[0]]: {
    fill: 'black',
    fontSize: 10,
  },
}
export default function DrawingOptions(props) {
  const [modes, setModes] = useDynamicContextConsumer(ModeContext)
  const { drawingMode } = modes
  const savedStyles = sessionStorage.getItem(DRAW_OPTIONS_KEY)
  let currStyles = {}
  if (savedStyles) {
    currStyles = JSON.parse(savedStyles)
  } else {
    currStyles = defaultStyles
    sessionStorage.setItem(DRAW_OPTIONS_KEY, JSON.stringify(currStyles))
  }
  let currStyle = currStyles[drawingMode[0]] || {}

  const onStyleChange = key => value => {
    if (value === null) {
      const { key, ...rest } = currStyle
      currStyle = rest
    } else {
      currStyle = {
        ...currStyle,
        [key]: value,
      }
    }

    let newStyles = {
      ...currStyles,
      [drawingMode[0]]: currStyle,
    }
    sessionStorage.setItem(
      'svg-designer-saved-options',
      JSON.stringify(newStyles),
    )
  }
  const arrFromObj = Object.entries(currStyle)
  return (
    <>
      <div className={css.title}>
        Drawing Option ({arrFromObj.length > 0 ? drawingMode[0] : null}) Tool
      </div>
      <div></div>
      {arrFromObj.map(([styleKey, styleValue]) => (
        <ItemInputGroup
          className={css.styleItemValue}
          key={styleKey}
          name={styleKey}
          initValue={styleValue}
          onChange={onStyleChange(styleKey)}
        />
      ))}
    </>
  )
}
