import React, { useState, useEffect } from 'react'
import DesignArea from './components/design-area'
import ToolArea from './components/tool-area'
import HelpArea from './components/help-area'
import {Dock} from 'react-dock'

import css from './svg-designer.module.css'
import {
  DesignAreaContext,
  ViewportContext,
  ModeContext,
  HistoryContext,
  PathElementsContext,
  ModifyingItemContext,
  PressedKeyContext,
} from './contexts/globalContexts'
import { useDynamicContextProvider } from './contexts/dynamic-context-utils'
import { DrawingModes, HELP_HEIGHT } from './consts'
import { useResizeEvent } from './utils/resize-event-handlers'

const defaultDesignArea = {
  width: '80%',
  height: '100%',
}

const defaultToolArea = {
  position: 'right',
  size: 0.2,
  isVisible: true,
  fluid: true,
}

const initDesignArea = Object.freeze({
  rate: 1.0,
  width: 600,
  height: 500,
  gridSize: 10,
  showGrid: true,
  stickOnGrid: true,
  backColor: 'white',
  maskList: [],
  selectedHistory: [],
})

const initViewport = {
  left: 0,
  top: 0,
  width: 100,
  height: 100,
}

const initMode = {
  drawingMode: DrawingModes.NONE,
  prevDrawingMode: null,
}

const initHistoryQueue = []

function SvgDesigner() {
  const [designArea, setDesignArea] = useState(defaultDesignArea)
  const [toolArea, setToolArea] = useState(defaultToolArea)
  const designAreaProviderValue = useDynamicContextProvider(initDesignArea)
  const modifyingItemValue = useDynamicContextProvider({ idx: -1, item: null })

  const onToolSizeChanged = size => {
    const calcSize = {
      width: Math.round(window.innerWidth - window.innerWidth * size),
      height: Math.round(window.innerHeight - HELP_HEIGHT),
    }
    setDesignArea(state => ({ ...state, ...calcSize }))
    setToolArea(state => ({ ...state, size: size }))
    designAreaProviderValue.setState(state => ({ ...state, ...calcSize }))
  }

  const viewportProviderValue = useDynamicContextProvider(initViewport)
  const drawingModeProviderValue = useDynamicContextProvider(initMode)

  const historyProviderValue = useDynamicContextProvider(initHistoryQueue)
  const pathElementsValue = useDynamicContextProvider([])

  const keyPressedValue = useDynamicContextProvider({
    ctrl: false,
    alt: false,
    shift: false,
  })

  useResizeEvent({
    onResize: () => {
      onToolSizeChanged(0.3)
    },
  })

  useEffect(() => {
    onToolSizeChanged(0.3)
  }, [])

  return (
    <div className={css.mainWindow}>
      <DesignAreaContext.Provider value={designAreaProviderValue}>
        <ViewportContext.Provider value={viewportProviderValue}>
          <ModeContext.Provider value={drawingModeProviderValue}>
            <HistoryContext.Provider value={historyProviderValue}>
              <PathElementsContext.Provider value={pathElementsValue}>
                <ModifyingItemContext.Provider value={modifyingItemValue}>
                  <PressedKeyContext.Provider value={keyPressedValue}>
                    <Dock {...toolArea} onSizeChange={onToolSizeChanged}>
                      <ToolArea />
                    </Dock>
                    <div style={designArea}>
                      <DesignArea />
                    </div>
                    <HelpArea />
                  </PressedKeyContext.Provider>
                </ModifyingItemContext.Provider>
              </PathElementsContext.Provider>
            </HistoryContext.Provider>
          </ModeContext.Provider>
        </ViewportContext.Provider>
      </DesignAreaContext.Provider>
    </div>
  )
}

export default SvgDesigner
