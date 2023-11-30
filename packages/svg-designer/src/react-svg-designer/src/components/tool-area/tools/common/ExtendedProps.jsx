import React, { useState } from 'react'

import css from './style.module.css'
import { ItemCheckboxGroup } from './ItemCheckboxGroup'
import { ItemInputGroup } from './ItemInputGroup'
import {
  MASK_ID,
  CONVERT_TO_MASK,
  DEFAULT_MASK_ID,
  USE_MASK,
} from '../../../../consts'
import { useEffect } from 'react'
import { useDynamicContextConsumerState } from '../../../../contexts/dynamic-context-utils'
import { DesignAreaContext } from '../../../../contexts/globalContexts'
import ItemSelectionGroup from './ItemSelectionGroup'

const maskIcon = (width, height) => {
  width = width || 15
  height = height || 15
  width += 'px'
  height += 'px'
  return (
    <svg
      key="mask"
      {...{ width, height }}
      viewBox="-50 -50 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx={0}
        cy={0}
        rx={40}
        ry={40}
        style={{ fill: 'black', stroke: 'black', strokeWidth: 10 }}
      ></ellipse>
      <ellipse
        cx={0}
        cy={0}
        rx={35}
        ry={35}
        style={{ fill: 'white', stroke: 'black', strokeWidth: 0.1 }}
        mask="url(#expande-props-mask-icon-mask)"
      >
        <title>a Mask</title>
      </ellipse>
      <mask id="expande-props-mask-icon-mask">
        <path
          d="M 50.000,-50.000 L-50.000,50.000 L50.000,50.000 Z"
          fill="white"
          stroke="black"
          strokeWidth={0.1}
        ></path>
      </mask>
    </svg>
  )
}

const maskedLayerIcon = (width, height) => {
  width = width || 15
  height = height || 15
  width += 'px'
  height += 'px'
  return (
    <svg
      key="maskedLayer-icon"
      {...{ width, height }}
      viewBox="-50 -50 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx={0}
        cy={0}
        rx={40}
        ry={40}
        style={{ fill: 'black', stroke: 'black', strokeWidth: 0 }}
        mask="url(#expande-props-masked-layer-icon-mask)"
      >
        <title>Masked Layer</title>
      </ellipse>
      <mask id="expande-props-masked-layer-icon-mask">
        <ellipse
          cx={0}
          cy={0}
          rx={40}
          ry={40}
          style={{ fill: 'white', stroke: 'black', strokeWidth: 0.1 }}
        ></ellipse>
        <ellipse
          cx={40}
          cy={0}
          rx={40}
          ry={40}
          style={{ fill: 'black', stroke: 'black', strokeWidth: 0.1 }}
        ></ellipse>
      </mask>
    </svg>
  )
}

export function ExtendedProps(props) {
  const { info, onInfoChange } = props
  const designAreaVals = useDynamicContextConsumerState(DesignAreaContext)
  const [maskInfo, setMaskInfo] = useState({
    enabled: info[CONVERT_TO_MASK] === 'true',
    maskId: info[MASK_ID],
    useMask: info[USE_MASK],
  })

  useEffect(() => {
    /*update*/
  }, [info])

  const convertMaskChanged = value => {
    console.log('checked:', { value, type: typeof value, info })
    onInfoChange(CONVERT_TO_MASK)({
      [CONVERT_TO_MASK]: value,
      [MASK_ID]: info[MASK_ID] || DEFAULT_MASK_ID,
    })
    setMaskInfo(state => ({
      ...state,
      enabled: value === 'true',
      maskId: info[MASK_ID] || DEFAULT_MASK_ID,
    }))
  }
  const [arrowPathClass, setArrowPathClass] = useState(css.arrowPathRight)
  const onArrowClick = e => {
    if (arrowPathClass === css.arrowPathRight)
      setArrowPathClass(css.arrowPathDown)
    else setArrowPathClass(css.arrowPathRight)
  }
  const maskTool = maskInfo.enabled ? (
    <ItemInputGroup
      className={css.maskId}
      name={MASK_ID}
      initValue={maskInfo.maskId}
      onChange={onInfoChange(MASK_ID)}
    />
  ) : (
    <ItemSelectionGroup
      className={css.useMask}
      name={USE_MASK}
      initValue={maskInfo.useMask}
      onChange={onInfoChange(USE_MASK)}
      optionList={designAreaVals.maskList}
    />
  )
  const extendedTools = []
  if (maskInfo.enabled) {
    extendedTools.push(maskIcon())
  }
  if (maskInfo.useMask && maskInfo.useMask.length > 0) {
    extendedTools.push(maskedLayerIcon())
  }
  return (
    <div className={css.extendedPropsHolder}>
      <div className={css.arrowOnLeftTop} onClick={onArrowClick}>
        <svg viewBox="-50 -50 100 100" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M -30.000,-40.000 L-30.000,-20.000 L0.000,0.000 L-30.000,20.000 L-30.000,40.000 L30.000,0.000 Z"
            fill="black"
            stroke="black"
            className={arrowPathClass}
          ></path>
        </svg>
      </div>
      <div className={css.usingTools}>
        {arrowPathClass === css.arrowPathRight ? extendedTools : null}
      </div>
      {arrowPathClass === css.arrowPathRight ? null : (
        <ItemCheckboxGroup
          className={css.maskCheck}
          name={CONVERT_TO_MASK}
          initValue={info[CONVERT_TO_MASK] || 'false'}
          onChange={convertMaskChanged}
        />
      )}
      {arrowPathClass === css.arrowPathRight ? null : maskTool}
    </div>
  )
}
