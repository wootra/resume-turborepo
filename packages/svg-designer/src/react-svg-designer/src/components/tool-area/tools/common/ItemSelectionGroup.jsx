import React from 'react'
import { useState } from 'react'
import css from './style.module.css'
import mCss from '../../style.module.css'
import { useEffect } from 'react'

export const ItemSelectionGroup = props => {
  const {
    name,
    initValue,
    onChange,
    className,
    inputClassName,
    optionList: optionListOrg,
    children = null,
  } = props
  let { valueList = null } = props
  const optionList = (optionListOrg && [...optionListOrg]) || []
  optionList.unshift('')
  if (valueList === null) {
    valueList = optionList
  } else {
    valueList = [...valueList]
    valueList.unshift('')
  }
  const [value, setValue] = useState(initValue === null ? '' : initValue + '')

  const onItemChange = e => {
    let value = e.target.value
    console.log('selectin value:', value)
    setValue(value + '')
    onChange(value + '')
  }

  useEffect(() => {
    if (initValue === null) setValue('')
    else setValue(initValue + '')
  }, [initValue])

  return (
    <div key={name} className={className}>
      <label className={mCss.itemInfoName}>{name}</label>
      <select className={inputClassName} value={value} onChange={onItemChange}>
        {optionList
          ? optionList.map((item, idx) => {
              return (
                <option key={idx} value={valueList[idx]}>
                  {item}
                </option>
              )
            })
          : null}
        {children}
      </select>
    </div>
  )
}

export default ItemSelectionGroup
