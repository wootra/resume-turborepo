import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { HISTORY_KEY } from '../../../../consts'
import { useDynamicContextConsumer } from '../../../../contexts/dynamic-context-utils'
import {
  HistoryContext,
  ModifyingItemContext,
  PressedKeyContext,
} from '../../../../contexts/globalContexts'
import arrowDown from '../../../../images/arrow-down.svg'
import arrowUp from '../../../../images/arrow-up.svg'
import whiteX from '../../../../images/white-x.svg'
import { RenderElementInfo } from '../common/RenderElementInfo'
import css from './style.module.css'
import _ from 'lodash'

const propertyStringParser = element => {
  switch (element.tagName.toLowerCase()) {
    case 'circle':
      return `r: ${element.attributes.r.toFixed(2)}`
    case 'ellipse':
      return `rx,ry: ${element.attributes.rx.toFixed(
        2,
      )}, ${element.attributes.ry.toFixed(2)}`
    case 'rect':
      return `w,h: ${element.attributes.width.toFixed(
        2,
      )}, ${element.attributes.height.toFixed(2)}`
    default:
      return '?'
  }
}

const ItemRenderer = props => {
  const {
    item,
    opened,
    idx,
    selected,
    onDeleteBtnClicked,
    onExpandClicked,
    onDownClicked,
    onUpClicked,
    onTitleClicked,
  } = props
  const element = item.element
  const wrapperClass = opened
    ? css.historyItemWrapperSelected
    : css.historyItemWrapper
  const titleClass = opened
    ? css.historyItemTitleRowSelected
    : css.historyItemTitleRow
  const selUnsel = selected ? css.selectedTitle : css.unSelectedTitle
  return (
    <div key={'key-' + idx} className={wrapperClass}>
      <div className={[titleClass, selUnsel].join(' ')}>
        <div
          className={opened ? css.expandBtnSelected : css.expandBtn}
          onClick={onExpandClicked}
        >
          {opened ? '-' : '+'}
        </div>
        <div className={css.historyItemName} onClick={onTitleClicked}>
          {element.tagName}({propertyStringParser(element)})
        </div>
        <div className={css.onRight}>
          <img
            className={css.upImg}
            onClick={onUpClicked}
            src={arrowUp}
            alt="up"
            title="move 1 step up"
          />
          <img
            className={css.downImg}
            onClick={onDownClicked}
            src={arrowDown}
            alt="down"
            title="move 1 step down"
          />
          <img
            className={css.deleteHistory}
            onClick={onDeleteBtnClicked}
            src={whiteX}
            alt="close"
            title="delete this history"
          />
        </div>
      </div>
      {opened ? <RenderElementInfo /> : null}
    </div>
  )
}

export default function History(props) {
  const [modifyingItem, setModifyingItem] = useDynamicContextConsumer(
    ModifyingItemContext,
  )
  const [historyQueue, setHistoryQueue] = useDynamicContextConsumer(
    HistoryContext,
  )

  const [historyStart, setHistoryStart] = useState(Date.now())
  const [selectedHistory, setSelectedHistory] = useState({
    start: -1,
    selected: [],
  })
  const [tempClipboard, setTempClipboard] = useState('')
  const [keyPressed, setKeyPressed] = useDynamicContextConsumer(
    PressedKeyContext,
  )
  const [items, setItems] = useState(<div>no data</div>)

  useEffect(() => {
    let savedHistory = sessionStorage.getItem(HISTORY_KEY)
    if (!savedHistory) {
      savedHistory = { queue: [], historyStart }
      sessionStorage.setItem(HISTORY_KEY, JSON.stringify(savedHistory))
    } else {
      savedHistory = JSON.parse(savedHistory)
      if (historyStart !== savedHistory.historyStart) {
        setHistoryQueue(savedHistory.queue)
      }
    }
  }, [historyStart, setHistoryQueue])

  useEffect(() => {
    if (historyQueue) {
      const historyToSave = { queue: historyQueue, historyStart }
      sessionStorage.setItem(HISTORY_KEY, JSON.stringify(historyToSave))
    }
  }, [historyQueue, historyStart])

  const onDeleteBtnClicked = useCallback(
    idx => {
      const a = historyQueue.filter((item, i) => i !== idx)
      if (idx === modifyingItem.idx) {
        setModifyingItem({ idx: -1, item: null })
      }
      setHistoryQueue(a)
    },
    [historyQueue, modifyingItem.idx, setHistoryQueue, setModifyingItem], // [modifyingItem, historyQueue, setHistoryQueue, setModifyingItem],
  )

  const onExpandClicked = useCallback(
    idx => {
      if (idx >= 0 && modifyingItem.idx === idx) {
        setModifyingItem({ idx: -1, item: null })
      } else {
        const clonedItem = Object.assign({}, historyQueue[idx])
        setModifyingItem({ idx, item: clonedItem })
      }
    },
    [historyQueue, modifyingItem.idx, setModifyingItem], // [modifyingItem, historyQueue, setModifyingItem],
  )

  const unFocusAll = useMemo(() => {
    return () => {
      const tmp = document.createElement('input')
      document.body.appendChild(tmp)
      tmp.focus()
      document.body.removeChild(tmp)
    }
  }, [])

  const onTitleClicked = useCallback(
    idx => {
      if (keyPressed.ctrl) {
        setSelectedHistory(state => {
          const newSelected = state.selected.filter(i => i !== idx)
          if (newSelected.length === state.selected.length)
            newSelected.push(idx)
          newSelected.sort((a, b) => b - a)
          return { ...state, start: idx, selected: newSelected }
        })
      } else if (keyPressed.shift) {
        if (selectedHistory.start < 0) {
          setSelectedHistory(state => ({ ...state, start: idx }))
        } else {
          if (keyPressed.ctrl) {
            //add on top of current selection
            setSelectedHistory(state => {
              const newSelected = state.selected.filter(
                i => i < state.start && i > idx,
              )
              if (state.start < idx) {
                newSelected.push(..._.range(state.start, idx + 1))
              } else {
                newSelected.push(..._.range(idx, state.start + 1))
              }
              newSelected.sort((a, b) => b - a)
              return { ...state, start: idx, selected: newSelected }
            })
          } else {
            setSelectedHistory(state => {
              const newSelected = []
              if (state.start < idx) {
                newSelected.push(..._.range(state.start, idx + 1))
              } else {
                newSelected.push(..._.range(idx, state.start + 1))
              }
              newSelected.sort((a, b) => b - a)
              return { ...state, start: idx, selected: newSelected }
            })
          }
          unFocusAll()
        }
      } else {
        setSelectedHistory(state => ({ ...state, start: idx, selected: [idx] }))
      }
    },
    [keyPressed, tempClipboard, setSelectedHistory],
  )

  const onDownClicked = useCallback(
    idx => {
      if (idx < historyQueue.length - 1) {
        const newHistory = [...historyQueue]
        const item = newHistory[idx]
        const itemToConvert = newHistory[idx + 1]

        newHistory[idx] = itemToConvert
        newHistory[idx + 1] = item
        setHistoryQueue(newHistory)
        if (idx >= 0 && modifyingItem.idx === idx) {
          setModifyingItem({ idx: idx + 1, item: item })
        }
        if (idx >= 0 && modifyingItem.idx === idx + 1) {
          setModifyingItem({ idx: idx, item: itemToConvert })
        }
      }
    },
    [historyQueue, modifyingItem.idx, setHistoryQueue, setModifyingItem], // [modifyingItem, historyQueue, setHistoryQueue, setModifyingItem],
  )

  const onUpClicked = useCallback(
    idx => {
      if (idx > 0) {
        const newHistory = [...historyQueue]
        const item = newHistory[idx]
        const itemToConvert = newHistory[idx - 1]

        newHistory[idx] = itemToConvert
        newHistory[idx - 1] = item
        setHistoryQueue(newHistory)
        if (idx >= 0 && modifyingItem.idx === idx) {
          setModifyingItem({ idx: idx - 1, item: item })
        }
        if (idx >= 0 && modifyingItem.idx === idx - 1) {
          setModifyingItem({ idx: idx, item: itemToConvert })
        }
      }
    },
    [historyQueue, modifyingItem.idx, setHistoryQueue, setModifyingItem], // [modifyingItem, historyQueue, setHistoryQueue, setModifyingItem],
  )

  useEffect(() => {
    setItems(
      historyQueue.map((item, idx) => {
        let props
        const events = {
          onDeleteBtnClicked: () => onDeleteBtnClicked(idx),
          onExpandClicked: () => onExpandClicked(idx),
          onUpClicked: () => onUpClicked(idx),
          onDownClicked: () => onDownClicked(idx),
          onTitleClicked: () => onTitleClicked(idx),
        }
        if (idx === modifyingItem.idx) {
          props = { opened: true, item: modifyingItem.item, idx, ...events }
        } else {
          props = { opened: false, item, idx, ...events }
        }
        props = { ...props, selected: selectedHistory.selected.includes(idx) }
        return <ItemRenderer key={'item-' + idx} {...props} />
      }),
    )
  }, [
    historyQueue,
    modifyingItem.idx,
    modifyingItem,
    selectedHistory,
    onDeleteBtnClicked,
    onExpandClicked,
    onUpClicked,
    onDownClicked,
    onTitleClicked,
  ])

  useEffect(() => {
    if (modifyingItem.idx >= 0) {
      const idx = historyQueue.length - 1
      const clonedItem = Object.assign({}, historyQueue[idx])
      setModifyingItem({ idx, item: clonedItem })
    }
  }, [historyQueue, historyQueue.length, modifyingItem.idx, setModifyingItem])

  return (
    <div className={css.historyWrapper}>
      <textarea
        key="tempClipboard"
        value={tempClipboard}
        className={css.tempClipboard}
      />
      {items}
    </div>
  )
}
