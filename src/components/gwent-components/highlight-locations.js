//* VARIABLES

const highlighted = []

export function highlightValidLocations(cardData, onLocationsSelect) {
  const validPrefix = 'p1'
  const validLocations = cardData.boardLocations.filter((loc) =>
    loc.startsWith(validPrefix)
  )

  validLocations.forEach((location) => {
    const [row, column] = location.split(':')
    const selector = `.cell.${row}.${column}`
    const cell = document.querySelector(selector)

    if (cell) {
      const isHornColumn = cell.classList.contains('horn')
      const hasCard = cell.querySelector('.gwentCard')

      if (isHornColumn && hasCard) return

      cell.classList.add('highlight-location')
      highlighted.push(cell)

      const clickHandler = () => {
        onLocationsSelect(cell)
        removeHighlights()
      }

      cell.addEventListener('click', clickHandler)
      cell.clickHandler = clickHandler
    }
  })
}

export function removeHighlights() {
  highlighted.forEach((cell) => {
    cell.classList.remove('highlight-location')
    if (cell.clickHandler) {
      cell.removeEventListener('click', cell.clickHandler)
      delete cell.clickHandler
    }
  })
  highlighted.length = 0
}
