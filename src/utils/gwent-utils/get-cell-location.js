export function getCellLocation(cardId) {
  const cardElement = document.getElementById(cardId)
  if (!cardElement) return null

  const cellElement = cardElement.closest('.cell')
  if (!cellElement) return null

  const classList = Array.from(cellElement.classList).filter(
    (c) => c !== 'cell'
  )

  return classList.join(':')
}
