import React from 'react'
import css from './style.module.css'
import { keysToExclude } from '../../../../consts'
import { ItemInputGroup } from './ItemInputGroup'
import pathParser from 'svg-path-parser'
import PathLogger from '../path-logger'

export function RenderPathItems(props) {
  const { info, element, onInfoChange } = props
  const infoArr =
    Object.entries(info).map(([key, value]) => {
      if (keysToExclude.includes(key)) {
        return null
      } else {
        return (
          <ItemInputGroup
            className={css.pathItemValue}
            name={key}
            key={key}
            initValue={value}
            onChange={onInfoChange(key)}
          />
        )
      }
    }) || []
  const parsed = pathParser(element.attributes.d)
  const setPathElements = elements => {
    console.log('set path elements: ', { elements })
  }
  return (
    <>
      {infoArr}
      <PathLogger
        key={'path-logger'}
        pathElements={parsed}
        setPathElements={setPathElements}
      />
    </>
  )
}
