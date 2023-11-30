import React from 'react'
import { useState } from 'react'
import css from './style.module.css'
import mCss from '../../style.module.css'
import { useEffect } from 'react'

export const ItemCheckboxGroup = props => {
  const { name, initValue, onChange, className, inputClassName } = props
  const [value, setValue] = useState(
    initValue === null ? 'false' : initValue + '',
  )

  const onItemChange = e => {
    let value = e.target.checked
    setValue(value + '')
    onChange(value + '')
  }

  useEffect(() => {
    if (initValue === null) setValue('false')
    else setValue(initValue + '')
  }, [initValue])

  return (
    <div key={name} className={className}>
      <label className={mCss.itemInfoName}>{name}</label>
      <input
        type="checkbox"
        className={inputClassName}
        checked={value === 'true'}
        onChange={onItemChange}
      />
    </div>
  )
}

export default ItemCheckboxGroup
