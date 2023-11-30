import React from 'react'
import { useState } from 'react'
import css from './style.module.css'
import mCss from '../../style.module.css'
import { useEffect } from 'react'

export const ItemInputGroup = props => {
  const { name, initValue, enabled = true, className, onChange } = props
  const [value, setValue] = useState(initValue === null ? '' : initValue)
  const isNumber = typeof initValue === 'number'

  const onItemChange = e => {
    let value = e.target.value
    setValue(value)
    if (isNumber) value = Number.parseFloat(value)
    onChange(value)
  }

  useEffect(() => {
    if (initValue === null) setValue('')
    else setValue(initValue)
  }, [initValue])

  const valueToShow = typeof value === 'number' ? value.toFixed(3) : value
  return (
    <div key={name}>
      <label className={mCss.itemInfoName}>{name}</label>
      <input
        type="text"
        className={className}
        value={valueToShow}
        onChange={onItemChange}
        disabled={!enabled}
      />
    </div>
  )
}
