import React from 'react'
import { useDynamicContextConsumer } from '../../../../contexts/dynamic-context-utils'
import {
  HistoryContext,
  ModifyingItemContext,
} from '../../../../contexts/globalContexts'
import css from './style.module.css'
import { DrawingModes, keysToExclude } from '../../../../consts'
import StyleElements from './StyleElements'
import { getClonedHistoryWithNewInfo } from './common'
import { RenderPathItems } from './RenderPathItems'
import { RenderDefaultItems } from './RenderDefaultItems'
import { ExtendedProps } from './ExtendedProps'
import { exclude, include } from '../../../../utils/element-handlers'

export function RenderElementInfo() {
  const [historyQueue, setHistoryQueue] = useDynamicContextConsumer(
    HistoryContext,
  )
  const [modifyingItem, setModifyingItem] = useDynamicContextConsumer(
    ModifyingItemContext,
  )

  const { idx, item } = modifyingItem

  const onInfoChange = key => value => {
    let newInfo = Object.assign({}, modifyingItem.item.info)
    let newInfoToSave = Object.assign({}, modifyingItem.item.info)
    if (typeof value === 'object') {
      Object.entries(value).forEach(([key1, val1]) => {
        newInfo = keysToExclude.includes(key1)
          ? exclude(newInfo, key1)
          : include(newInfo, key1, val1)
        newInfoToSave = include(newInfoToSave, key1, val1)
      })
    } else {
      newInfo = keysToExclude.includes(key)
        ? exclude(newInfo, key)
        : include(newInfo, key, value)
      newInfoToSave = include(newInfoToSave, key, value)
    }

    const children = key === 'text' ? value : null

    let clonedHistory = getClonedHistoryWithNewInfo(
      historyQueue[idx],
      newInfo,
      newInfoToSave,
      children,
    )
    const newQ = historyQueue.map((item, idx) =>
      idx === modifyingItem.idx ? clonedHistory : item,
    )
    setHistoryQueue(newQ)
    setModifyingItem(state => ({
      ...state,
      info: newInfo,
      item: { ...state.item, info: newInfo },
    }))
  }
  if (!item) return null
  const { drawingMode, info, element } = item
  let elInfos
  const itemProps = {
    info,
    element,
    onInfoChange,
    idx,
  }
  switch (drawingMode[0]) {
    case DrawingModes.PATH[0]:
      elInfos = <RenderPathItems {...itemProps} />
      break
    default:
      elInfos = <RenderDefaultItems {...itemProps} />
      break
  }
  return (
    <div className={css.elementInfo}>
      <ExtendedProps {...itemProps} />
      {elInfos}
      <StyleElements {...itemProps} />
    </div>
  )
}

export default RenderElementInfo
