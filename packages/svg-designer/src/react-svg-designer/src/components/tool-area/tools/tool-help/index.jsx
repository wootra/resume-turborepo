import React from 'react'
import { ToolHelpContext } from '../../../../contexts/globalContexts'
import { useDynamicContextConsumer } from '../../../../contexts/dynamic-context-utils'
import css from './style.module.css'
import mCsss from '../../style.module.css'

export default function ToolHelp(props) {
  const [toolHelp, setToolHelp] = useDynamicContextConsumer(ToolHelpContext)

  let toolTxt = ''
  if (typeof toolHelp.txt === 'object' && toolHelp.txt.length > 0) {
    toolTxt = toolHelp.txt.map((item, idx) => (
      <p key={idx} className={css.desc}>
        {item}
      </p>
    ))
  } else if (typeof toolHelp.txt === 'string') {
    toolTxt = toolHelp.txt
  } else {
    if (toolHelp.name.length === 0) return null
    else throw Error('toolHelp only can be txt or array of txt')
  }
  return toolTxt.length > 0 ? (
    <div className={css.toolHelp}>
      <div className={mCsss.title}>About {toolHelp.name || ''}...</div>
      <div className={css.desc}>{toolTxt}</div>
    </div>
  ) : null
}
