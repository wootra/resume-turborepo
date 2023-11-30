export const changeMode = (setModes, modeTo) => {
    setModes(state => ({ ...state, drawingMode: modeTo, prevDrawingMode: state.drawingMode }))
}