import React from 'react'

import css from './style.module.css'
import { ItemInputGroup } from './ItemInputGroup'
import { keysToExclude } from '../../../../consts'

export function RenderDefaultItems(props) {
  const { info, onInfoChange } = props
  return Object.entries(info).map(([key, value]) => {
    if (keysToExclude.includes(key)) {
      return null
    } else {
      return (
        <div key={key}>
          <ItemInputGroup
            className={css.infoItemValue}
            name={key}
            initValue={value}
            onChange={onInfoChange(key)}
          />
        </div>
      )
    }
  })
}

export default RenderDefaultItems
