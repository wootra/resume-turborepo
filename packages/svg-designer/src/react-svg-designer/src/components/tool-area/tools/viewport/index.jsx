import React, { useState, useEffect } from 'react'
import { ViewportContext } from '../../../../contexts/globalContexts'
import mCss from '../../style.module.css'
import css from './style.module.css'
import { useDynamicContextConsumer } from '../../../../contexts/dynamic-context-utils'
import InputField from '../../../etc/input-field'
import viewportIcon from '../../../../images/viewport.svg'
import { VIEWBOX_KEY } from '../../../../consts'

export default function Viewport(props) {
  const [viewport, setViewPort] = useDynamicContextConsumer(ViewportContext)
  const onViewportChange = value => {
    const txt = value
    const nums = txt.split(' ').map(txt => Number.parseFloat(txt))
    setViewPort({
      left: nums[0],
      top: nums[1],
      width: nums[2],
      height: nums[3],
    })
  }

  const [viewboxStart, setViewboxStart] = useState(Date.now())

  useEffect(() => {
    let savedViewbox = sessionStorage.getItem(VIEWBOX_KEY)
    if (!savedViewbox) {
      savedViewbox = { viewport, viewboxStart: viewboxStart }
      sessionStorage.setItem(VIEWBOX_KEY, JSON.stringify(savedViewbox))
    } else {
      savedViewbox = JSON.parse(savedViewbox)
      if (viewboxStart !== savedViewbox.viewboxStart) {
        setViewPort(savedViewbox.viewport)
      }
    }
  }, [])

  useEffect(() => {
    if (viewport) {
      const historyToSave = { viewport, viewboxStart }
      sessionStorage.setItem(VIEWBOX_KEY, JSON.stringify(historyToSave))
    }
  }, [viewport, viewboxStart])

  const verify = txt => {
    const nums = txt.split(' ').map(txt => Number.parseFloat(txt))
    if (nums && nums.length === 4 && nums.find(i => isNaN(i)) === undefined)
      return null
    else return 'value should be x y width height (ex> 0 0 100 100)'
  }
  const value = `${viewport.left} ${viewport.top} ${viewport.width} ${viewport.height}`
  return (
    <div>
      <img
        src={viewportIcon}
        className={css.icon}
        alt="icon for viewport"
        title="viewport"
      />
      <label className={mCss.itemInfoName}></label>
      <InputField onChange={onViewportChange} verify={verify} value={value} />
    </div>
  )
}
