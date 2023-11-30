import React from 'react'
import { useDynamicContextConsumer } from '../../../../contexts/dynamic-context-utils'
import {
  HistoryContext,
  ModifyingItemContext,
} from '../../../../contexts/globalContexts'
import css from './style.module.css'
import { ItemInputGroup } from './ItemInputGroup'
import { getClonedHistoryWithNewInfo } from './common'
import { ItemTextAreaGroup } from './ItemTextAreaGroup'
import { useHelpManager } from '../../../../utils/toolbar-help-manager'

const getNewStyleInfo = (currInfo, key, value) => {
  return {
    ...currInfo,
    style: {
      ...currInfo.style,
      [key]: value,
    },
  }
}

export function StyleElements(props) {
  const { info, idx } = props
  const [historyQueue, setHistoryQueue] = useDynamicContextConsumer(
    HistoryContext,
  )
  const [modifyingItem, setModifyingItem] = useDynamicContextConsumer(
    ModifyingItemContext,
  )

  const onStyleChange = key => value => {
    const newInfo = getNewStyleInfo(modifyingItem.item.info, key, value)

    let clonedHistory = getClonedHistoryWithNewInfo(historyQueue[idx], newInfo)
    const newQ = historyQueue.map((item, idx) =>
      idx === modifyingItem.idx ? clonedHistory : item,
    )
    setHistoryQueue(newQ)
    setModifyingItem(state => ({
      ...state,
      info: newInfo,
      item: {
        ...state.item,
        info: newInfo,
        element: {
          ...state.item.element,
          attributes: {
            ...state.item.element.attributes,
            style: {
              ...state.item.element.attributes.style,
              [key]: value,
            },
          },
        },
      },
    }))
  }

  const propsMap = useHelpManager({
    'more style': [
      'add more style with this syntax:',
      'name:value or name:"value"',
      'if the value is "", the attribute is going to be removed.',
    ],
  })
  const helpProps = propsMap.get('more style')

  let styles = Object.entries(info).filter(([key, value]) => key === 'style')

  if (styles.length > 0) {
    styles = styles[0][1]
  } else {
    styles = null
  }
  const onMoreStyleChange = currStyles => value => {
    let newStyle = {
      ...currStyles,
      ...value,
    }
    newStyle = Object.entries(newStyle).reduce((prev, [key, val]) => {
      console.log('in:', { key, val })
      return val.length === 0 ? prev : { ...prev, [key]: val }
    }, {})
    const newInfo = {
      ...modifyingItem.item.info,
      style: newStyle,
    }

    let clonedHistory = getClonedHistoryWithNewInfo(historyQueue[idx], newInfo)

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

  return styles ? (
    <>
      <div key="styles">
        <div className={css.stylesTitle}>Styles</div>
        <div className={css.stylesWrapper}>
          {Object.entries(styles).map(([styleKey, styleValue]) => {
            return (
              <ItemInputGroup
                className={css.styleItemValue}
                key={styleKey}
                name={styleKey}
                initValue={styleValue}
                onChange={onStyleChange(styleKey)}
              />
            )
          })}
        </div>
      </div>
      <div key="more" className={css.stylesWrapper}>
        <ItemTextAreaGroup
          name="more"
          initValue=""
          onChange={onMoreStyleChange(styles)}
          {...helpProps}
        />
      </div>
    </>
  ) : null
}

export default StyleElements
