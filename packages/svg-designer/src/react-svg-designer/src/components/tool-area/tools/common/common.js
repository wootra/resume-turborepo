export const getClonedHistoryWithNewInfo = (
  oldHistoryItem,
  newInfo,
  newInfoToSave = null,
  children = null,
) => {
  let clonedHistory = Object.assign({}, oldHistoryItem)
  newInfo = newInfo || clonedHistory.info
  newInfoToSave = newInfoToSave || newInfo
  children = children || clonedHistory.element.children
  clonedHistory = {
    ...clonedHistory,
    info: { ...newInfoToSave },
    element: {
      ...clonedHistory.element,
      attributes: {
        ...clonedHistory.element.attributes,
        ...newInfo,
      },
      children,
    },
  }
  return clonedHistory
}
