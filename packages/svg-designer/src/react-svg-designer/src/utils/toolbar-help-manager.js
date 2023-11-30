import { useDynamicContextConsumerSetter } from '../contexts/dynamic-context-utils'
import { ToolHelpContext } from '../contexts/globalContexts'

export const useHelpManager = helps => {
  const setToolHelp = useDynamicContextConsumerSetter(ToolHelpContext)
  const newMap = new Map()

  for (let name in helps) {
    const txt = helps[name]

    const onFocus = e => {
      setToolHelp({
        name,
        txt,
      })
    }

    const onBlur = e => {
      setToolHelp({
        name: '',
        txt: [],
      })
    }

    newMap.set(name, {
      onFocus,
      onBlur,
    })
  }
  return newMap
}
