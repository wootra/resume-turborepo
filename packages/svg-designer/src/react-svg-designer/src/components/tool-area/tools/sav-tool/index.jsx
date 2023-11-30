import React from 'react'
import { useDynamicContextConsumerState } from '../../../../contexts/dynamic-context-utils'
import {
  HistoryContext,
  ViewportContext,
} from '../../../../contexts/globalContexts'
import css from './style.module.css'
import mCss from '../../style.module.css'
import svgUtils from '../../../../utils/svg-gen-utils'
import { renderToString } from 'react-dom/server'
import { historyToElements } from '../../../../utils/element-handlers'

function styleGen(attributes) {
  return Object.entries(attributes)
    .map(curr => {
      const [key, value] = curr
      if (value === null || value === undefined || value === '') return ''
      else if (typeof value === 'string') return `${key}:"${value}"`
      return `${key}:${value}`
    })
    .join(',')
}

function attrGen(attributes) {
  return Object.entries(attributes)
    .map(curr => {
      const [key, value] = curr
      let val
      if (value === null || value === undefined || value === '') return ''
      if (typeof value === 'object') val = `{{${styleGen(value)}}}`
      else if (typeof value === 'string') val = `"${value}"`
      else val = `{${value}}`
      if (key === 'key') return ''
      else if (key === 'text') return ''
      return `${key}=${val}`
    })
    .join(' ')
}

function renderer(name, attributes, children) {
  if (!name) return ''
  const attrs = attrGen(attributes)
  if (typeof children === 'object' && children.length) {
    children = children.join('\n')
  }
  return `<${name} ${attrs}>${children}</${name}>`
}

export default function SavTool(props) {
  const history = useDynamicContextConsumerState(HistoryContext)
  const viewport = useDynamicContextConsumerState(ViewportContext)
  const onSavClicked = mode => () => {
    const elements = historyToElements(history)
    let svg = svgUtils.renderer.svgRender(
      mode === 'react' ? renderer : React.createElement,
      viewport.left,
      viewport.top,
      viewport.width,
      viewport.height,
      {},
      elements,
    )
    if (mode === 'svg') {
      svg = renderToString(svg)
      svg = svg.replace(/text[\s]*=[\s]*"[^"]*"/g, '')
    }
    navigator.clipboard.writeText(svg).then(res => {
      alert(svg)
    })
  }

  return (
    <div className={css.buttonContainer}>
      <button className={css.saveButtonLeft} onClick={onSavClicked('svg')}>
        Save to Clipboard(svg)
      </button>
      <button className={css.saveButtonRight} onClick={onSavClicked('react')}>
        Save to Clipboard(react)
      </button>
    </div>
  )
}
